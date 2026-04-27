import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

function write(p, content) {
  fs.writeFileSync(path.join(ROOT, p), content, "utf8");
}

// Safe-ish CSS minifier for our single file.
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

// Simple JS minifier: removes comments + collapses whitespace outside strings/templates.
// Not as strong as terser, but safe for this codebase (semicolon-terminated).
function minifyJs(js) {
  let out = "";
  let i = 0;
  let state = "code"; // code | sQuote | dQuote | template | lineComment | blockComment
  let prevNonSpace = "";

  const push = (ch) => {
    out += ch;
    if (!/\s/.test(ch)) prevNonSpace = ch;
  };

  while (i < js.length) {
    const ch = js[i];
    const next = js[i + 1];

    if (state === "lineComment") {
      if (ch === "\n") {
        state = "code";
        push("\n");
      }
      i += 1;
      continue;
    }
    if (state === "blockComment") {
      if (ch === "*" && next === "/") {
        state = "code";
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    if (state === "sQuote") {
      push(ch);
      if (ch === "\\" && next) {
        push(next);
        i += 2;
        continue;
      }
      if (ch === "'") state = "code";
      i += 1;
      continue;
    }
    if (state === "dQuote") {
      push(ch);
      if (ch === "\\" && next) {
        push(next);
        i += 2;
        continue;
      }
      if (ch === '"') state = "code";
      i += 1;
      continue;
    }
    if (state === "template") {
      push(ch);
      if (ch === "\\" && next) {
        push(next);
        i += 2;
        continue;
      }
      if (ch === "`") state = "code";
      i += 1;
      continue;
    }

    // code state
    if (ch === "/" && next === "/") {
      state = "lineComment";
      i += 2;
      continue;
    }
    if (ch === "/" && next === "*") {
      state = "blockComment";
      i += 2;
      continue;
    }
    if (ch === "'") {
      state = "sQuote";
      push(ch);
      i += 1;
      continue;
    }
    if (ch === '"') {
      state = "dQuote";
      push(ch);
      i += 1;
      continue;
    }
    if (ch === "`") {
      state = "template";
      push(ch);
      i += 1;
      continue;
    }

    // whitespace collapse
    if (/\s/.test(ch)) {
      // keep newlines after certain tokens to avoid accidental merges in rare cases
      if (prevNonSpace && /[;{}]/.test(prevNonSpace)) {
        // drop extra whitespace entirely
      } else {
        // single space between identifiers/numbers
        const prev = out[out.length - 1] || "";
        if (prev && !/\s/.test(prev)) out += " ";
      }
      i += 1;
      continue;
    }

    // drop unnecessary spaces around punctuation by not adding them in first place
    push(ch);
    i += 1;
  }

  return out
    .replace(/\s*([=+\-*/%<>&|^!?:,;{}()[\]])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function main() {
  const css = read("styles.css");
  write("styles.min.css", minifyCss(css));

  const js = read("app.js");
  write("app.min.js", minifyJs(js));
}

main();

