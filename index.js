// const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const cheerio = require("cheerio");
const { config } = require("dotenv");
config();

const BOT_TOKEN = process.env.BOT_TOKEN;
// const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(BOT_TOKEN);

const URL = process.env.RENDER_EXTERNAL_URL;
bot.setWebHook(`${URL}/bot${BOT_TOKEN}`);

app.use(express.json());

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// 🔁 Ключевые слова → отображаемое имя
const keywordToGiftName = {
  пепе: "Plush Pepe",
  сейлор: "Heart Locket",
  кепка: "Durov's Cap",
  персик: "Precious Peach",
  //   шлем: "Heroic Helmet",
  //   "шлем спартанца": "Heroic Helmet",
  картье: "Nail Bracelet",
  браслет: "Nail Bracelet",
  гвоздь: "Nail Bracelet",
  сумка: "Loot Bag",
  алмаз: "Astral Shard",
  "астрал шард": "Astral Shard",
  шард: "Astral Shard",
  //   "гем сигнет": "Gem Signet",
  //   "кольцо гем": "Gem Signet",
  ион: "Ion Gem",
  гем: "Ion Gem",
  оскар: "Mini Oscar",
  духи: "Perfume Bottle",
  парфюм: "Perfume Bottle",
  //   зелье: "Magic Potion",
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
  //   неко: "Neko Helmet",
  //   "неко хелмет": "Neko Helmet",
  //   "неко шлем": "Neko Helmet",
  //   кольцо: "Signet Ring",
  мишка: "Toy Bear",
  медведь: "Toy Bear",
  вуду: "Voodoo Doll",
  "кукла вуду": "Voodoo Doll",
  роза: "Eternal Rose",
  розочка: "Eternal Rose",
  тыква: "Mad Pumpkin",
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
  радость: "Joyful Bundle",
  собака: "Joyful Bundle",
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
  //   коробка: "Valentine Box",
  //   "коробка конфет": "Valentine Box",
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
  //   "зелье ведьмы": "Hex Pot",
  //   "хекс пот": "Hex Pot",
  глаз: "Evil Eye",
  //   змейка: "Lunar Snake",
  //   змея: "Lunar Snake",
  тамагочи: "Tama Gadget",
  тамагаджет: "Tama Gadget",
  "тама гаджет": "Tama Gadget",
  //   "шляпа ведьмы": "Witch Hat",
  "кенди кейн": "Candy Cane",
  //   "гипно лолик": "Hypno Lollipop",
  //   гипнололипоп: "Hypno Lollipop",
  //   хипнололипоп: "Hypno Lollipop",
  кружка: "Holiday Drink",
  кулончик: "Cupid Charm",
  купид: "Cupid Charm",
  подвеска: "Cupid Charm",
  //   коробка: "Snake Box",
  //   сердечко: "Cookie Heart",
  куки: "Cookie Heart",
  "куки харт": "Candy Cane",
  год: "Big Year",
  цифры: "Big Year",
  меч: "Light Sword",
  //   "шапка санты": "Santa Hat",
  //   "шляпа санты": "Santa Hat",
  //   "пет снейк": "Pet Snake",
  календарь: "Desk Calendar",
  "бери бокс": "Berry Box",
  "берри бокс": "Berry Box",
  //   "коробка конфет": "Berry Box",
  //   свечка: "B-Day Candle",
  //   бездей: "B-Day Candle",
  "джек ин зе бокс": "Jack-in-the-Box",
  //   коробка: "Jack-in-the-Box",
  джек: "Jack-in-the-Box",
  //   "даймонд ринг": "Diamond Ring",
  //   "кольцо в коробке": "Diamond Ring",
  //   "шляпа шута": "Jester Hat",
  яйцо: "Easter Egg",
  пряник: "Ginger Cookie",
  //   "пряничный человечек": "Ginger Cookie",
  //   печенька: "Ginger Cookie",
  "пати спаркл": "Party Sparkler",
  бенгальский: "Party Sparkler",
  палочка: "Party Sparkler",
  палка: "Party Sparkler",
  //   колокольчики: "Jingle Bells",
  джелли: "Jelly Bunny",
  "джелли бани": "Jelly Bunny",
  желейка: "Jelly Bunny",
  желе: "Jelly Bunny",
  глинтвейн: "Spiced Wine",
  //   лолипоп: "Lol Pop",
  //   лоллипоп: "Lol Pop",
  торт: "Homemade Cake",
  тортик: "Homemade Cake",
  //   перстень: "Bonded Ring",
  носок: "Xmas Stocking",
  венок: "Winter Wreath",
  капкейк: "Whip Cupcake",
  банка: "Restless Jar",
  //   свечка: "Eternal Candle",

  дилдо: "бесценно",
};

const keywordToGiftNamesMulti = {
  "снуп дог": [
    "Westside Sign",
    "Low Rider",
    "Snoop Cigar",
    "Swag Bag",
    "Snoop Dogg",
  ],
  снупдог: [
    "Westside Sign",
    "Low Rider",
    "Snoop Cigar",
    "Swag Bag",
    "Snoop Dogg",
  ],
  снуп: ["Westside Sign", "Low Rider", "Snoop Cigar", "Swag Bag", "Snoop Dogg"],
  hat: ["Top Hat", "Witch Hat", "Santa Hat", "Jester Hat"],
  шляпа: ["Top Hat", "Witch Hat", "Santa Hat", "Jester Hat"],
  шапка: ["Top Hat", "Witch Hat", "Santa Hat", "Jester Hat"],
  кольцо: ["Gem Signet", "Bonded Ring", "Signet Ring", "Diamond Ring"],
  змея: ["Pet Snake", "Lunar Snake", "Snake Box"],
  змейка: ["Pet Snake", "Lunar Snake", "Snake Box"],
  коробка: ["Joyful Bundle", "Valentine Box", "Berry Box", "Jack-in-the-Box"],
  коробочка: ["Joyful Bundle", "Valentine Box", "Berry Box", "Jack-in-the-Box"],
  свеча: ["Love Candle", "Eternal Candle", "B-Day Candle"],
  свечка: ["Love Candle", "Eternal Candle", "B-Day Candle"],
  лолипоп: ["Hypno Lollipop", "Lol Pop"],
  лоллипоп: ["Hypno Lollipop", "Lol Pop"],
  лолик: ["Hypno Lollipop", "Lol Pop"],
  лоллик: ["Hypno Lollipop", "Lol Pop"],
  зелье: ["Magic Potion", "Love Potion", "Hex Pot"],
  шлем: ["Heroic Helmet", "Neko Helmet"],
  колокольчик: ["Sleigh Bell", "Jingle Bells"],
  колокольчики: ["Sleigh Bell", "Jingle Bells"],
  печенье: ["Cookie Heart", "Ginger Cookie"],
  печенька: ["Cookie Heart", "Ginger Cookie"],
};

// 🔁 Кэш цен
let cachedPrices = new Map();
let lastUpdated = null;

// 🔄 Фоновая функция для обновления цен
// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer");
const chromium = require("@sparticuz/chromium");

async function updateCache() {
  console.log("🔄 Обновляю кэш цен...");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: chromium.args,
      executablePath: await chromium.executablePath, // Всегда указываем путь
    });

    const page = await browser.newPage();

    await page.goto("https://peek.tg/stats", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.waitForSelector("h3.font-medium.text-white.text-base.truncate", {
      timeout: 10000,
    });

    const extracted = await page.evaluate(() => {
      const result = [];
      const h3s = document.querySelectorAll(
        "h3.font-medium.text-white.text-base.truncate"
      );

      h3s.forEach((el) => {
        const title = el.textContent.trim();
        const container = el.closest(".relative.p-4");
        const priceEl = container?.querySelector(
          "span.text-lg.font-semibold.text-white"
        );
        const price = priceEl?.textContent.trim();

        if (title && price) {
          result.push([title.toLowerCase(), `${title} — ${price} TON`]);
        }
      });

      return result;
    });

    await browser.close();

    if (extracted.length > 0) {
      cachedPrices = new Map(extracted);
      lastUpdated = new Date();
      console.log(`✅ Цены обновлены: ${cachedPrices.size} подарков`);
    } else {
      console.warn(
        "⚠️ Получено 0 подарков — возможно, сайт не загрузился корректно."
      );
    }
  } catch (err) {
    console.error("❌ Ошибка при обновлении цен:", err.message);
  }
}

// ⏰ Обновляем кэш каждые 60 сек
updateCache();
setInterval(updateCache, 60_000);

// 🤖 Бот слушает
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase().trim();
  if (!text) return;

  // спец. случай
  if (text.includes("дилдо")) {
    bot.sendMessage(chatId, "бесценно 💋");
    return;
  }

  // мульти-подарки
  for (const [keyword, giftNames] of Object.entries(keywordToGiftNamesMulti)) {
    if (text.includes(keyword)) {
      const messages = giftNames
        .map((name) => cachedPrices.get(name.toLowerCase()))
        .filter(Boolean)
        .join("\n");

      bot.sendMessage(chatId, messages || "🙈 Не нашёл цены на подарки.");
      return;
    }
  }

  // обычные
  let matchedName = null;
  let matchedKeyword = null;
  for (const [keyword, name] of Object.entries(keywordToGiftName)) {
    if (text.includes(keyword)) {
      if (!matchedKeyword || keyword.length > matchedKeyword.length) {
        matchedKeyword = keyword;
        matchedName = name;
      }
    }
  }

  if (!matchedName) return;

  const priceInfo = cachedPrices.get(matchedName.toLowerCase());
  if (priceInfo) {
    bot.sendMessage(chatId, `${priceInfo}`);
  } else {
    bot.sendMessage(chatId, "🙈 Не нашёл цену на этот подарок.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook-сервер запущен на порту ${PORT}`);
});
