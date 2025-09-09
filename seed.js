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
            description:
              "CR18 Wide Aisle Pallet Racking provides unrestricted access to all pallets, making it versatile for single- or double-depth racks. It adapts to various warehouse layouts, pallet types (Euro, Chep, disposable, captive, mesh boxes, bins), and can be customized with different beams, supports, shelves, and accessories.",
          },
          {
            name: "Narrow Aisle",
            description:
              "Narrow Aisle Pallet Racking is a space-saving system that maximizes storage capacity in limited floor space. It ensures fast pallet access and efficient order picking using specialized stackers (man-down, man-up, or high-lift). The system offers flexible heights and depths, with adjustable beams, and often works with guided handling equipment (wire or rail) for smooth operations.",
          },
          {
            name: "Mobile Pallet Racking",
            description:
              "Mobile Racking (MOVO) is a high-density storage system that can double capacity compared to conventional racks. It uses electronically controlled bases running on in-ground rails, supporting bay loads up to 24 tons and heights up to 12m. Equipped with sensors and control options, MOVO ensures safe, flexible, and efficient pallet storage for all types of goods.",
          },
          {
            name: "Pallet Shuttle System",
            description:
              "The Pallet Shuttle system is a semi-automated, high-density storage solution that removes the need for forklifts to enter the racks. Operated by remote control, it enables fast pallet handling in channels similar to drive-in or pallet-flow setups. The system supports FIFO or LIFO operations, making it ideal for storing fewer product lines in large quantities.",
          },
          {
            name: "Drive-in Racking",
            description:
              "Drive-in Pallet Racking is a high-density storage system that can save up to 90% of floor space compared to conventional pallet storage. Pallets are stored on front-to-back rails, allowing safe stacking and efficient handling, especially for fragile or unstable goods. It follows the Last-in, First-out (LIFO) principle, giving access to pallets one-by-one from the rack front.",
          },
          {
            name: "Pallet Flow",
            description:
              "Pallet Flow Racking (Pallet Live Storage) is a FIFO storage system that can save up to 60% of space compared to conventional racking. It uses integrated roller conveyors to move pallets smoothly and safely with automatic braking and load guides. Ideal for high-volume industries like beverages or as buffer storage in manufacturing.",
          },
          {
            name: "Multi-Tier",
            description:
              "Multi-tier Pallet Racking creates multiple storage levels with built-in walkways for manual picking. It maximizes space better than traditional mezzanine flooring and is ideal for cartons, boxes, or garments on hangers. Multi-tier structures can be built directly from the floor or on top of a mezzanine, enabling both storage and multi-functional areas below.",
          },
          {
            name: "Push-back  ",
            description:
              "Push-back Rollers are a LIFO pallet racking system based on CR18 racks with integrated wheel or roller conveyors. Pallets roll forward automatically at controlled speed when the front one is removed, allowing storage of up to 9 pallets deep. They are also useful for adding storage above cross-aisles or around dock-levellers.",
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
