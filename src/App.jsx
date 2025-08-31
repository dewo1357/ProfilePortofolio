import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPages from "./pages/MainPages";
import Home from "./pages/Home";
import About from "./pages/About";
// import Experience from "./pages/Experience";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact";
import AddData from "./pages/AddData";
import Blog from "./pages/BlogPages/Blog";
import NotFound from "./pages/NotFound";
import DetailBlog from "./pages/DetailBlogs";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingPage";
import { useTheme } from "./context/ThemeProvider";

function App() {
  const { Auth } = useTheme();
  return (
    <BrowserRouter>
      <MainPages>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* <Route
            path="/addData"
            element={Auth && localStorage.Token ? <AddData /> : <NotFound />}
          /> */}
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Blog/:id" element={<DetailBlog />} />
          <Route path="*" element={<NotFound />} />
          
          <Route path="/EditProfile" element={<SettingsPage />} />
          
        </Routes>
      </MainPages>
    </BrowserRouter>
  );
}

export default App;
