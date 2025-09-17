import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";
import stringSimilarity from "string-similarity";
import Category from "./models/category.js";

import CompanyInfo from "./models/companyInfo.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// ---- BASE SYSTEM PROMPT (static info only) ----
const baseSystemPrompt = `
  Your name is PRIMO a chatbot of Prime Sales Incorporated Company (PSI). 
  Answer questions ONLY about PSI, its products, and services. 
  You may rephrase the text for better readability, but DO NOT add, remove, or invent any new products or services.

  Do NOT use bold (**), italics (*), or Markdown formatting. 
  And also list products one each line starting with a bullet point (•).
    
  Rules:
- STRICTLY do not answer other partner or companies product ONLY Prime Sales.
- Do not say anything like yes, we offer something that are not sure and included to the database.
- Do not suggest or invent any options not in the database.  
- Strictly only provide products from the database. Do not invent or suggest alternatives.
- If the user asks about products, you may rephrase the descriptions, but do not add or invent any new products.
- Include product name, description, and partner.
- Maintain context from chat history.
- Do not rephrase or generalize product info.
- If unclear, respond: "For further details, please call us at: (02) 8839-0106, local 115, or email marketing@primegroup.com.ph"
- For non-PSI questions: "I'm sorry, I can only answer questions related to PSI and its products/services."
- Do not include phone numbers or emails in your answers; the system appends them automatically.
- Always keep responses professional, helpful, and strictly about database products.
- Do not add products that you are not sure when somebody asks. Always look at the database.
`;

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fetchRelevantInfo = async (message) => {
  const msg = message.toLowerCase();

  const getReply = async (key) => {
    const entry = await CompanyInfo.findOne({ key });
    if (!entry) return null;
    return Array.isArray(entry.content)
      ? pickRandom(entry.content)
      : entry.content;
  };
  if (msg.includes("who are you") || msg.includes("who are u")) {
    return await getReply("primo");
  }
  if (
    msg.includes("location") ||
    msg.includes("loc") ||
    msg.includes("where are you located") ||
    msg.includes("where are u located") ||
    msg.includes("address") ||
    msg.includes("office location") ||
    msg.includes("psi location") ||
    msg.includes("where is psi located") ||
    msg.includes("prime sales location") ||
    msg.includes("where can I visit you") ||
    msg.includes("prime sales loc") ||
    msg.includes("psi loc")
  ) {
    return await getReply("location");
  }
  if (
    msg.includes("business hours") ||
    msg.includes("Operation hours") ||
    msg.includes("Office hours") ||
    msg.includes("prime sales hours")
  ) {
    return await getReply("hours");
  }

  if (
    msg.includes("main branch map") ||
    msg.includes("main map") ||
    msg.includes("main branch google map") ||
    msg.includes("show map") ||
    msg.includes("show maps") ||
    msg.includes("PSI map") ||
    msg.includes("Prime Sales map") ||
    msg.includes("Prime Sales maps") ||
    msg.includes("Prime Sales direction") ||
    msg.includes("Prime Sales directions") ||
    msg.includes("PSI direction") ||
    msg.includes("PSI directions") ||
    msg.includes("location map") ||
    msg.includes("branch map")
  ) {
    return await getReply("map-head-office");
  }
  if (
    msg.includes("cebu office map") ||
    msg.includes("cebu office direction") ||
    msg.includes("cebu-direction") ||
    msg.includes("cebu direction") ||
    msg.includes("cebu maps") ||
    msg.includes("cebu ")
  ) {
    return await getReply("map-cebu");
  }

  if (
    msg.includes("president of psi") ||
    msg.includes("president") ||
    msg.includes("psi president")
  ) {
    return await getReply("president");
  }
  if (
    msg.includes("contact support") ||
    msg.includes("contacts") ||
    msg.includes("contact") ||
    msg.includes("where can I call you") ||
    msg.includes("hotline")
  ) {
    return await getReply("contact");
  }
  if (
    msg.includes("after sales") ||
    msg.includes("support") ||
    msg.includes("service")
  ) {
    return await getReply("afterSales");
  }
  if (
    msg.includes("why choose u") ||
    msg.includes("why choose you") ||
    msg.includes("why choose Prime Sales") ||
    msg.includes("why should I choose you") ||
    msg.includes("why should I choose PSI")
  ) {
    return await getReply("choose");
  }

  if (
    msg.includes("prime sales") ||
    msg.includes("psi") ||
    msg.includes("company info") ||
    msg.includes("about you") ||
    msg.includes("about prime sales")
  ) {
    return await getReply("about");
  }

  return null;
};

// ---- FETCH RELEVANT PRODUCTS ----
const fetchRelevantProducts = async (message) => {
  const msg = message.toLowerCase();

  if (
    msg.includes("all products") ||
    msg.includes("your products") ||
    msg.includes("products list") ||
    msg.includes("overview of products") ||
    msg.includes("what do you have") ||
    msg.includes("product catalog")
  ) {
    return { categoriesOnly: false, data: await Category.find() };
  }

  if (msg.includes("cold chain") || msg.includes("cold storage")) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Cold Chain Solutions" }),
    };
  }
  if (msg.includes("docks") || msg.includes("doors")) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Docks & Doors" }),
    };
  }
  if (msg.includes("storage") || msg.includes("plastic pallet")) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Industrial Storage Solutions" }),
    };
  }
  if (
    msg.includes("racking system") ||
    msg.includes("pallet racking") ||
    msg.includes("rackings") ||
    msg.includes("racking") ||
    msg.includes("racks")
  ) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Industrial Storage Solutions" }),
    };
  }
  if (
    msg.includes("forklift") ||
    msg.includes("trucks") ||
    msg.includes("material handling") ||
    msg.includes("mhe")
  ) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Material Handling Equipment" }),
    };
  }
  if (
    msg.includes("battery") ||
    msg.includes("charger") ||
    msg.includes("batteries") ||
    msg.includes("chargers")
  ) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Industrial Batteries & Chargers" }),
    };
  }

  return null;
};

// ---- FUZZY PRODUCT SEARCH ----
async function fuzzyProductSearch(message) {
  const query = message.toLowerCase().trim();

  const categories = await Category.find();
  let allProducts = [];

  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((p) => {
        allProducts.push(p);
      });
    });
  });

  if (allProducts.length === 0) return [];

  const productNames = allProducts.map((p) => p.name.toLowerCase());
  const { ratings } = stringSimilarity.findBestMatch(query, productNames);

  // return ALL products that are reasonably close
  const matchedProducts = ratings
    .filter((r) => r.rating >= 0.5) // threshold
    .map((r) => r.target);

  return allProducts.filter((p) =>
    matchedProducts.includes(p.name.toLowerCase())
  );
}

// ---- OPENAI Client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isAvailabilityQuestion(message) {
  return /\b(do you have|do u have|have you got|offer||)\b/i.test(message);
}

let chatHistory = [];

// ---- FALLBACK to OpenAI ----
async function fallbackOpenAI(message) {
  const systemPrompt = baseSystemPrompt;
  chatHistory.push({ role: "user", content: message });

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [{ role: "system", content: systemPrompt }, ...chatHistory],
  });
  if (response.usage) {
    console.log("Token usage:", response.usage);
  }
  const botReply = response.output[0].content[0].text.trim();
  chatHistory.push({ role: "assistant", content: botReply });

  return botReply;
}

function buildDBReply(catResult, keyword) {
  if (!catResult || catResult.data.length === 0) return "";

  let reply = `Absolutely! Here are the ${
    keyword || "products"
  } we have available:\n\n`;

  catResult.data.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      reply += `For ${cat.name} :\n`;

      sub.products.forEach((p) => {
        // pick random description if it's an array
        let desc;
        if (Array.isArray(p.descriptions) && p.descriptions.length > 0) {
          desc =
            p.descriptions[Math.floor(Math.random() * p.descriptions.length)];
        } else {
          desc = p.description; // fallback to single description
        }

        reply += `• ${p.name} – ${desc}\n\n`;
      });

      reply += "\n";
    });
  });

  return reply;
}

async function buildAllProductsReply() {
  const allCategories = await Category.find();
  if (!allCategories || allCategories.length === 0) return "";

  let reply = "Absolutely! Here are all the products we have available:\n\n";

  for (const cat of allCategories) {
    reply += `For ${cat.name}:\n\n`;

    for (const sub of cat.subcategories) {
      for (const p of sub.products) {
        if (p.descriptions && p.descriptions.length > 0) {
          const randomDesc =
            p.descriptions[Math.floor(Math.random() * p.descriptions.length)];
          reply += `• ${p.name} – ${randomDesc}\n\n`;
        } else {
          reply += `• ${p.name}\n\n`; // fallback if no description
        }
      }
    }

    reply += "\n";
  }

  return reply;
}

// ---- CHAT ENDPOINT ----
app.get("/chat", async (req, res) => {
  const message = req.query.message;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    let botReply = "";
    const msgLower = message.toLowerCase();
    let isContactInquiry = false; // track if it's contact-related

    const companyInfo = await fetchRelevantInfo(message);
    if (companyInfo) {
      botReply = companyInfo;

      // Check if the info came from "contact"
      if (
        msgLower.includes("contact") ||
        msgLower.includes("contacts") ||
        msgLower.includes("hotline") ||
        msgLower.includes("where can i call you") ||
        msgLower.includes("contact support")
      ) {
        isContactInquiry = true;
      }
    } else if (
      msgLower.includes("all products") ||
      msgLower.includes("your products") ||
      msgLower.includes("all products") ||
      msgLower.includes("your products") ||
      msgLower.includes("products list") ||
      msgLower.includes("overview of products") ||
      msgLower.includes("what do you have") ||
      msgLower.includes("product catalog")
    ) {
      botReply = await buildAllProductsReply();
    } else if (isAvailabilityQuestion(message)) {
      const catResult = await fetchRelevantProducts(message);

      if (catResult && catResult.data.length > 0) {
        botReply = buildDBReply(catResult);
      } else {
        let product = await fuzzyProductSearch(message);
        if (product.length > 0) {
          botReply = `Yes, we have the following:\n${product
            .map((p) => {
              let desc;
              if (Array.isArray(p.descriptions) && p.descriptions.length > 0) {
                desc =
                  p.descriptions[
                    Math.floor(Math.random() * p.descriptions.length)
                  ];
              } else {
                desc = p.description || "Description not available";
              }
              return `• ${p.name} – ${desc}`;
            })
            .join("\n")}`;
        } else {
          botReply = await fallbackOpenAI(message);
        }
      }
    } else {
      let product = await fuzzyProductSearch(message);
      if (product.length > 0) {
        botReply = `Yes, we have the following:\n${product
          .map((p) => {
            let desc;
            if (Array.isArray(p.descriptions) && p.descriptions.length > 0) {
              desc =
                p.descriptions[
                  Math.floor(Math.random() * p.descriptions.length)
                ];
            } else {
              desc = p.description || "Description not available";
            }
            return `• ${p.name} – ${desc}`;
          })
          .join("\n")}`;
      } else {
        botReply = await fallbackOpenAI(message);
      }
    }

    // Only append contact line if it's NOT a contact inquiry
    if (!isContactInquiry) {
      botReply +=
        "\n\nFor further details, please call us at: (02) 8839-0106 and dial local 115 or you can email us at marketing@primegroup.com.ph.";
    }

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "We can't process your request. Please try again later.",
    });
  }
});

// ---- Default Routes ----
app.get("/hello", (req, res) => res.send("Hello! The server is running."));
app.get("/test-cors", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ msg: "CORS test works!" });
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
