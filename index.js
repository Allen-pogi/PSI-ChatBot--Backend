import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OpenAI from "openai";
import Category from "./models/category.js";

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

  - Only return racking systems that exist in the database.  
- Do not suggest or invent any options not in the database.  
- Respond exactly with the product name, description, and partner.  
- Do not give general advice, alternatives, or comparisons.  
- If no racking in the database matches the query, respond: "Sorry, we can't process this request. Please contact us for details."  
- Always include official contact information after the product information.

  - Do not rephrase, generalize, or add extra commentary.
  - If the user asks about the company, you may rephrase the Company Info for clarity.
  - If the user asks about products, you may rephrase the descriptions, but do not add or invent any new products.
  - If somebody asks about products or services not listed, respond with "For further details, please call us at: (02) 8839-0106 and dial local 115, or you can email us at marketing@primegroup.com.ph"
  - Always maintain a professional and helpful tone.
  - If somebody asking for the purpose of the product, you may answer based on your knowledge but only if it is related to the products listed above.
  - If user asks prices and deals, respond with "For pricing, deals, information, call us at: (02) 8839-0106 and dial local 115, or you can email us at marketing@primegroup.com.ph"
  - If someone asks personal questions like can it be used in here, there, etc. respond based on your knowledge but only if it is related to the products listed above.
  - If someone asks for recommendations, you may provide suggestions based on the products listed above.
  - If the user asks questions not related to PSI, its products, or services, respond with "I'm sorry, I can only answer questions related to Prime Sales Incorporated (PSI) and its products and services."
  - Don't answer the combination of for further details and for more information and I'm sorry in one response in one response.
  - If the user asks for a summary of the products, you may provide a brief overview of the products listed above.
  - If the user asks for a comparison between products, you may provide a comparison based on the features and benefits of the products listed above.
  - If the user asks for technical specifications, you may provide details based on the descriptions of the products listed above.
  - Strictly answer the products and services that comes from database only.
  - Do not include phone numbers or emails in your replies. The system will automatically append the official contact details at the end of your answer.
  - Do not add for further details and for more information in your answers because i already have that in the ending note.
-  If somebody asks for explanation or more details about products you can answer them based on your knowledge.
-  If somebody asks for products alwayys come with descriptions.
- Give the partners and brand and its products if it is being asked, don't recommend it partners if somebody asks for a product recommendations or other questions.
  - Please follow the rules strictly.
  `;

// Company Info:
// - Prime Sales Incorporated (PSI), founded in 1976, is a leading supplier of intralogistics solutions in the Philippines, specializing in dry and cold chain applications.
// - Located in Prime Corporate Center, km. 15 East Service Rd., cor. Marian Rd. 2, Brgy. San Martin De Porres, Parañaque City, Parañaque, Philippines
// - You was created by the IT personnel of PSI.
// - Efren S. Pascual Jr. is the current President of Prime Sales, Inc. He is responsible for leading the company’s overall direction, overseeing operations, and ensuring that Prime Sales continues to grow and serve its partners effectively.
// - Our office hours are from 8:00 AM to 5:00 PM, Monday to Friday.
// - We are committed to strong after-sales service. This means we don’t just provide products — we provide long-term support. Our dedicated service team ensures that customers receive:
//   • Technical assistance and troubleshooting
//   • Preventive maintenance and on-site servicing
//   • Quick response for spare parts and repairs
//   • Professional guidance to maximize equipment lifespan and efficiency
//   • Reliable support that builds long-term partnerships
//   Many customers choose PSI because of this ongoing support, which gives them peace of mind and ensures smooth operations even after installation.

// ---- FETCH RELEVANT PRODUCTS ----
const fetchRelevantProducts = async (message) => {
  const msg = message.toLowerCase();

  // If user is asking for product lines or categories only
  if (
    msg.includes("categories") ||
    msg.includes("product lines") ||
    msg.includes("product line")
  ) {
    return { categoriesOnly: true, data: await Category.find({}, "name") };
  }

  // general product queries → return all
  if (
    msg.includes("all products") ||
    msg.includes("your products") ||
    msg.includes("list of products") ||
    msg.includes("overview of products") ||
    msg.includes("what do you have")
  ) {
    return { categoriesOnly: false, data: await Category.find() };
  }

  if (msg.includes("cold chain") || msg.includes("cold storage ")) {
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
  if (msg.includes("storage") || msg.includes(" plastic pallet ")) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Industrial Storage Solutions" }),
    };
  }
  if (
    msg.includes("racking system") ||
    msg.includes("pallet racking") ||
    msg.includes("rackings" || msg.includes("racking"))
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
  if (msg.includes("battery") || msg.includes("charger")) {
    return {
      categoriesOnly: false,
      data: await Category.find({ name: "Industrial Batteries & Chargers" }),
    };
  }

  return null; // nothing matched
};
const findExactProduct = async (message) => {
  const msg = message.toLowerCase().trim();

  const product = await Category.aggregate([
    { $unwind: "$subcategories" },
    { $unwind: "$subcategories.products" },
    {
      $match: {
        "subcategories.products.name": { $regex: new RegExp(msg, "i") }, // partial match OK
      },
    },
    {
      $project: {
        _id: 0,
        name: "$subcategories.products.name",
        description: "$subcategories.products.description",
      },
    },
  ]);

  return product;
};
export async function searchProducts(query) {
  // Escape regex special chars
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  // Search inside products (nested in categories → subcategories → products)
  const categories = await Category.find({
    "subcategories.products.name": { $regex: regex },
  });

  let results = [];

  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((p) => {
        if (regex.test(p.name) || regex.test(p.description)) {
          results.push(p);
        }
      });
    });
  });

  return results;
}

// // ---- BUILD PROMPT DYNAMICALLY ----
const buildSystemPrompt = async (message) => {
  let prompt = baseSystemPrompt;
  const categoriesResult = await fetchRelevantProducts(message);

  // Only include products/services (not categories) in the system prompt
  if (
    categoriesResult &&
    categoriesResult.data.length > 0 &&
    !categoriesResult.categoriesOnly
  ) {
    let productList = "\nProducts, Services and Offers:\n";
    categoriesResult.data.forEach((cat) => {
      productList += `* ${cat.name}:\n`;
      cat.subcategories.forEach((sub) => {
        productList += `(${sub.name})\n`;
        sub.products.forEach((p) => {
          productList += `• ${p.name} – ${p.description}\n`;
        });
      });
      productList += "\n";
    });
    prompt += productList;
  }

  return prompt;
};

// --- Extract keywords from user input ---
function extractKeywords(message) {
  return message
    .toLowerCase()
    .replace(
      /\b(do you have|do u have|have you got|please|psi|prime sales|products?|solutions?)\b/gi,
      ""
    )
    .trim();
}

// ---- OpenAI Client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isAvailabilityQuestion(message) {
  return /\b(do you have|do u have|have you got|offer)\b/i.test(message);
}

// ---- Chat Endpoint ----
let chatHistory = []; // store all previous messages

async function fallbackOpenAI(message) {
  const systemPrompt = await buildSystemPrompt(message);

  // push user message
  chatHistory.push({ role: "user", content: message });

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
      ...chatHistory,
    ],
  });

  const botReply = response.output[0].content[0].text.trim();

  // push assistant reply
  chatHistory.push({ role: "assistant", content: botReply });

  return botReply;
}

function buildDBReply(catResult, keyword) {
  if (!catResult || catResult.data.length === 0) return "";

  let reply = "";

  catResult.data.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      reply += `Absolutely! Here are the ${
        keyword || cat.name
      } we have available:\n`;
      sub.products.forEach((p) => {
        reply += `• ${p.name} – ${p.description}\n\n`; // notice the double \n
      });
    });
  });

  return reply;
}

// ---- BUILD REPLY FOR ALL PRODUCTS ----
async function buildAllProductsReply() {
  const allCategories = await Category.find();

  if (!allCategories || allCategories.length === 0) return "";

  let reply = "Absolutely! Here are all the products we have available:\n\n";

  allCategories.forEach((cat) => {
    reply += ` For ${cat.name}: \n\n`; // Main category

    cat.subcategories.forEach((sub) => {
      sub.products.forEach((p) => {
        reply += `• ${p.name} – ${p.description}\n\n`; // Product
      });
      reply += "\n";
    });

    reply += "\n"; // Space between main categories
  });

  return reply.trim();
}

app.get("/chat", async (req, res) => {
  const message = req.query.message;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    let botReply = "";

    const msgLower = message.toLowerCase();

    // 1️⃣ All products
    if (
      msgLower.includes("all products") ||
      msgLower.includes("your products")
    ) {
      botReply = await buildAllProductsReply();
    }
    // 2️⃣ Availability question
    else if (isAvailabilityQuestion(message)) {
      const keyword = extractKeywords(message);
      let product = [];

      if (keyword) {
        product = await findExactProduct(keyword);
        if (product.length === 0) {
          product = await searchProducts(keyword);
        }
      }

      if (product.length > 0) {
        botReply = `Yes, we have the following:\n${product
          .map((p) => `• ${p.name} – ${p.description}`)
          .join("\n")}`;
      } else {
        const catResult = await fetchRelevantProducts(message);
        if (catResult && catResult.data.length > 0) {
          botReply = buildDBReply(catResult, keyword);
        } else {
          botReply = await fallbackOpenAI(message);
        }
      }
    }
    // 3️⃣ Fallback for any other query (like specific product lookup)
    else {
      // Try exact product search first
      let product = await findExactProduct(message);
      if (product.length === 0) {
        product = await searchProducts(message);
      }

      if (product.length > 0) {
        botReply = `Yes, we have the following:\n${product
          .map((p) => `• ${p.name} – ${p.description}`)
          .join("\n")}`;
      } else {
        botReply = await fallbackOpenAI(message);
      }
    }

    botReply +=
      "\n\nFor further details, please call us at: (02) 8839-0106 and dial local 115, or you can email us at marketing@primegroup.com.ph.";

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---- Default Route ----
app.get("/hello", (req, res) => {
  res.send("Hello! The server is running.");
});

app.get("/test-cors", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ msg: "CORS test works!" });
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
