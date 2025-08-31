import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useTheme } from "../../context/ThemeProvider";
import { POST } from "../../Utility/POST";

const Blog = ({ closeModal }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setActiveLader, blogs, setBlogs } = useTheme();

  const addBlog = async () => {
    setActiveLader(true);
    await POST("api/blog", {
      title: blogTitle,
      description: description,
    });
    const maxId = Math.max(...blogs.map((d) => d.id)) + 1;
    setBlogs([...blogs, { id: maxId, Title: blogTitle, Content: description }]);
    setActiveLader(false);
    setBlogTitle("");
    setDescription("");
    closeModal(false);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    console.log("Blog:", { title: blogTitle, description });
    addBlog();
  };
  return (
    <>
      <form onSubmit={handleBlogSubmit} className="space-y-5">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Tambah Blog
        </h2>
        <input
          type="text"
          placeholder="Judul"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[--color-secondary] dark:bg-slate-800 dark:text-white"
        />
        <div className="">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="bg-white dark: quill-custom text-black shadow-xl"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-primary-dark dark:bg-primary dark:text-primary-dark text-white font-semibold hover:opacity-90 transition"
        >
          Simpan Blog
        </button>
      </form>
    </>
  );
};

export default Blog;
