
import { motion } from "framer-motion";
import { useEffect } from "react";
  import { FaNewspaper, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
  import { Link, useNavigate } from "react-router-dom";

  const Home = () => {
   
    
   
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
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
        
        <Link to="/articles">
          <motion.button 
            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            
          >
            Explore Articles
          </motion.button>
        </Link>

        <Link to="/articles">
        <motion.div 
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <FeatureCard title="Latest News" description="Get the most recent updates on finance and economy." icon={<FaNewspaper size={30} className="text-blue-600" />} />
          <FeatureCard title="Investment Tips" description="Expert insights on growing your wealth wisely." icon={<FaChartLine size={30} className="text-green-600" />} />
          <FeatureCard title="Income Strategies" description="Learn new ways to maximize your earnings." icon={<FaMoneyBillWave size={30} className="text-yellow-600" />} />
        </motion.div>
        </Link>
      </div>
    );
  };

  const FeatureCard = ({ title, description, icon }) => {
    return (
      <motion.div 
        className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col items-start gap-4 w-full sm:w-80 h-auto hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
      >
        <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-center w-14 h-14">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <a href="#" className="text-blue-600 font-medium mt-auto">Know more →</a>
      </motion.div>
    );
  };

  export default Home;
