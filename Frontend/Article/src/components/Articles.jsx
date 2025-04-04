import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser"; // ✅ Importing parser
import HashLoader from "./loader/HashLoader";

const Articles = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  
    if (isLoaded && userId) {
      axios.get("http://localhost:8080/listings") // Ensure your backend is running
        .then((response) => {
          setArticles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return <HashLoader/>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <motion.h1 
        className="text-3xl md:text-5xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Latest Articles
      </motion.h1>
      
      <motion.div 
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {articles.map((article) => (
          <Link to={`/articles/${article._id}`} key={article._id}>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 h-60 flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {parse(
                  article.description.length > 100 
                    ? article.description.substring(0, 100) + "..." 
                    : article.description
                )} {/* ✅ Parsing the description properly */}
              </p>
              <p className="text-sm text-gray-500 mt-2">Published on: {new Date(article.date).toDateString()}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Articles;
