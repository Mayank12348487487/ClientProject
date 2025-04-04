import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/listings/${id}/edit`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setFaq(response.data.faqs.length ? response.data.faqs : [{ question: "", answer: "" }]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        navigate("/");
      });
  }, [id, navigate]);

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
    if (!faq[faq.length - 1].question.trim() || !faq[faq.length - 1].answer.trim()) {
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

  const updateArticle = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    const updatedArticle = {
      title,
      description,
      faqs: faq.filter(({ question, answer }) => question.trim() && answer.trim()),
    };

    try {
      const response = await axios.put(`http://localhost:8080/listings/${id}`, updatedArticle);
      
      if (response.status === 200) {
        alert("Article updated successfully!");
        navigate(`/articles/${id}`);
      } else {
        throw new Error("Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Error updating article!");
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-4">Edit Article</h1>

      <input
        type="text"
        placeholder="Enter title"
        className="w-full p-2 border rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-4 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Article Description</h2>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={description}
          onChange={setDescription}
          className="min-h-[200px] bg-white"
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
            />
            <textarea
              placeholder="Enter answer"
              className="w-full p-1 border rounded"
              value={item.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
            />
            {faq.length > 1 && (
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="mt-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
        >
          <FaPlus className="mr-1" /> Add FAQ
        </button>
      </div>

      <button
        type="button"
        onClick={updateArticle}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Update Article
      </button>
    </div>
  );
};

export default Edit;
