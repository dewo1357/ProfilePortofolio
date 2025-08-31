import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { POST } from "../../Utility/POST";
import Switch from "../Switch";

const Project = ({ closeModal }) => {
  const [project, SetProject] = useState({
    name: "",
    stack: [],
    link: "",
    description: "",
    active: false,
  });
  const { setActiveLader, projects, setProject } = useTheme();
  const [newStack, setNewStack] = useState("");

  const addProject = async () => {
    setActiveLader(true);
    const Insert = await POST("api/project", {
      name: project.name,
      stack: project.stack,
      link: project.link,
      description: project.description,
      active: project.active,
    });

    const maxId = Math.max(...projects.map((d) => d.id)) + 1;
    const DataBaru = { ...project, id: maxId };
    setProject([DataBaru, ...projects]);

    setActiveLader(false);
    SetProject({
      name: "",
      stack: [],
      link: "",
      description: "",
      active: false,
    });
    closeModal(false);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log("Project:", project);
    addProject();
  };

  return (
    <>
      <form onSubmit={handleProjectSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Tambah Project
        </h2>
        {/* Nama Project */}
        <input
          type="text"
          placeholder="Project Name"
          value={project.name}
          onChange={(e) => SetProject({ ...project, name: e.target.value })}
          className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
          required
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
              value={newStack}
              onChange={(e) => setNewStack(e.target.value)}
              className="flex-1 p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
            />
            <button
              type="button"
              onClick={() => {
                if (newStack?.trim()) {
                  SetProject({
                    ...project,
                    stack: [...project.stack, newStack.trim()],
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
            {project.stack.length > 0 &&
              project.stack.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-sm flex items-center gap-2"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() =>
                      SetProject({
                        ...project,
                        stack: project.stack.filter((_, idx) => idx !== i),
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
          value={project.link}
          placeholder="Project Link"
          onChange={(e) => SetProject({ ...project, link: e.target.value })}
          className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
          required
        />

        {/* Deskripsi */}
        <textarea
          value={project.description}
          onChange={(e) =>
            SetProject({
              ...project,
              description: e.target.value,
            })
          }
          className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
        />
        <label className="block mb-[-10px] text-gray-700 dark:text-gray-300 font-semibold">
          Tampilkan Di Halaman Utama
        </label>
        <br />
        <Switch
          checked={project.active}
          onChange={(value) =>
            SetProject({
              ...project,
              active: value,
            })
          }
        />
        {/* Tombol */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            // onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default Project;
