import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoaderOverlay from "../UI/LoaderOverlay";

export default function DetailBlog() {
  const { id } = useParams(); // ambil id dari URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
        setBlog(res.data[0]);
      } catch (err) {
        console.error("Gagal fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoaderOverlay />;
  if (!blog) return <p>Blog tidak ditemukan</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary-dark dark:text-primary mb-4">
        {blog.Title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {new Date(blog.created_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      {/* render HTML dari description */}
      <div
        className="prose Content dark:prose-invert max-w-none text-primary-dark dark:text-primary"
        dangerouslySetInnerHTML={{ __html: blog.Content }}
      />
    </div>
  );
}
