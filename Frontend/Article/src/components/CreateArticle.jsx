import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import HashLoader from "./loader/HashLoader";

const CreateArticle = ({ setArticles }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
  ];

  const addFaq = () => {
    const lastFaq = faq[faq.length - 1];
    if (!lastFaq.question.trim() || !lastFaq.answer.trim()) {
      alert("Please fill in the previous FAQ before adding a new one.");
      return;
    }
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const updateFaq = (index, field, value) => {
    const updatedFaq = [...faq];
    updatedFaq[index][field] = value;
    setFaq(updatedFaq);
  };

  const removeFaq = (index) => setFaq(faq.filter((_, i) => i !== index));

  const publishArticle = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    const newArticle = {
      title,
      description,
      faqs: faq.filter(({ question, answer }) => question.trim() && answer.trim()),
    };

    try {
      setLoading(true);
      const response = await fetch("https://axethetax.onrender.com/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to publish article");

      setArticles((prev) => [...prev, result]);
      navigate("/articles");
    } catch (error) {
      alert(error.message || "Error publishing article!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md relative">
      <h1 className="text-3xl font-bold mb-4">Create Article</h1>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
          <HashLoader />
        </div>
      )}

      <input
        type="text"
        placeholder="Enter title"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <div className="mb-4 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Article Description</h2>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={description}
          onChange={setDescription}
          placeholder="Write the article description here..."
          className="min-h-[200px] bg-white"
          readOnly={loading}
        />
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
        {faq.map((item, index) => (
          <div key={index} className="mb-2 p-2 border rounded">
            <input
              type="text"
              placeholder="Enter question"
              className="w-full p-1 border rounded mb-1"
              value={item.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
              disabled={loading}
            />
            <textarea
              placeholder="Enter answer"
              className="w-full p-1 border rounded"
              value={item.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              disabled={loading}
            />
            {faq.length > 1 && (
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="mt-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                disabled={loading}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFaq}
          className="mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center"
          disabled={loading}
        >
          <FaPlus className="mr-1" /> Add FAQ
        </button>
      </div>

      <button
        type="button"
        onClick={publishArticle}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish Article"}
      </button>
    </div>
  );
};

export default CreateArticle;
