const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const fs = require("fs");

const API_ID = 28574582;
const API_HASH = "69f0193afd5aed64c51fae47eadf3d72";

const stringSession = new StringSession("");

(async () => {
  const client = new TelegramClient(stringSession, API_ID, API_HASH, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("📱 Введите номер телефона: "),
    password: async () => await input.text("🔒 Введите пароль (если есть): "),
    phoneCode: async () => await input.text("💬 Введите код из Telegram: "),
    onError: (err) => console.log(err),
  });

  const session = client.session.save();
  fs.writeFileSync("session.txt", session);
  console.log("✅ Сессия сохранена в session.txt");

  await client.disconnect();
})();
