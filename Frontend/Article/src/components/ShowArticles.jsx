import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import parse from "html-react-parser";
import clientImage from "../components/images/client.jpg"

const randomAuthors = [
  {
    name: "Sachin Mathani",
    bio: "Chartered Accountant | Former Tax Analyst at EY | Finance & Tax Expert",
    logo: clientImage,
    email:import.meta.env.VITE_ADMIN_ID,
    
  }
];

const ShowArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [article, setArticle] = useState(null);
  const [author] = useState(randomAuthors[Math.floor(Math.random() * randomAuthors.length)]);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isAdmin = user?.primaryEmailAddress?.emailAddress === import.meta.env.VITE_ADMIN_ID;

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const faqRefs = useRef([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/listings/${id}`)
      .then((response) => setArticle(response.data))
      .catch((error) => {
        console.error("Error fetching article:", error);
        navigate("/");
      });
  }, [id, navigate]);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleEdit = () => navigate(`/edit-article/${id}`);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/listings/${id}`);
      alert("Article deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article. Please try again.");
    }
  };

  if (!article) return <p className="text-center text-xl">Loading...</p>;

  return (
    <motion.div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 p-6">
      
      {/* Sidebar (Table of Contents) */}
      <motion.div 
        className="hidden lg:block w-64 fixed left-6 top-24 bg-white shadow-lg rounded-lg p-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Contents</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="cursor-pointer hover:text-blue-500 transition" onClick={() => scrollToSection(titleRef)}>Title</li>
          <li className="cursor-pointer hover:text-blue-500 transition" onClick={() => scrollToSection(descriptionRef)}>Description</li>
          <li className="font-semibold text-gray-800">Frequently Asked Questions</li>
          {article.faqs.map((faq, index) => (
            <li key={index} className="cursor-pointer hover:text-blue-500 transition pl-3"
              onClick={() => scrollToSection(faqRefs.current[index])}>
              {faq.question}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div className="max-w-4xl w-full mx-auto lg:ml-72 flex flex-col items-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        
        {/* Article Title */}
        <motion.h1 ref={titleRef} className="text-4xl font-bold text-gray-800 text-center"
          initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
          {article.title}
        </motion.h1>

        {/* Article Description */}
        <motion.div ref={descriptionRef} className="mt-4 text-gray-600 text-lg text-left leading-relaxed prose"
         style={{ fontFamily: "'Poppins', sans-serif" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
          {parse(article.description)}
        </motion.div>

        <p className="text-sm text-gray-500 mt-2">Published on: {new Date(article.date).toDateString()}</p>

        {/* Admin Only Buttons */}
        {isAdmin && (
          <div className="flex flex-col gap-4 mt-4 w-full max-w-md">
            {!confirmDelete ? (
              <>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded w-full" onClick={handleEdit}>Edit</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded w-full" onClick={() => setConfirmDelete(true)}>Delete</button>
              </>
            ) : (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
                <p className="font-semibold">Are you sure you want to delete this article?</p>
                <div className="flex gap-4 mt-2">
                  <button className="px-4 py-2 bg-red-600 text-white rounded w-full" onClick={handleDelete}>Delete</button>
                  <button className="px-4 py-2 bg-gray-400 text-white rounded w-full" onClick={() => setConfirmDelete(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Author Section */}
        <motion.div className="mt-12 bg-white p-6 rounded-lg shadow-lg flex items-center gap-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <img src={author.logo} alt="Author Logo" className="w-16 h-16 rounded-full border border-gray-300 bg-cover" />
          <div>
            <h4 className="text-xl font-semibold text-gray-800">{author.name}</h4>
            <p className="text-gray-600">{author.bio}</p>
            <a href={`mailto:${author.email}`} className="mt-2 inline-block bg-blue-500 text-white px-3 py-2 rounded">Contact Me</a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl w-full text-white"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
          <p className="text-lg font-bold">Frequently Asked Questions</p>
          <ul className="mt-3">
            {article.faqs.map((faq, index) => (
              <motion.li key={index} ref={(el) => (faqRefs.current[index] = el)}
                className="mt-2 p-3 border-b border-gray-600 cursor-pointer"
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }} onClick={() => toggleFAQ(index)}>
                
                <div className="flex justify-between items-center">
                  <strong>{faq.question}</strong>
                  <span>{openFAQ === index ? "▲" : "▼"}</span>
                </div>
                {openFAQ === index && <p className="mt-2 text-gray-300">{parse(faq.answer)}</p>}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ShowArticles;
