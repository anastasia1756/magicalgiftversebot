const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const keywordToGiftName = {
  пепе: "Plush Pepe",
  сейлор: "Heart Locket",
  кепка: "Durov's Cap",
  персик: "Precious Peach",
  шлем: "Heroic Helmet",
  "шлем спартанца": "Heroic Helmet",
  картье: "Nail Bracelet",
  гвоздь: "Nail Bracelet",
  сумка: "Loot Bag",
  алмаз: "Astral Shard",
  "астрал шард": "Astral Shard",
  шард: "Astral Shard",
  "гем сигнет": "Gem Signet",
  "кольцо гем": "Gem Signet",
  ион: "Ion Gem",
  гем: "Ion Gem",
  оскар: "Mini Oscar",
  духи: "Perfume Bottle",
  парфюм: "Perfume Bottle",
  зелье: "Magic Potion",
  лампа: "Genie Lamp",
  котик: "Scared Cat",
  кошка: "Scared Cat",
  кот: "Scared Cat",
  губы: "Sharp Tongue",
  губки: "Sharp Tongue",
  часы: "Swiss Watch",
  лягушка: "Kissed Frog",
  жабка: "Kissed Frog",
  жаба: "Kissed Frog",
  фрог: "Kissed Frog",
  "киссд фрог": "Kissed Frog",
  череп: "Electric Skull",
  сигара: "Vintage Cigar",
  сигарета: "Vintage Cigar",
  неко: "Neko Helmet",
  "неко хелмет": "Neko Helmet",
  "неко шлем": "Neko Helmet",
  кольцо: "Signet Ring",
  мишка: "Toy Bear",
  медведь: "Toy Bear",
  вуду: "Voodoo Doll",
  "кукла вуду": "Voodoo Doll",
  роза: "Eternal Rose",
  розочка: "Eternal Rose",
  тыква: "Mad Pumpkin",
  свеча: "Love Candle",
  "лав кендл": "Love Candle",
  "свечка сердце": "Love Candle",
  шляпа: "Top Hat",
  цилиндр: "Top Hat",
  топхет: "Top Hat",
  "топ хет": "Top Hat",
  колокольчик: "Sleigh Bell",
  "слей белл": "Sleigh Bell",
  "лав поушн": "Love Potion",
  "лав поушен": "Love Potion",
  "любовное зелье": "Love Potion",
  радость: "Joyful Bundle",
  "джойфул бандл": "Joyful Bundle",
  метла: "Flying Broom",
  "цветочек череп": "Skull Flower",
  "цветок череп": "Skull Flower",
  скул: "Skull Flower",
  "скал флавер": "Skull Flower",
  проигрыватель: "Record Player",
  пластинка: "Record Player",
  шар: "Crystal Ball",
  "кристальный шар": "Crystal Ball",
  сердце: "Trapped Heart",
  ловушка: "Trapped Heart",
  "трепд харт": "Trapped Heart",
  коробка: "Valentine Box",
  "коробка конфет": "Valentine Box",
  звезда: "Hanging Star",
  звездочка: "Hanging Star",
  бабочка: "Bow Tie",
  маффин: "Bunny Muffin",
  мафин: "Bunny Muffin",
  сакура: "Sakura Flower",
  букет: "Lush Bouquet",
  гриб: "Spy Agaric",
  "спай агарик": "Spy Agaric",
  перчатки: "Snow Mittens",
  "новогодний шар": "Snow Globe",
  блокнот: "Star Notepad",
  "зелье ведьмы": "Hex Pot",
  "хекс пот": "Hex Pot",
  глаз: "Evil Eye",
  змейка: "Lunar Snake",
  змея: "Lunar Snake",
  тамагочи: "Tama Gadget",
  тамагаджет: "Tama Gadget",
  "тама гаджет": "Tama Gadget",
  "шляпа ведьмы": "Witch Hat",
  "кенди кейн": "Candy Cane",
  "гипно лолик": "Hypno Lollipop",
  гипнололипоп: "Hypno Lollipop",
  хипнололипоп: "Hypno Lollipop",
  кружка: "Holiday Drink",
  кулончик: "Cupid Charm",
  подвеска: "Cupid Charm",
  коробка: "Snake Box",
  сердечко: "Cookie Heart",
  год: "Big Year",
  цифры: "Big Year",
  меч: "Light Sword",
  "шапка санты": "Santa Hat",
  "шляпа санты": "Santa Hat",
  "пет снейк": "Pet Snake",
  календарь: "Desk Calendar",
  "бери бокс": "Berry Box",
  "берри бокс": "Berry Box",
  "коробка конфет": "Berry Box",
  свечка: "B-Day Candle",
  бездей: "B-Day Candle",
  "джек ин зе бокс": "VJack-in-the-Box",
  коробка: "Jack-in-the-Box",
  джек: "Jack-in-the-Box",
  "даймонд ринг": "Diamond Ring",
  "кольцо в коробке": "Diamond Ring",
  "шляпа шута": "Jester Hat",
  яйцо: "Easter Egg",
  пряник: "Ginger Cookie",
  "пряничный человечек": "Ginger Cookie",
  печенька: "Ginger Cookie",
  "пати спаркл": "Party Sparkler",
  бенгальский: "Party Sparkler",
  палочка: "Party Sparkler",
  палка: "Party Sparkler",
  колокольчики: "Jingle Bells",
  джелли: "Jelly Bunny",
  "джелли бани": "Jelly Bunny",
  желейка: "Jelly Bunny",
  желе: "Jelly Bunny",
  глинтвейн: "Spiced Wine",
  лолипоп: "Lol Pop",
  лоллипоп: "Lol Pop",
  торт: "Homemade Cake",
  тортик: "Homemade Cake",
  перстень: "Bonded Ring",
  носок: "Xmas Stocking",
  венок: "Winter Wreath",
  капкейк: "Whip Cupcake",
  банка: "Restless Jar",
  свечка: "Eternal Candle",
  дилдо: "бесценно",
};

async function getGiftPriceByName(giftName) {
  try {
    const { data: html } = await axios.get("https://peek.tg/stats");
    const $ = cheerio.load(html);

    let found = null;

    $("h3.font-medium.text-white.text-base.truncate").each((_, el) => {
      const title = $(el).text().trim();
      if (title.toLowerCase() === giftName.toLowerCase()) {
        const container = $(el).closest(".relative.p-4");
        const price = container
          .find("span.text-lg.font-semibold.text-white")
          .text()
          .trim();
        if (price) {
          found = `${title} — ${price} TON`;
        }
      }
    });

    return found;
  } catch (error) {
    console.error("Ошибка при парсинге:", error);
    return null;
  }
}

// 🤖 Бот слушает
bot.on("message", async (msg) => {
  console.log("📩 Получено сообщение:", msg);
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase().trim();
  if (!text) return;

  if (text.includes("дилдо")) {
    bot.sendMessage(chatId, "бесценно 💋");
    return;
  }

  // Ищем самое точное совпадение
  let matchedName = null;
  let matchedKeyword = null;

  for (const [keyword, name] of Object.entries(keywordToGiftName)) {
    if (text.includes(keyword.toLowerCase())) {
      if (!matchedKeyword || keyword.length > matchedKeyword.length) {
        matchedKeyword = keyword;
        matchedName = name;
      }
    }
  }

  if (!matchedName) {
    return;
  }

  const priceInfo = await getGiftPriceByName(matchedName);
  if (priceInfo) {
    bot.sendMessage(chatId, `🎁 ${priceInfo}`);
  } else {
    bot.sendMessage(chatId, "🙈 Не нашёл цену на этот подарок.");
  }
});

// вариант с юзербот с парсингом(работает)
// const TelegramBot = require("node-telegram-bot-api");
// const axios = require("axios");
// const cheerio = require("cheerio");

// // 🤐 Безопасно подтягиваем данные из .env
// // require("dotenv").config();
// const { config } = require("dotenv");
// config();

// // ⚙️ Настройки
// // const BOT_TOKEN = process.env.BOT_TOKEN;

// const BOT_TOKEN = process.env.BOT_TOKEN;
// const API_ID = parseInt(process.env.API_ID);
// const API_HASH = process.env.API_HASH;
// const SESSION_STRING = process.env.SESSION_STRING;
// // 🔁 Ключевые слова → отображаемое имя
// const keywordToGiftName = {
//   пепе: "Plush Pepe",
//   сейлор: "Heart Locket",
//   кепка: "Durov's Cap",
//   персик: "Precious Peach",
//   шлем: "Heroic Helmet",
//   "шлем спартанца": "Heroic Helmet",
//   картье: "Nail Bracelet",
//   гвоздь: "Nail Bracelet",
//   сумка: "Loot Bag",
//   алмаз: "Astral Shard",
//   "астрал шард": "Astral Shard",
//   шард: "Astral Shard",
//   "гем сигнет": "Gem Signet",
//   "кольцо гем": "Gem Signet",
//   ион: "Ion Gem",
//   гем: "Ion Gem",
//   оскар: "Mini Oscar",
//   духи: "Perfume Bottle",
//   парфюм: "Perfume Bottle",
//   зелье: "Magic Potion",
//   лампа: "Genie Lamp",
//   котик: "Scared Cat",
//   кошка: "Scared Cat",
//   кот: "Scared Cat",
//   губы: "Sharp Tongue",
//   губки: "Sharp Tongue",
//   часы: "Swiss Watch",
//   лягушка: "Kissed Frog",
//   жабка: "Kissed Frog",
//   жаба: "Kissed Frog",
//   фрог: "Kissed Frog",
//   "киссд фрог": "Kissed Frog",
//   череп: "Electric Skull",
//   сигара: "Vintage Cigar",
//   сигарета: "Vintage Cigar",
//   неко: "Neko Helmet",
//   "неко хелмет": "Neko Helmet",
//   "неко шлем": "Neko Helmet",
//   кольцо: "Signet Ring",
//   мишка: "Toy Bear",
//   медведь: "Toy Bear",
//   вуду: "Voodoo Doll",
//   "кукла вуду": "Voodoo Doll",
//   роза: "Eternal Rose",
//   розочка: "Eternal Rose",
//   тыква: "Mad Pumpkin",
//   свеча: "Love Candle",
//   "лав кендл": "Love Candle",
//   "свечка сердце": "Love Candle",
//   шляпа: "Top Hat",
//   цилиндр: "Top Hat",
//   топхет: "Top Hat",
//   "топ хет": "Top Hat",
//   колокольчик: "Sleigh Bell",
//   "слей белл": "Sleigh Bell",
//   "лав поушн": "Love Potion",
//   "лав поушен": "Love Potion",
//   "любовное зелье": "Love Potion",
//   радость: "Joyful Bundle",
//   "джойфул бандл": "Joyful Bundle",
//   метла: "Flying Broom",
//   "цветочек череп": "Skull Flower",
//   "цветок череп": "Skull Flower",
//   скул: "Skull Flower",
//   "скал флавер": "Skull Flower",
//   проигрыватель: "Record Player",
//   пластинка: "Record Player",
//   шар: "Crystal Ball",
//   "кристальный шар": "Crystal Ball",
//   сердце: "Trapped Heart",
//   ловушка: "Trapped Heart",
//   "трепд харт": "Trapped Heart",
//   коробка: "Valentine Box",
//   "коробка конфет": "Valentine Box",
//   звезда: "Hanging Star",
//   звездочка: "Hanging Star",
//   бабочка: "Bow Tie",
//   маффин: "Bunny Muffin",
//   мафин: "Bunny Muffin",
//   сакура: "Sakura Flower",
//   букет: "Lush Bouquet",
//   гриб: "Spy Agaric",
//   "спай агарик": "Spy Agaric",
//   перчатки: "Snow Mittens",
//   "новогодний шар": "Snow Globe",
//   блокнот: "Star Notepad",
//   "зелье ведьмы": "Hex Pot",
//   "хекс пот": "Hex Pot",
//   глаз: "Evil Eye",
//   змейка: "Lunar Snake",
//   змея: "Lunar Snake",
//   тамагочи: "Tama Gadget",
//   тамагаджет: "Tama Gadget",
//   "тама гаджет": "Tama Gadget",
//   "шляпа ведьмы": "Witch Hat",
//   "кенди кейн": "Candy Cane",
//   "гипно лолик": "Hypno Lollipop",
//   гипнололипоп: "Hypno Lollipop",
//   хипнололипоп: "Hypno Lollipop",
//   кружка: "Holiday Drink",
//   кулончик: "Cupid Charm",
//   подвеска: "Cupid Charm",
//   коробка: "Snake Box",
//   сердечко: "Cookie Heart",
//   год: "Big Year",
//   цифры: "Big Year",
//   меч: "Light Sword",
//   "шапка санты": "Santa Hat",
//   "шляпа санты": "Santa Hat",
//   "пет снейк": "Pet Snake",
//   календарь: "Desk Calendar",
//   "бери бокс": "Berry Box",
//   "берри бокс": "Berry Box",
//   "коробка конфет": "Berry Box",
//   свечка: "B-Day Candle",
//   бездей: "B-Day Candle",
//   "джек ин зе бокс": "VJack-in-the-Box",
//   коробка: "Jack-in-the-Box",
//   джек: "Jack-in-the-Box",
//   "даймонд ринг": "Diamond Ring",
//   "кольцо в коробке": "Diamond Ring",
//   "шляпа шута": "Jester Hat",
//   яйцо: "Easter Egg",
//   пряник: "Ginger Cookie",
//   "пряничный человечек": "Ginger Cookie",
//   печенька: "Ginger Cookie",
//   "пати спаркл": "Party Sparkler",
//   бенгальский: "Party Sparkler",
//   палочка: "Party Sparkler",
//   палка: "Party Sparkler",
//   колокольчики: "Jingle Bells",
//   джелли: "Jelly Bunny",
//   "джелли бани": "Jelly Bunny",
//   желейка: "Jelly Bunny",
//   желе: "Jelly Bunny",
//   глинтвейн: "Spiced Wine",
//   лолипоп: "Lol Pop",
//   лоллипоп: "Lol Pop",
//   торт: "Homemade Cake",
//   тортик: "Homemade Cake",
//   перстень: "Bonded Ring",
//   носок: "Xmas Stocking",
//   венок: "Winter Wreath",
//   капкейк: "Whip Cupcake",
//   банка: "Restless Jar",
//   свечка: "Eternal Candle",
//   дилдо: "бесценно",
// };

// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// // 📦 Парсим сайт peek.tg/stats
// const puppeteer = require("puppeteer");

// async function getGiftPriceByName(name) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Логируем, что происходит внутри браузера
//   page.on("console", (msg) => console.log("📦 Puppeteer:", msg.text()));

//   await page.goto("https://peek.tg/stats", { waitUntil: "networkidle2" });

//   const result = await page.evaluate((giftName) => {
//     const h3s = Array.from(document.querySelectorAll("h3"));
//     for (const h3 of h3s) {
//       const title = h3.textContent.trim();
//       console.log("🔍 Проверяю:", title);

//       if (title.toLowerCase().includes(giftName.toLowerCase())) {
//         const container = h3.closest(".relative.p-4");
//         const priceEl = container?.querySelector(
//           "span.text-lg.font-semibold.text-white"
//         );
//         const price = priceEl?.textContent.trim();
//         return price ? `${title} — ${price} TON` : null;
//       }
//     }
//     return null;
//   }, name);

//   await browser.close();
//   return result;
// }

// // 🤖 Бот слушает
// bot.on("message", async (msg) => {
//   console.log("📩 Получено сообщение:", msg);
//   const chatId = msg.chat.id;
//   const text = msg.text?.toLowerCase().trim();
//   if (!text) return;

//   if (text.includes("дилдо")) {
//     bot.sendMessage(chatId, "бесценно 💋");
//     return;
//   }

//   // Ищем самое точное совпадение
//   let matchedName = null;
//   let matchedKeyword = null;

//   for (const [keyword, name] of Object.entries(keywordToGiftName)) {
//     if (text.includes(keyword.toLowerCase())) {
//       if (!matchedKeyword || keyword.length > matchedKeyword.length) {
//         matchedKeyword = keyword;
//         matchedName = name;
//       }
//     }
//   }

//   if (!matchedName) {
//     return;
//   }

//   const priceInfo = await getGiftPriceByName(matchedName);
//   if (priceInfo) {
//     bot.sendMessage(chatId, `🎁 ${priceInfo}`);
//   } else {
//     bot.sendMessage(chatId, "🙈 Не нашёл цену на этот подарок.");
//   }
// });
// конец

// bot.on("message", async (msg) => {
//   console.log("📩 Получено сообщение:", msg);
//   const chatId = msg.chat.id;
//   const text = msg.text?.toLowerCase().trim();
//   if (!text) return;

//   if (text.includes("дилдо")) {
//     bot.sendMessage(chatId, "бесценно 💋");
//     return;
//   }
//   let matchedName = null;
//   let matchedKeyword = null;

//   for (const [keyword, name] of Object.entries(keywordToGiftName)) {
//     const regex = new RegExp(`\\b${keyword}\\b`, "i");
//     if (regex.test(text)) {
//       // если это первое совпадение или длиннее предыдущего
//       if (!matchedKeyword || keyword.length > matchedKeyword.length) {
//         matchedKeyword = keyword;
//         matchedName = name;
//       }
//     }
//   }
//   // let matchedName = null;
//   // for (const [keyword, name] of Object.entries(keywordToGiftName)) {
//   //   const pattern = new RegExp(`(^|\\s)${keyword}(?=\\s|$)`, "i");
//   //   if (pattern.test(text)) {
//   //     matchedName = name;
//   //     break;
//   //   }
//   // }
//   if (!matchedName) {
//     return;
//   }

//   try {
//     const priceInfo = await getGiftPriceByName(matchedName);
//     if (priceInfo) {
//       bot.sendMessage(chatId, `${priceInfo}`);
//     } else {
//       bot.sendMessage(chatId, "🙈 Не нашёл цену на этот подарок.");
//     }
//   } catch (err) {
//     console.error("❌ Ошибка при парсинге:", err);
//     bot.sendMessage(chatId, "Произошла ошибка при получении цены 😢");
//   }
// });

// require("dotenv").config();

// const TelegramBot = require("node-telegram-bot-api");
// const { TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const fs = require("fs");

// // Настройки
// const BOT_TOKEN = process.env.BOT_TOKEN;
// const API_ID = parseInt(process.env.API_ID);
// const API_HASH = process.env.API_HASH;

// // Загружаем строку сессии из файла
// const stringSession = new StringSession(process.env.SESSION_STRING);

// // Ключевые слова → эмодзи
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
//   шляпа: "🎩",
//   топхет: "🎩",
//   "лав поушн": "💟",
//   колокольчик: "🔔",
//   "цветочек-череп": "🌺",
//   метла: "🧹",
//   проигрыватель: "🪩",
//   шар: "🔮",
//   сердце: "🫀",
//   звезда: "⭐️",
//   бабочка: "🤵",
//   сакура: "🌸",
//   маффин: "🧁",
//   мечик: "⚔️",
//   меч: "⚔️",
//   букет: "💐",
//   "новогодний шар": "❄️",
//   перчатки: "🧤",
//   блокнот: "📔",
//   гриб: "🍄",
//   глаз: "👁",
// };

// // Запускаем бота
// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text?.toLowerCase().trim();
//   if (!text) return;

//   if (text.includes("дилдо")) {
//     bot.sendMessage(chatId, "бесценно 💋");
//     return;
//   }

//   let emoji = null;
//   for (const [word, emj] of Object.entries(keywordToEmoji)) {
//     if (text.includes(word)) {
//       emoji = emj;
//       break;
//     }
//   }

//   // if (!emoji) {
//   //   bot.sendMessage(chatId, "😕 Не узнал слово.");
//   //   return;
//   // }

//   const client = new TelegramClient(stringSession, API_ID, API_HASH, {
//     connectionRetries: 5,
//   });

//   try {
//     await client.connect(); // 👈 не вызывает авторизацию, работает с сохранённой сессией

//     const messages = await client.getMessages("GiftMonitor", { limit: 5 });

//     let foundLine = null;
//     for (const message of messages) {
//       if (!message.message) continue; // пропускаем сообщения без текста

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
//       bot.sendMessage(chatId, `${foundLine}`);
//     }
//     // else {
//     //   bot.sendMessage(chatId, "🙈 Не нашёл цену для этого подарка.");
//     // }

//     await client.disconnect();
//   } catch (err) {
//     console.error("❌ Ошибка:", err);
//     bot.sendMessage(chatId, "Ошибка при получении данных.");
//   }
// });

// вариант с юзербот и каналом в телеге

// // const TelegramBot = require("node-telegram-bot-api");
// // const { TelegramClient } = require("telegram");
// // const { StringSession } = require("telegram/sessions");
// // const input = require("input");

// // // 🔑 Настройки
// // const BOT_TOKEN = "7670371799:AAGY9dRwx7VOS_hUTR3ijlRbWCDPHWosYno";
// // const API_ID = 28574582; // Получи на https://my.telegram.org
// // const API_HASH = "69f0193afd5aed64c51fae47eadf3d72";
// // const stringSession = new StringSession(""); // при первом запуске оставь ''

// // // 🔁 Словарь ключевых слов → эмодзи
// // const keywordToEmoji = {
// //   пепе: "🐸",
// //   сейлор: "💛",
// //   кепка: "🧢",
// //   персик: "🍑",
// //   шлем: "🪖",
// //   картье: "🎁",
// //   сумка: "👛",
// //   алмаз: "💎",
// //   шард: "💎",
// //   кольцо: "💍",
// //   зелье: "🧪",
// //   лампа: "🧞‍♂️",
// //   котик: "🐈",
// //   кот: "🐈",
// //   губы: "🫦",
// //   череп: "💀",
// //   сигара: "🚬",
// //   сигарета: "🚬",
// //   мишка: "🧸",
// //   вуду: "📍",
// //   тыква: "🎃",
// //   роза: "🥀",
// //   свеча: "🕯",
// //   шляпа: "🎩",
// //   "лав поушн": "💟",
// //   колокольчик: "🔔",
// //   "цветочек-череп": "🌺",
// //   метла: "🧹",
// //   проигрыватель: "🪩",
// //   шар: "🔮",
// //   сердце: "🫀",
// //   звезда: "⭐️",
// //   бабочка: "🤵",
// //   маффин: "🧁",
// //   мечик: "⚔️",
// //   меч: "⚔️",
// //   букет: "💐",
// //   "новогодний шар": "❄️",
// //   перчатки: "🧤",
// //   блокнот: "📔",
// //   глаз: "👁",
// // };

// // // ▶️ Telegram bot
// // const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// // bot.on("message", async (msg) => {
// //   const chatId = msg.chat.id;
// //   const text = msg.text?.toLowerCase();

// //   if (!text) return;

// //   const emoji = keywordToEmoji[text.trim()];
// //   //   if (!emoji) {
// //   //     bot.sendMessage(chatId, "Я не знаю такого подарка 🙁");
// //   //     return;
// //   //   }

// //   // Запускаем userbot
// //   const client = new TelegramClient(stringSession, API_ID, API_HASH, {
// //     connectionRetries: 5,
// //   });

// //   try {
// //     await client.start({
// //       phoneNumber: async () => await input.text("📱 Введите номер телефона: "),
// //       password: async () => await input.text("🔒 Введите пароль (если есть): "),
// //       phoneCode: async () => await input.text("💬 Введите код из Telegram: "),
// //       onError: (err) => console.log(err),
// //     });

// //     const messages = await client.getMessages("GiftMonitor", { limit: 5 });

// //     let foundLine = null;
// //     for (const message of messages) {
// //       const lines = message.message.split("\n");
// //       for (const line of lines) {
// //         if (line.includes(emoji)) {
// //           foundLine = line;
// //           break;
// //         }
// //       }
// //       if (foundLine) break;
// //     }

// //     if (foundLine) {
// //       bot.sendMessage(chatId, `🎁 ${foundLine}`);
// //     } else {
// //       bot.sendMessage(chatId, "Не смог найти цену 😢");
// //     }

// //     await client.disconnect();
// //   } catch (err) {
// //     console.error("❌ Ошибка userbot:", err);
// //     bot.sendMessage(chatId, "Произошла ошибка при получении данных.");
// //   }
// // });
