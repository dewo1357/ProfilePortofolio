import { useState } from "react";
import { EditAPI } from "../../Utility/EditAPI";
import { Trash, Pencil } from "lucide-react";
import { DeleteAPI } from "../../Utility/DeleteAPI";
import ConfirmationModal from "../../UI/ConfirmationModal";
import { useTheme } from "../../context/ThemeProvider";
import Switch from "../../UI/Switch";

export default function ProjectList({ projects = [], setProject }) {
  const [newStack, setNewStack] = useState([]);
  const { setActiveLader, Auth } = useTheme();
  const [idProject, SetidProject] = useState(null);
  const [modalConfirmOpen, SetmodalConfirmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: null,
    name: "",
    description: "",
    stack: [],
    link: "",
    active: false,
  });

  // buka modal + isi data
  const handleEdit = (p) => {
    console.log(p);
    setCurrentProject({
      id: p.id,
      name: p.name,
      description: p.description,
      stack: p.stack,
      link: p.link,
      active: p.active,
    });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    setActiveLader(true);
    const Delete = await DeleteAPI(`project/${idProject}`);
    if (Delete) {
      console.log("Data terhapus ✅");
      const ProjectTerbaru = projects.filter((item) => item.id != idProject);
      setProject(ProjectTerbaru);
    }
    SetmodalConfirmOpen(false);
    setActiveLader(false);
  };

  // simpan hasil edit (sementara console.log)
  const handleSave = async (e) => {
    e.preventDefault();
    SetmodalConfirmOpen(true);
  };

  const StartToEdit = async () => {
    setActiveLader(true);
    console.log("Update Project:", currentProject);
    await EditAPI(`project/${currentProject.id}`, currentProject);

    const Data = projects.map((item) =>
      item.id == currentProject.id ? currentProject : item
    );

    //Update Project Array State
    setProject(Data);

    //close Modal Form
    setIsOpen(false);

    //closeModal Confirmation
    SetmodalConfirmOpen(false);

    //Close Loading
    setActiveLader(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <div
          key={i}
          className="relative p-6  rounded-xl shadow-md bg-white dark:bg-slate-800 hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
        >
          {/* Tombol Edit & Delete */}
          {Auth && (
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={() => handleEdit(p)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                <Pencil
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>
              <button
                onClick={() => {
                  SetmodalConfirmOpen(true);
                  SetidProject(p.id);
                }}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
              >
                <Trash size={20} className="text-red-500" />
              </button>
            </div>
          )}

          {/* Konten Project */}
          <h3 className="font-bold text-lg text-primary-dark dark:text-primary">
            {p.name}
          </h3>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            {p.description}
          </p>
          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
            {p.stack.join(", ")}
          </p>
          <Link
            to={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-primary text-[--color-secondary] underline mt-3 block"
          >
            View Project →
          </Link>
        </div>
      ))}

      {/* MODAL EDIT PROJECT */}
      {Auth && isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold text-primary-dark dark:text-primary mb-4">
              Edit Project
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Nama Project */}
              <input
                type="text"
                placeholder="Project Name"
                value={currentProject?.name || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, name: e.target.value })
                }
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
              />

              {/* Stack Section */}
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
                  Tech Stack
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tambahkan stack..."
                    value={newStack || ""}
                    onChange={(e) => setNewStack(e.target.value)}
                    className="flex-1 p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newStack?.trim()) {
                        setCurrentProject({
                          ...currentProject,
                          stack: [
                            ...(currentProject?.stack || []),
                            newStack.trim(),
                          ],
                        });
                        setNewStack("");
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 hover:opacity-90"
                  >
                    Tambah
                  </button>
                </div>

                {/* List Stack */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentProject?.stack?.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-sm flex items-center gap-2"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentProject({
                            ...currentProject,
                            stack: currentProject.stack.filter(
                              (_, idx) => idx !== i
                            ),
                          })
                        }
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Link */}
              <input
                type="text"
                placeholder="Project Link"
                value={currentProject?.link || ""}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, link: e.target.value })
                }
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
              />

              {/* Deskripsi */}
              <textarea
                value={currentProject?.description || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
              />
              <label className="block  text-gray-700 dark:text-gray-300 font-semibold">
                Tampilkan Di Halaman Utama
              </label>
              <Switch
                checked={currentProject.active}
                onChange={(value) =>
                  setCurrentProject({ ...currentProject, active: value })
                }
              />

              {/* Tombol */}
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
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={modalConfirmOpen}
        onClose={() => {
          SetmodalConfirmOpen(false);
          SetidProject(null);
        }}
        onConfirm={() => {
          idProject ? handleDelete() : StartToEdit();
        }}
        message={
          idProject
            ? "Apakah Anda Yakin Ingin Menghapus Data ?"
            : "Apakah Anda Yakin Untuk Update Data ?"
        }
      />
    </div>
  );
}
