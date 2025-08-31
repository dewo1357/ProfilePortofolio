import { useEffect } from "react";
import axios from "axios";
import LoaderOverlay from "../../UI/LoaderOverlay";
import BlogList from "./BlogList";
import { useTheme } from "../../context/ThemeProvider";
import AddDataModal from "./AddDataModal";

export default function Blog() {
  const { activeLoader, setActiveLader, Auth, blogs, setBlogs } = useTheme();

  useEffect(() => {
    setActiveLader(true);
    axios
      .get("https://cruel-davita-sadeshop-79e55b22.koyeb.app/api/blogs") // endpoint backend
      .then((res) => {
        setActiveLader(false);
        setBlogs(res.data);
      })
      .catch((err) => console.error("❌ Error fetch blogs:", err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-primary-dark dark:text-primary">
          My Blog
        </h1>

        {/* Tombol Tambah Data (modular) */}
        {Auth && localStorage.Token && <AddDataModal />}
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Belum ada artikel.
        </p>
      ) : (
        <BlogList blogs={blogs} SettingBlogs={(blogs) => setBlogs(blogs)} />
      )}

      {/* Loader */}
      <LoaderOverlay active={activeLoader} />
    </div>
  );
}
