import { useState } from "react";
import { EditAPI } from "../../Utility/EditAPI";
import { DeleteAPI } from "../../Utility/DeleteAPI";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ConfirmationModal from "../../UI/ConfirmationModal";
import { useTheme } from "../../context/ThemeProvider";
import "dayjs/locale/id";
import "react-quill-new/dist/quill.snow.css";

export default function BlogList({ blogs, SettingBlogs }) {
  const { setActiveLader, Auth } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    Title: "",
    Content: "",
  });

  // Buka modal + isi data blog
  const handleEdit = (blog) => {
    setCurrentBlog({
      id: blog.id,
      Title: blog.Title,
      Content: blog.Content,
    });
    setIsOpen(true);
  };

  // Simpan hasil edit (sementara console.log)
  const handleSave = async (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const StartToEdit = async () => {
    setActiveLader(true);

    console.log("Update Blog:", currentBlog);
    await EditAPI(`blog/${currentBlog.id}`, currentBlog);

    const EditData = blogs.map((item) => (item.id === currentBlog.id ? currentBlog : item));
    SettingBlogs(EditData)

    //Close Modal Form
    setIsOpen(false);

    //close Loading
    setActiveLader(false);

    //close Modal
    setOpenModal(false);
  };

  const FormatDateTime = (time) => {
    dayjs.extend(relativeTime);
    dayjs.locale("id");

    return dayjs(time).fromNow();
  };

  const [openModal, setOpenModal] = useState(false);
  const [idBlog, setIdBlog] = useState(null);
  const handleDelete = async (id) => {
    setActiveLader(true);
    const Delete = await DeleteAPI(`blog/${id}`);
    console.log(Delete);
    if (Delete) {
      console.log("Data terhapus ✅");
      const BlogTerbaru = blogs.filter((item) => item.id != id);
      console.log(BlogTerbaru);
      SettingBlogs(BlogTerbaru);
    }

    //close Modal
    setOpenModal(false);

    //close Loading
    setActiveLader(false);
  };

  return (
    <>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          >
            {/* Tombol Edit & Delete */}
            {Auth && (
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                  <Pencil
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                    setIdBlog(() => blog.id);
                    console.log(blog.id);
                  }}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                  <Trash size={20} className="text-red-500" />
                </button>
              </div>
            )}

            {/* Konten Blog */}
            <h2 className="text-2xl font-semibold text-primary-dark dark:text-primary pr-8">
              {blog.Title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {FormatDateTime(blog.created_at)}
            </p>
            <p className="mt-3 text-gray-700 dark:text-gray-200 line-clamp-3">
              {blog.Content.replace(/<[^>]+>/g, "").slice(0, 200)}...
            </p>
            <Link
              to={`/Blog/${blog.id}`}
              className="mt-3 text-gray-700 dark:text-gray-200 line-clamp-3 underline "
            >
              Lihat Selengkap nya..
            </Link>
          </div>
        ))}

        {/* MODAL EDIT */}
        {Auth && isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold text-primary-dark dark:text-primary mb-4">
                Edit Blog
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Blog Title */}
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={currentBlog?.Title || ""}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, Title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
                />

                {/* Description */}
                <ReactQuill
                  theme="snow"
                  value={currentBlog?.Content || ""}
                  onChange={(value) =>
                    setCurrentBlog({ ...currentBlog, Content: value })
                  }
                  className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:opacity-90"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[--color-secondary] text-white dark:text-primary-dark bg-gray-900 dark:bg-slate-300 hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={openModal}
        onClose={() => {
          console.log(idBlog);
          idBlog && setIdBlog(null);
          setOpenModal(false);
        }}
        onConfirm={() => {
          console.log(idBlog);
          idBlog ? handleDelete(idBlog) : StartToEdit();
        }}
        message={
          idBlog
            ? "Apakah kamu yakin ingin menghapus data ini?"
            : "Apakah kamu yakin ingin Update ?"
        }
      />
    </>
  );
}
