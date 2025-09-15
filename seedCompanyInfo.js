// seedCompanyInfo.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyInfo from "./models/companyInfo.js";

dotenv.config();

const seedCompanyInfo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await CompanyInfo.deleteMany();

    // Insert new records
    await CompanyInfo.insertMany([
      {
        key: "about",
        content: [
          "Prime Sales Incorporated (PSI), founded in 1976, is a leading supplier of intralogistics solutions in the Philippines. Over the years, we have built a strong reputation for providing reliable products and services that cater to both dry and cold chain applications. Our dedication to quality and customer satisfaction has allowed us to become a trusted partner of many businesses nationwide.",
          "Since 1976, Prime Sales Inc. has been a trusted provider of intralogistics solutions nationwide. We specialize in offering complete systems and equipment designed to improve efficiency in storage, handling, and logistics operations. By working closely with our clients, we ensure that every solution is tailored to their unique needs while maintaining long-term support through after-sales service.",
          "PSI, established in 1976, leads the Philippine market in dry and cold chain intralogistics systems. From warehouse storage and racking to docks, doors, forklifts, and batteries, we provide a comprehensive range of solutions. Our mission is not just to deliver equipment but to ensure that our customers gain lasting value through ongoing service, preventive maintenance, and technical guidance.",
        ],
      },
      {
        key: "choose",
        content: [
          "Prime Sales Incorporated (PSI) is a trusted pioneer in the Philippine intralogistics industry. For nearly five decades, we have continuously provided innovative solutions for both dry and cold chain applications. From advanced warehouse systems to dependable material-handling equipment, PSI remains committed to helping businesses achieve operational excellence with strong after-sales support and long-term service partnerships.",
          "Since its establishment in 1976, Prime Sales Inc. has remained at the forefront of intralogistics solutions in the Philippines. We specialize in delivering integrated systems—from storage and racking solutions to cold chain facilities—that enhance productivity and ensure reliability. Beyond supplying equipment, we pride ourselves on our responsive after-sales services, including preventive maintenance, spare parts availability, and technical assistance, ensuring our clients’ long-term success.",
          "With over 45 years of expertise, Prime Sales Incorporated (PSI) continues to lead the market in providing complete intralogistics solutions. We offer a wide array of products including warehouse racking, docking systems, cold storage facilities, forklifts, and batteries. What sets us apart is our commitment to ongoing customer support—we back every project with dependable after-sales service, preventive maintenance, and technical guidance that guarantee lasting value for our partners.",
        ],
      },
      {
        key: "hours",
        content: [
          "Prime Sales, Inc. operates during regular business hours, which are from 8:00 AM until 5:00 PM, ensuring that our team is available to assist clients and partners throughout the day.",
          "The official office hours of Prime Sales, Inc. are from 8:00 AM to 5:00 PM, allowing us to deliver efficient service, respond to inquiries, and maintain smooth business operations",
          "Prime Sales, Inc. is open from 8:00 AM to 5:00 PM, during which our dedicated team is ready to provide assistance, handle transactions, and support the needs of our clients and partners.",
        ],
      },
      {
        key: "location",
        content: [
          "Prime Corporate Center, km. 15 East Service Rd., corner Marian Rd. 2, Brgy. San Martin De Porres, Parañaque City, Philippines",
          "Prime Sales is located at Prime Corporate Center, km. 15 East Service Rd., corner Marian Rd 2 Brgy. San Martin De Porres, Parañaque City, Philippines",
          "Visit us at Km. 15 East Service Road, corner Marian Road 2, Brgy. San Martin De Porres, Parañaque City, Philippines – Prime Corporate Center.",
          "Prime Sales operates at Km. 15 East Service Road, Marian Road 2 corner, Brgy. San Martin De Porres, Parañaque City, Philippines.",
        ],
      },
      {
        key: "president",
        content: [
          "Efren S. Pascual Jr. is the current President of Prime Sales Inc. He is responsible for leading the company’s overall direction and operations.",
          "Efren S. Pascual Jr. currently serves as the President of Prime Sales Inc. In this capacity, he is responsible for steering the company’s vision, formulating strategic initiatives, and overseeing the management of day-to-day operations. His leadership plays a pivotal role in shaping the organization’s long-term success and competitiveness in the industry.",
          "The President of Prime Sales Inc. is Efren S. Pascual Jr. He is entrusted with providing overall leadership to the company, setting its strategic direction, and ensuring the effective execution of its operations. Under his guidance, the organization continues to pursue sustainable growth and uphold its commitment to excellence.",
        ],
      },
      {
        key: "afterSales",
        content: [
          "We provide long-term after-sales support including maintenance, spare parts, and troubleshooting.",
          "Our dedicated after-sales team ensures spare parts availability, maintenance, and fast troubleshooting.",
          "PSI offers reliable after-sales services — from equipment servicing to technical assistance.",
        ],
      },
    ]);

    console.log("✅ Company info seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding company info:", err);
    mongoose.connection.close();
  }
};

seedCompanyInfo();
