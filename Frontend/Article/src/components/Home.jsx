import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaBalanceScale, 
  FaUsers, 
  FaEnvelope, 
  FaFileInvoiceDollar, 
  FaBookOpen, 
  FaCheckCircle 
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      {/* Header */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Our Income Article News Site
      </motion.h1>

      <motion.p 
        className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 text-center max-w-2xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Stay updated with the latest news, trends, and insights on personal finance, investments, and income growth strategies.
      </motion.p>

      {/* Explore Button */}
      <Link to="/articles">
        <motion.button 
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:animate-bounce"
          whileTap={{ scale: 0.9 }}
        >
          Explore Services
        </motion.button>
      </Link>

      {/* Interactive Feature Cards */}
      <motion.div 
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <FeatureCard 
          title="Our Services" 
          description="Explore what we offer to elevate your business." 
          icon={<FaBalanceScale size={30} className="text-blue-600" />} 
          onClick={() => document.getElementById("services-section").scrollIntoView({ behavior: "smooth" })}
        />
        <FeatureCard 
          title="About Us" 
          description="Learn more about our mission and values." 
          icon={<FaUsers size={30} className="text-purple-600" />} 
          onClick={() => document.getElementById("about-section").scrollIntoView({ behavior: "smooth" })}
        />
        <FeatureCard 
          title="Contact Me" 
          description="Reach out for custom solutions or queries." 
          icon={<FaEnvelope size={30} className="text-pink-600" />} 
          onClick={() => window.location.href = "mailto:sachinmathani@gmail.com?subject=Service%20Inquiry"}
        />
      </motion.div>

      {/* About Section */}
      <motion.div
        id="about-section"
        className="mt-20 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex justify-center items-center w-full md:w-1/2 h-full p-10">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-full shadow-lg">
            <FaUsers size={50} />
          </div>
        </div>

        <div className="p-6 md:p-12 text-left w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            As a Web Development Services, we are committed to building custom web solutions that drive business success.
          </p>
          <p className="text-gray-700 mb-4">
            At our web development agency, we specialize in crafting bespoke online solutions tailored to elevate businesses toward their digital objectives. We stay ahead of the curve with evolving technologies and trends, ensuring excellence.
          </p>
          <p className="text-gray-700 mb-4">
            Our ethos is rooted in equipping clients with the essential tools for digital triumph. Every business deserves a strong online presence that reflects its brand and reaches the right audience.
          </p>
          <button className="mt-2 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Get in Touch</button>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div 
        id="services-section"
        className="mt-16 text-center max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-6 rounded-t-lg">
          <h2 className="text-white text-3xl font-bold">OUR SERVICES</h2>
        </div>

        <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <ServiceCard 
            title="Direct Taxation" 
            icon={<FaBalanceScale size={30} className="text-blue-600" />} 
            details={[
              "Filing of Income Tax Returns (ITRs) for residents, NRIs, and foreign nationals",
              "Tax planning and advisory to reduce liabilities and ensure efficient structuring",
              "Representation and support during assessments, scrutiny, and appeals",
              "Advisory on DTAA and foreign income reporting",
              "Consulting for expatriates and NRI taxation"
            ]} 
          />

          <ServiceCard 
            title="Indirect Taxation (GST)" 
            icon={<FaFileInvoiceDollar size={30} className="text-blue-600" />} 
            details={[
              "GST registration and amendment support",
              "Timely filing of monthly, quarterly, and annual GST returns",
              "Input tax credit (ITC) optimization and reconciliation",
              "Representation in GST audits, notices, and litigation",
              "E-invoicing and cross-border GST advisory"
            ]} 
          />

          <ServiceCard 
            title="Accounting & Financial Reporting" 
            icon={<FaBookOpen size={30} className="text-blue-600" />} 
            details={[
              "Bookkeeping using cloud and traditional systems",
              "Preparation of P&L, balance sheet, and cash flow statements",
              "MIS reports, variance and ratio analysis",
              "Budgeting, forecasting, and financial modelling",
              "Virtual CFO services"
            ]} 
          />

          <ServiceCard 
            title="Assurance & Audit Services" 
            icon={<FaCheckCircle size={30} className="text-blue-600" />} 
            details={[
              "Statutory audits under relevant laws",
              "Internal audits for process improvement",
              "GST and tax audits",
              "Certification services for compliance",
              "Management and operational audits"
            ]} 
          />
        </div>
      </motion.div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon, onClick }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col items-start gap-4 w-full sm:w-80 h-auto hover:shadow-lg transition cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-center w-14 h-14">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <span className="text-blue-600 font-medium mt-auto">Click here →</span>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ title, icon, details }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => setFlipped(!flipped);

  return (
    <motion.div 
      className="relative cursor-pointer [perspective:1000px] h-96"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "rotate-y-180" : ""}`}> 
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-white p-6 rounded-xl shadow-md">
          <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center w-14 h-14">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm mt-2 space-y-1">
            {details.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        {/* Back */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-blue-50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
          <a
            href="mailto:sachinmathani@gmail.com?subject=Service%20Inquiry"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            Send Email
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
