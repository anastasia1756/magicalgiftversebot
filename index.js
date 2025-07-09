require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");

// Настройки
const BOT_TOKEN = process.env.BOT_TOKEN;
const API_ID = parseInt(process.env.API_ID);
const API_HASH = process.env.API_HASH;

// Загружаем строку сессии из файла
const stringSession = new StringSession(process.env.SESSION_STRING);

// Ключевые слова → эмодзи
const keywordToEmoji = {
  пепе: "🐸",
  сейлор: "💛",
  кепка: "🧢",
  персик: "🍑",
  шлем: "🪖",
  картье: "🎁",
  сумка: "👛",
  алмаз: "💎",
  шард: "💎",
  кольцо: "💍",
  зелье: "🧪",
  лампа: "🧞‍♂️",
  котик: "🐈",
  кот: "🐈",
  губы: "🫦",
  череп: "💀",
  сигара: "🚬",
  сигарета: "🚬",
  мишка: "🧸",
  вуду: "📍",
  тыква: "🎃",
  роза: "🥀",
  свеча: "🕯",
  шляпа: "🎩",
  "лав поушн": "💟",
  колокольчик: "🔔",
  "цветочек-череп": "🌺",
  метла: "🧹",
  проигрыватель: "🪩",
  шар: "🔮",
  сердце: "🫀",
  звезда: "⭐️",
  бабочка: "🤵",
  сакура: "🌸",
  маффин: "🧁",
  мечик: "⚔️",
  меч: "⚔️",
  букет: "💐",
  "новогодний шар": "❄️",
  перчатки: "🧤",
  блокнот: "📔",
  гриб: "🍄",
  глаз: "👁",
};

// Запускаем бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase().trim();
  if (!text) return;

  if (text.includes("дилдо")) {
    bot.sendMessage(chatId, "бесценно 💋");
    return;
  }

  let emoji = null;
  for (const [word, emj] of Object.entries(keywordToEmoji)) {
    if (text.includes(word)) {
      emoji = emj;
      break;
    }
  }

  // if (!emoji) {
  //   bot.sendMessage(chatId, "😕 Не узнал слово.");
  //   return;
  // }

  const client = new TelegramClient(stringSession, API_ID, API_HASH, {
    connectionRetries: 5,
  });

  try {
    await client.connect(); // 👈 не вызывает авторизацию, работает с сохранённой сессией

    const messages = await client.getMessages("GiftMonitor", { limit: 5 });

    let foundLine = null;
    for (const message of messages) {
      if (!message.message) continue; // пропускаем сообщения без текста

      const lines = message.message.split("\n");
      for (const line of lines) {
        if (line.includes(emoji)) {
          foundLine = line;
          break;
        }
      }
      if (foundLine) break;
    }

    if (foundLine) {
      bot.sendMessage(chatId, `${foundLine}`);
    }
    // else {
    //   bot.sendMessage(chatId, "🙈 Не нашёл цену для этого подарка.");
    // }

    await client.disconnect();
  } catch (err) {
    console.error("❌ Ошибка:", err);
    bot.sendMessage(chatId, "Ошибка при получении данных.");
  }
});

// const TelegramBot = require("node-telegram-bot-api");
// const { TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const input = require("input");

// // 🔑 Настройки
// const BOT_TOKEN = "7670371799:AAGY9dRwx7VOS_hUTR3ijlRbWCDPHWosYno";
// const API_ID = 28574582; // Получи на https://my.telegram.org
// const API_HASH = "69f0193afd5aed64c51fae47eadf3d72";
// const stringSession = new StringSession(""); // при первом запуске оставь ''

// // 🔁 Словарь ключевых слов → эмодзи
// const keywordToEmoji = {
//   пепе: "🐸",
//   сейлор: "💛",
//   кепка: "🧢",
//   персик: "🍑",
//   шлем: "🪖",
//   картье: "🎁",
//   сумка: "👛",
//   алмаз: "💎",
//   шард: "💎",
//   кольцо: "💍",
//   зелье: "🧪",
//   лампа: "🧞‍♂️",
//   котик: "🐈",
//   кот: "🐈",
//   губы: "🫦",
//   череп: "💀",
//   сигара: "🚬",
//   сигарета: "🚬",
//   мишка: "🧸",
//   вуду: "📍",
//   тыква: "🎃",
//   роза: "🥀",
//   свеча: "🕯",
//   шляпа: "🎩",
//   "лав поушн": "💟",
//   колокольчик: "🔔",
//   "цветочек-череп": "🌺",
//   метла: "🧹",
//   проигрыватель: "🪩",
//   шар: "🔮",
//   сердце: "🫀",
//   звезда: "⭐️",
//   бабочка: "🤵",
//   маффин: "🧁",
//   мечик: "⚔️",
//   меч: "⚔️",
//   букет: "💐",
//   "новогодний шар": "❄️",
//   перчатки: "🧤",
//   блокнот: "📔",
//   глаз: "👁",
// };

// // ▶️ Telegram bot
// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text?.toLowerCase();

//   if (!text) return;

//   const emoji = keywordToEmoji[text.trim()];
//   //   if (!emoji) {
//   //     bot.sendMessage(chatId, "Я не знаю такого подарка 🙁");
//   //     return;
//   //   }

//   // Запускаем userbot
//   const client = new TelegramClient(stringSession, API_ID, API_HASH, {
//     connectionRetries: 5,
//   });

//   try {
//     await client.start({
//       phoneNumber: async () => await input.text("📱 Введите номер телефона: "),
//       password: async () => await input.text("🔒 Введите пароль (если есть): "),
//       phoneCode: async () => await input.text("💬 Введите код из Telegram: "),
//       onError: (err) => console.log(err),
//     });

//     const messages = await client.getMessages("GiftMonitor", { limit: 5 });

//     let foundLine = null;
//     for (const message of messages) {
//       const lines = message.message.split("\n");
//       for (const line of lines) {
//         if (line.includes(emoji)) {
//           foundLine = line;
//           break;
//         }
//       }
//       if (foundLine) break;
//     }

//     if (foundLine) {
//       bot.sendMessage(chatId, `🎁 ${foundLine}`);
//     } else {
//       bot.sendMessage(chatId, "Не смог найти цену 😢");
//     }

//     await client.disconnect();
//   } catch (err) {
//     console.error("❌ Ошибка userbot:", err);
//     bot.sendMessage(chatId, "Произошла ошибка при получении данных.");
//   }
// });
