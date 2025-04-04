import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"; // ✅ Import useState
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";
import CreateArticle from "./components/CreateArticle";
import ShowArticles from "./components/ShowArticles";
import Edit from "./components/Edit";

function App() {
  // ✅ Define articles state
  const [articles, setArticles] = useState([]);

  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all pages */}
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles articles={articles} />} />
        <Route path="/articles/:id" element={<ShowArticles />} />
        <Route path="/create-listing" element={<CreateArticle setArticles={setArticles} />} />
        <Route path="/edit-article/:id" element={<Edit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
