/*
  ============================================================
  CONTENT CONFIG — РЕДАКТИРУЙТЕ ТОЛЬКО ЭТОТ ФАЙЛ
  ============================================================

  Как пользоваться:
  1) Меняйте ТОЛЬКО значения справа от ":" в кавычках.
  2) Не удаляйте запятые в конце строк.
  3) Если ссылки нет — ставьте "#".
  4) Пути к изображениям должны начинаться с "./assets/".
  5) После изменений просто сохраните файл и обновите страницу.

  Где что редактируется:
  - images        -> фон и иконки соцсетей
  - founders      -> люди, должности, фото, личные ссылки
  - commonContacts-> общий email и адрес
  - legal         -> юридический блок
  - socials       -> ссылки компании (модалка "Соцсети")
*/

window.APP_CONTENT = {
  /*
    labels:
    Тексты интерфейса, которые можно менять без правки index.html/app.js.
    Если не хотите менять — оставьте как есть.
  */
  labels: {
    contactsButton: "Контакты",
    socialsButton: "Соцсети",
    hintTapToOpen: "Нажмите, чтобы открыть",
    contactsModalTitle: "Контакты",
    socialsModalTitle: "Соцсети",
    foundersTitle: "Основатели",
    commonContactsTitle: "Общие контакты",
    soon: "скоро",
    copied: "Скопировано",
  },

  images: {
    // Фоновое изображение главного экрана и модалок
    backdrop: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_vcQ2mkfp4dczwHHjVc3LhHrRkOlGJowyMVOyuxBt5gNEEamdsPyt9QoWJn-CdO2w-hii09DnXBT1mJlE8WVveRNw-320540f3-dfb6-4362-a05a-de9370952d59.png",

    // Иконки соцсетей БЕЗ фона (новые файлы)
    telegramIcon: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_Form_Circle-1-9fd2da76-da38-4bd3-9126-1038c1fb9e55.png",
    vkIcon: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_Form_Circle-2-ab8edb2a-672c-4c31-a68d-de751f58a463.png",
    maxIcon: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_Form_Circle-ea53b628-daf4-44a7-8bb6-23731af1a7e8.png",

    // Логотип ТД СХР (используется в модалке "Соцсети" вместо текста "ТД СХР")
    brandLogo: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_ChatGPT_Image_27____._2026__.__14_38_02_1-b0a1e7c5-3975-4e04-b9e3-f55566f167d0.png",
  },

  founders: [
    {
      // ФИО карточки 1
      fullName: "Бабушкин Вячеслав Николаевич",
      // Должность карточки 1
      role: "Генеральный директор",
      // Фото карточки 1 (гендир, белый фон)
      avatar: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_IMG_3273-fa698bfb-bf7a-4696-b0e4-277aa070856f.png",
      contacts: {
        // Личные ссылки гендира (если нет — "#")
        telegram: "https://t.me/BabushkinViacheslav",
        vk: "https://vk.ru/id518448000",
        max: "#",
      },
    },
    {
      // ФИО карточки 2
      fullName: "Невзоров Святсолав Иванович",
      // Должность карточки 2
      role: "Заместитель генерального директора",
      // Фото карточки 2 (зам)
      avatar: "./assets/c__Users_S.NEVZOROFF_AppData_Roaming_Cursor_User_workspaceStorage_a4d5ab383af2f6bb1b3b7d6c1f9ac53f_images_zuxbi3NuDu4-mhmvgLhvrIch88pQ0hM9BFQCw-5c0pluE4ucSJaKCSs2imQmVx5cweofB2Fo9YR6boZeFRp8DCfa-08fb4abf-6471-4d71-933b-9f02f01fef35.png",
      contacts: {
        // Личные ссылки зама (если нет — "#")
        telegram: "https://t.me/SvyatBIZ",
        vk: "https://vk.ru/s.nevzoroff",
        max: "#",
      },
    },
  ],

  commonContacts: {
    // Общая почта компании. При клике откроется почтовый клиент (mailto).
    email: "td_shr@bk.ru",
    // Адрес в блоке "Общие контакты"
    address: "г. Нижний Новгород, ул. Максима Горького, д. 20а, офис 302",
  },

  legal: {
    // Юридическое название (как в документах)
    company: "ООО \"ТД \"ВТОО \"СХР\"",
    // ИНН
    inn: "ИНН 5260468103",
  },

  socials: [
    // Каналы компании в модалке "Соцсети"
    // label -> текст, который показывается рядом с иконкой
    // href  -> ссылка канала (если нет, ставьте "#")
    // iconKey -> КЛЮЧ ИЗ images: telegramIcon | vkIcon | maxIcon
    {
      label: "Telegram",
      href: "https://t.me/TD_shr",
      iconKey: "telegramIcon",
      // isEnabled: если false, канал покажется как "скоро" и не будет кликабельным
      isEnabled: true,
    },
    {
      label: "VK",
      href: "https://vk.ru/td_shr",
      iconKey: "vkIcon",
      isEnabled: true,
    },
    {
      label: "MAX",
      href: "#",
      iconKey: "maxIcon",
      isEnabled: false,
    },
  ],
};
