import mongoose from "mongoose";
import Category from "./models/category.js";
import dotenv from "dotenv";
dotenv.config();

const categories = [
  {
    name: "Cold Chain Solutions",
    subcategories: [
      {
        name: "Main",
        products: [
          {
            name: "Structural Insulated Panel",
            description: "Energy-saving panels for cold rooms and warehouses.",
          },
          {
            name: "Insulated Doors",
            description:
              "Tightly sealed doors that maintain cold temperatures.",
          },
          {
            name: "Panel and Door Accessories",
            description:
              "Fittings and add-ons to complete cold storage systems.",
          },
        ],
      },
    ],
  },
  {
    name: "Docks & Doors",
    subcategories: [
      {
        name: "Loading Technology",
        products: [
          {
            name: "Dock Levellers",
            description:
              "Bridges the gap between trucks and docks for safe loading.",
          },
          {
            name: "Loading Houses",
            description: "Enclosed dock systems that protect goods and staff.",
          },
          {
            name: "Dock Seals or Shelters",
            description:
              "Seal the space around trucks to keep dust, pests, and weather out.",
          },
          {
            name: "Control Systems",
            description:
              "Smart controls for safe and efficient dock operations.",
          },
          {
            name: "Dock & Safety Accessories",
            description: "Extra tools to improve safety at the loading dock.",
          },
        ],
      },
      {
        name: "Industrial Doors",
        products: [
          {
            name: "Industrial Sectional Doors",
            description: "Insulated doors for warehouses and factories.",
          },
          {
            name: "High-Speed Sectional Doors",
            description: "Fast-opening doors to save energy and time.",
          },
          {
            name: "Industrial Rolling Shutters",
            description: "Strong shutters for security and easy access.",
          },
          {
            name: "Industrial Rolling Grilles",
            description: "Ventilated grilles for protection with airflow.",
          },
          {
            name: "Strip Curtains",
            description:
              "Flexible plastic strips that keep temperature and dust under control.",
          },
          {
            name: "ISO Doors",
            description:
              "Specialized doors for cleanrooms and controlled environments.",
          },
        ],
      },
    ],
  },
  {
    name: "Industrial Storage Solutions",
    subcategories: [
      {
        name: "Pallet Racking System",
        products: [
          {
            name: "Wide Aisle",
            description: "Standard racks for easy forklift access.",
          },
          {
            name: "Narrow Aisle",
            description: "Space-saving racks for tighter warehouses.",
          },
          {
            name: "Mobile Pallet Racking",
            description: "Racks on tracks to maximize storage space.",
          },
          {
            name: "Pallet Shuttle System",
            description: "Semi-automated storage using shuttles.",
          },
          {
            name: "Drive-in Racking",
            description:
              "High-density storage for large volumes of the same product.",
          },
          {
            name: "Pallet Flow",
            description: "Gravity-fed racks for first-in-first-out storage.",
          },
          {
            name: "Multi-Tier",
            description: "Multi-level racks to maximize vertical space.",
          },
        ],
      },
      {
        name: "Plastic Pallets",
        products: [
          {
            name: "Eco Pallets",
            description: "Cost-effective pallets for general use.",
          },
          {
            name: "Warehouse Pallets",
            description: "Durable pallets for everyday warehouse operations.",
          },
          {
            name: "Hygiene Pallets",
            description:
              "Easy-to-clean pallets for food and pharmaceutical use.",
          },
          {
            name: "Automatic Storage Pallets",
            description:
              "Designed for automated storage and retrieval systems (ASRS).",
          },
          {
            name: "Metal Reinforced Pallets",
            description: "Heavy-duty pallets for extra strength.",
          },
          {
            name: "Spill Containment Pallets",
            description: "Pallets designed to catch leaks and spills.",
          },
        ],
      },
    ],
  },
  {
    name: "Material Handling Equipment",
    subcategories: [
      {
        name: "Main",
        products: [
          {
            name: "ICE Counterbalance Trucks",
            description: "Fuel-powered forklifts for heavy loads.",
          },
          {
            name: "Electric Counterbalance Trucks",
            description: "Eco-friendly forklifts powered by electricity.",
          },
          {
            name: "Pallet Trucks",
            description: "Simple hand or powered trucks for moving pallets.",
          },
          {
            name: "Reach Trucks",
            description: "Forklifts designed for tall and narrow aisles.",
          },
          {
            name: "Order Pickers",
            description:
              "Lifts that help staff pick items from high or elevated racks.",
          },
          {
            name: "VNA Trucks",
            description:
              "Very narrow aisle trucks for high-density warehouses.",
          },
        ],
      },
    ],
  },
  {
    name: "Industrial Batteries & Chargers",
    subcategories: [
      {
        name: "Main",
        products: [
          {
            name: "Traction Batteries",
            description:
              "Reliable batteries for forklifts and material handling machines.",
          },
          {
            name: "Pro Series Traction Battery Chargers",
            description: "Efficient chargers for everyday use.",
          },
          {
            name: "Advance Series Traction Battery Chargers",
            description:
              "Advanced chargers with faster charging and longer battery life.",
          },
        ],
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany(); // clear old data
    await Category.insertMany(categories);

    console.log("✅ Database seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDB();
