import { Trash } from "lucide-react";
import { useState } from "react";
import LoaderOverlay from "../LoaderOverlay";
import { useTheme } from "../../context/ThemeProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { POST } from "../../Utility/POST";

const Exp = ({ experiences, Setexperiences, setOpenModal }) => {
  const { activeLoader, setActiveLader } = useTheme();
  const [exp, setExp] = useState({
    title: "",
    company: "",
    start_date: null,
    end_date: null,
    tasks: [""],
    isOngoing : null,
  });

  const [isOngoing, setIsOngoing] = useState(false);

  const addExperience = async () => {
    setActiveLader(true);
    await POST("api/experience", {
      title: exp.title,
      company: exp.company,
      date: exp.date,
      tasks: exp.tasks,
      start_date: exp.start_date,
      end_date: exp.end_date,
      isOngoing: isOngoing,
    });
    const maxId = Math.max(...experiences.map((d) => d.id)) + 1;
    const DataBaru = { ...exp, id: maxId };
    console.log(DataBaru)
    Setexperiences([DataBaru, ...experiences]);
    setOpenModal(false);
    setActiveLader(false);
  };

  const addTaskField = (e) => {
    e.preventDefault();
    setExp({ ...exp, tasks: [...exp.tasks, ""] });
  };

  // Handler untuk menghapus task
  const removeTaskField = (index) => {
    const newTasks = exp.tasks.filter((_, i) => i !== index);
    setExp({ ...exp, tasks: newTasks });
  };

  // Handler untuk mengubah task tertentu
  const handleTaskChange = (index, value) => {
    const newTasks = [...exp.tasks];
    newTasks[index] = value;
    setExp({ ...exp, tasks: newTasks });
  };

  const handleExpSubmit = (e) => {
    e.preventDefault();
    addExperience();
  };
  return (
    <>
      {activeLoader && <LoaderOverlay active={activeLoader} />}
      <form onSubmit={handleExpSubmit} className="space-y-3">
        {/* Input Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Judul
          </label>
          <input
            type="text"
            placeholder="Judul"
            value={exp.title}
            onChange={(e) => setExp({ ...exp, title: e.target.value })}
            className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-[--color-secondary] dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Input Company */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Perusahaan
          </label>
          <input
            type="text"
            placeholder="Perusahaan"
            value={exp.company}
            onChange={(e) => setExp({ ...exp, company: e.target.value })}
            className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-[--color-secondary] dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">
              Mulai
            </label>
            <DatePicker
              selected={exp.start_date}
              onChange={(e) => setExp({ ...exp, start_date: e })}
              className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Switch Ongoing */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Masih Bekerja?
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isOngoing}
                onChange={(e) => {
                  setIsOngoing(() => !isOngoing);
                  setExp({ ...exp,isOngoing : e.target.checked, end_date: isOngoing ? null : exp.end_date });
                }}
                className="sr-only peer"
              />
              <div
                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
              rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full 
              after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              />
            </label>
          </div>
        </div>

        {/* End Date (muncul hanya jika tidak ongoing) */}
        {!isOngoing && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-1">
              Selesai
            </label>
            <DatePicker
              selected={exp.end_date}
              onChange={(e) =>
                setExp({ ...exp, end_date: isOngoing ? null : e })
              }
              className="w-full p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}

        {/* Tasks */}
        <div className="space-y-2">
          <label className="block font-semibold text-gray-800 dark:text-gray-200">
            Tasks
          </label>
          <div className="space-y-2 max-h-[15vh] overflow-y-auto pr-1">
            {exp.tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded-xl dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeTaskField(index)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addTaskField}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            + Add Task
          </button>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-dark dark:bg-primary dark:text-primary-dark text-white font-semibold hover:opacity-90 transition"
          >
            Simpan Experience
          </button>
        </div>
      </form>
    </>
  );
};

export default Exp;
