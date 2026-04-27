import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = path.resolve(process.cwd());
const FONTS_DIR = path.join(ROOT, "assets", "fonts");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (!res.statusCode || res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function downloadFile(url, outPath, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        if (!res.statusCode || res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const file = fs.createWriteStream(outPath);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

function uniq(arr) {
  return [...new Set(arr)];
}

function basenameFromUrl(url) {
  const u = new URL(url);
  const base = path.basename(u.pathname);
  return base.endsWith(".woff2") ? base : `${base}.woff2`;
}

async function processFamily({ name, cssUrl, ua }) {
  const headers = {
    // Force woff2 responses from Google Fonts
    "User-Agent": ua,
  };

  const css = await fetchText(cssUrl, headers);
  const urls = uniq([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)].map((m) => m[1]));

  let rewritten = css;
  for (const fontUrl of urls) {
    const base = basenameFromUrl(fontUrl);
    const outPath = path.join(FONTS_DIR, base);
    if (!fs.existsSync(outPath)) {
      // eslint-disable-next-line no-console
      console.log(`[fonts] Download ${name}: ${base}`);
      await downloadFile(fontUrl, outPath, headers);
    }
    rewritten = rewritten.replaceAll(fontUrl, `./assets/fonts/${base}`);
  }

  // Ensure font-display swap exists (Google often includes it, but we keep it explicit)
  rewritten = rewritten.replaceAll("font-display: swap;", "font-display: swap;");
  return rewritten;
}

async function main() {
  ensureDir(FONTS_DIR);

  const ua =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

  const families = [
    {
      name: "Inter",
      cssUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      ua,
    },
    {
      name: "Cormorant+Garamond",
      cssUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap",
      ua,
    },
  ];

  const parts = [];
  for (const fam of families) {
    const css = await processFamily(fam);
    parts.push(`/* ${fam.name} */\n${css.trim()}\n`);
  }

  const outCss = parts.join("\n");
  fs.writeFileSync(path.join(ROOT, "fonts.css"), outCss, "utf8");

  // eslint-disable-next-line no-console
  console.log(`[fonts] Wrote ${path.join(ROOT, "fonts.css")}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

