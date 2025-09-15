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
            descriptions: [
              "Energy-saving panels for cold rooms and warehouses.",
              "Durable insulated panels designed for temperature control.",
              "Panels that ensure efficiency and reliability in cold storage.",
              "High-performance panels that provide excellent thermal insulation.",
              "Lightweight yet strong panels built for long-term durability.",
              "Versatile panels ideal for warehouses, cold rooms, and clean environments.",
              "Cost-efficient insulated panels engineered for consistent temperature retention.",
            ],
          },
          {
            name: "Insulated Doors",
            descriptions: [
              "Tightly sealed doors that maintain cold temperatures.",
              "High-performance insulated doors for secure cold rooms.",
              "Doors built to prevent temperature loss in storage areas.",
              "Durable doors engineered to provide reliable thermal insulation.",
              "Energy-efficient doors designed to minimize cooling costs.",
              "Specialized insulated doors that ensure product freshness and safety.",
              "Heavy-duty cold room doors that combine strength with insulation.",
            ],
          },
          {
            name: "Panel and Door Accessories",
            descriptions: [
              "Fittings and add-ons to complete cold storage systems.",
              "Reliable accessories that enhance the durability and efficiency of panels and doors.",
              "Essential parts designed to ensure smooth installation and long-lasting performance.",
              "Customizable components that improve sealing, insulation, and functionality.",
              "High-quality accessories engineered for cold room and warehouse applications.",
              "Complementary fittings that make panels and doors more secure and efficient.",
            ],
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
            descriptions: [
              "Bridges the gap between trucks and docks for safe loading.",
              "Strong and durable dock levellers designed for heavy-duty use.",
              "Ensures smooth and efficient cargo transfer between dock and vehicle.",
              "Reliable levelling systems that improve workflow efficiency.",
              "Engineered for safety and long service life in busy facilities.",
            ],
          },
          {
            name: "Loading Houses",
            descriptions: [
              "Enclosed dock systems that protect goods and staff.",
              "All-in-one loading house solutions for weather protection.",
              "Improves safety and hygiene in loading and unloading areas.",
              "Durable structures designed to withstand heavy industrial use.",
              "Efficient solutions that maintain product quality during transfer.",
            ],
          },
          {
            name: "Dock Seals or Shelters",
            descriptions: [
              "Seal the space around trucks to keep dust, pests, and weather out.",
              "Durable dock shelters that improve insulation and reduce energy loss.",
              "Flexible sealing systems that adapt to different truck sizes.",
              "Energy-saving seals that reduce cooling and heating costs.",
              "Protects products, staff, and equipment during loading operations.",
            ],
          },
          {
            name: "Control Systems",
            descriptions: [
              "Smart controls for safe and efficient dock operations.",
              "Integrated dock automation systems for reliability.",
              "User-friendly controls for loading dock equipment.",
              "Advanced safety features to minimize accidents.",
              "Systems built to streamline loading processes.",
            ],
          },
          {
            name: "Dock & Safety Accessories",
            descriptions: [
              "Extra tools to improve safety at the loading dock.",
              "Durable safety accessories designed to prevent accidents.",
              "Reliable add-ons that enhance dock performance.",
              "Essential accessories to improve efficiency in loading areas.",
              "Quality components built to last in demanding conditions.",
            ],
          },
        ],
      },
      {
        name: "Industrial Doors",
        products: [
          {
            name: "Industrial Sectional Doors",
            descriptions: [
              "Insulated doors for warehouses and factories.",
              "Durable sectional doors designed for long-lasting use.",
              "Energy-efficient doors that help maintain temperature control.",
              "Reliable doors built to handle frequent operations.",
              "Customizable designs to fit diverse industrial applications.",
            ],
          },
          {
            name: "High-Speed Sectional Doors",
            descriptions: [
              "Fast-opening doors to save energy and time.",
              "High-speed doors designed for intensive industrial use.",
              "Quick-action doors that improve workflow efficiency.",
              "Durable mechanisms for reliable high-cycle performance.",
              "Engineered to reduce downtime and improve productivity.",
            ],
          },
          {
            name: "Industrial Rolling Shutters",
            descriptions: [
              "Strong shutters for security and easy access.",
              "Durable rolling shutters designed for industrial use.",
              "Space-saving shutter doors for warehouses and factories.",
              "Reliable shutters built for long service life.",
              "Customizable options for security and efficiency.",
            ],
          },
          {
            name: "Industrial Rolling Grilles",
            descriptions: [
              "Ventilated grilles for protection with airflow.",
              "Durable grilles for secure yet open visibility.",
              "Strong rolling grilles designed for industrial facilities.",
              "Easy-to-operate designs for everyday use.",
              "Customizable finishes for both function and design.",
            ],
          },
          {
            name: "Strip Curtains",
            descriptions: [
              "Flexible plastic strips that keep temperature and dust under control.",
              "Durable strip curtains designed for long-term use.",
              "Energy-saving curtains for cold rooms and warehouses.",
              "Easy-to-install curtains that separate different zones.",
              "Transparent strips that maintain visibility and safety.",
            ],
          },
          {
            name: "ISO Doors",
            descriptions: [
              "Specialized doors for cleanrooms and controlled environments.",
              "Durable ISO-certified doors designed for hygiene-critical areas.",
              "Reliable doors that maintain air quality and cleanliness.",
              "High-quality finishes suitable for sterile environments.",
              "Energy-efficient and compliant with strict standards.",
            ],
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
            descriptions: [
              "Versatile pallet racking with unrestricted access to goods.",
              "Compatible with a wide range of pallet types and sizes.",
              "Customizable beams and shelves for flexible storage.",
              "Strong and durable structure for heavy-duty loads.",
              "Efficient system ideal for warehouses of all sizes.",
            ],
          },
          {
            name: "Narrow Aisle",
            descriptions: [
              "Space-saving racking that maximizes storage capacity.",
              "Ensures fast pallet access in limited floor space.",
              "Ideal for specialized forklifts in tight aisles.",
              "Flexible beam adjustment for different pallet sizes.",
              "Efficient system for high-density warehouses.",
            ],
          },
          {
            name: "Mobile Pallet Racking",
            descriptions: [
              "High-density storage system that doubles warehouse capacity.",
              "Electronically controlled bases for flexible operation.",
              "Safe and efficient pallet handling with sensors.",
              "Durable design supporting loads up to 24 tons.",
              "Maximizes floor space while ensuring accessibility.",
            ],
          },
          {
            name: "Pallet Shuttle System",
            descriptions: [
              "Semi-automated system that speeds up pallet handling.",
              "Removes the need for forklifts to enter racks.",
              "Supports both FIFO and LIFO operations.",
              "Ideal for storing fewer product lines in bulk.",
              "Efficient solution for high-volume storage facilities.",
            ],
          },
          {
            name: "Drive-in Racking",
            descriptions: [
              "High-density storage system that saves up to 90% of space.",
              "Ideal for storing fragile or unstable goods.",
              "Operates on Last-in, First-out (LIFO) principle.",
              "Durable rails for safe pallet stacking.",
              "Efficient solution for large volume storage needs.",
            ],
          },
          {
            name: "Pallet Flow",
            descriptions: [
              "FIFO storage system with integrated roller conveyors.",
              "Reduces space requirements by up to 60%.",
              "Automatic braking ensures safe pallet flow.",
              "Efficient storage for beverages and high-volume goods.",
              "Reliable system for manufacturing and distribution centers.",
            ],
          },
          {
            name: "Multi-Tier",
            descriptions: [
              "Creates multiple storage levels with built-in walkways.",
              "Maximizes vertical space better than mezzanine floors.",
              "Ideal for cartons, boxes, or garments on hangers.",
              "Durable structure for manual picking operations.",
              "Flexible design to create both storage and work areas.",
            ],
          },
          {
            name: "Push-back",
            descriptions: [
              "LIFO pallet racking with integrated wheel conveyors.",
              "Pallets roll forward automatically for easy access.",
              "Stores up to 9 pallets deep for space efficiency.",
              "Durable rollers ensure smooth pallet movement.",
              "Ideal for use above cross-aisles or dock areas.",
            ],
          },
        ],
      },
      {
        name: "Plastic Pallets",
        products: [
          {
            name: "Eco Pallets",
            descriptions: [
              "Cost-effective pallets for general use.",
              "Lightweight yet strong design for everyday handling.",
              "Durable and reusable pallets for multiple trips.",
              "Easy-to-clean surfaces for convenience.",
              "Efficient solution for cost-sensitive operations.",
            ],
          },
          {
            name: "Warehouse Pallets",
            descriptions: [
              "Durable pallets for everyday warehouse operations.",
              "Strong design built for long-term reliability.",
              "Easy to handle with forklifts and pallet jacks.",
              "Resistant to wear and tear in busy facilities.",
              "Ideal for logistics and distribution centers.",
            ],
          },
          {
            name: "Hygiene Pallets",
            descriptions: [
              "Easy-to-clean pallets for food and pharmaceutical use.",
              "Non-porous surfaces to prevent contamination.",
              "Durable design suitable for hygienic industries.",
              "Compliant with strict food safety standards.",
              "Long-lasting solution for sterile environments.",
            ],
          },
          {
            name: "Automatic Storage Pallets",
            descriptions: [
              "Designed for automated storage and retrieval systems.",
              "Strong and precise design for ASRS compatibility.",
              "Lightweight structure for smooth system handling.",
              "Reliable pallets built for automation efficiency.",
              "Durable and consistent in repetitive operations.",
            ],
          },
          {
            name: "Metal Reinforced Pallets",
            descriptions: [
              "Heavy-duty pallets with added strength from metal reinforcement.",
              "Durable solution for demanding industrial loads.",
              "Long-lasting pallets designed for extra safety.",
              "Reliable design for transporting heavy goods.",
              "Ideal for warehouses requiring maximum durability.",
            ],
          },
          {
            name: "Spill Containment Pallets",
            descriptions: [
              "Pallets designed to catch leaks and spills.",
              "Durable containment system for liquid goods.",
              "Ensures safety and compliance in storage areas.",
              "Easy to clean and maintain for long-term use.",
              "Protects facilities from chemical spills and hazards.",
            ],
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
            descriptions: [
              "Fuel-powered forklifts for heavy loads.",
              "Reliable counterbalance trucks for demanding tasks.",
              "Durable design for long-term industrial use.",
              "Efficient trucks that deliver consistent performance.",
              "Strong lifting capacity for diverse applications.",
            ],
          },
          {
            name: "Electric Counterbalance Trucks",
            descriptions: [
              "Eco-friendly forklifts powered by electricity.",
              "Efficient trucks that reduce carbon footprint.",
              "Durable and reliable design for warehouses.",
              "Smooth and quiet operation for indoor use.",
              "Cost-saving alternative to fuel-powered trucks.",
            ],
          },
          {
            name: "Pallet Trucks",
            descriptions: [
              "Simple hand or powered trucks for moving pallets.",
              "Lightweight and easy to maneuver in warehouses.",
              "Durable design for everyday logistics operations.",
              "Reliable solution for short-distance pallet transport.",
              "Compact design for narrow aisles and spaces.",
            ],
          },
          {
            name: "Reach Trucks",
            descriptions: [
              "Forklifts designed for tall and narrow aisles.",
              "Durable design for efficient high-rack storage.",
              "Smooth operation in limited floor space.",
              "Reliable system for fast and safe pallet retrieval.",
              "Flexible handling in high-density warehouses.",
            ],
          },
          {
            name: "Order Pickers",
            descriptions: [
              "Lifts that help staff pick items from high racks.",
              "Efficient machines for warehouse order fulfillment.",
              "Durable design for frequent picking operations.",
              "Safe and stable platforms for staff use.",
              "Flexible design to suit various warehouse needs.",
            ],
          },
          {
            name: "VNA Trucks",
            descriptions: [
              "Very narrow aisle trucks for high-density warehouses.",
              "Efficient machines designed for tight spaces.",
              "Durable forklifts for vertical storage operations.",
              "Reliable performance in restricted aisle layouts.",
              "Improves warehouse capacity and picking efficiency.",
            ],
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
            descriptions: [
              "Reliable batteries for forklifts and handling equipment.",
              "Durable batteries designed for heavy industrial use.",
              "Efficient energy supply for long working hours.",
              "Safe and reliable performance in demanding conditions.",
              "Long-lasting batteries for cost-effective operations.",
            ],
          },
          {
            name: "Pro Series Traction Battery Chargers",
            descriptions: [
              "Efficient chargers for everyday industrial use.",
              "Durable chargers built for consistent performance.",
              "Easy-to-use design with reliable charging capacity.",
              "Energy-efficient solution for cost savings.",
              "Safe and long-lasting charging equipment.",
            ],
          },
          {
            name: "Advance Series Traction Battery Chargers",
            descriptions: [
              "Advanced chargers with faster charging cycles.",
              "Durable equipment designed for long-term reliability.",
              "Energy-efficient design that extends battery life.",
              "Reliable charging system for industrial batteries.",
              "Smart features for safe and optimized charging.",
            ],
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
