import { useState } from "react";
import { Edit, Trash, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteAPI } from "../Utility/DeleteAPI";
import { useTheme } from "../context/ThemeProvider";
import { EditAPI } from "../Utility/EditAPI";
import ConfirmationModal from "./ConfirmationModal";

const ListExperience = ({
  turnIndex,
  index,
  exp,
  experiences,
  Setexperiences,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formExp, setFormExp] = useState(exp);
  const [modalConfirmOpen, SetmodalConfirmOpen] = useState(false);
  const [idExperience, SetIdExperince] = useState(null);
  const { setActiveLader } = useTheme();

  let isLeft = turnIndex % index === 0;

  console.log(isLeft, turnIndex, index, index % turnIndex);

  const handleEditClick = () => {
    setFormExp(exp); // reset isi modal dengan data exp sekarang
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExpSubmit = (e) => {
    e.preventDefault();

    handleCloseModal();
  };

  const handleTaskChange = (taskIndex, value) => {
    const updatedTasks = [...formExp.tasks];
    updatedTasks[taskIndex] = value;
    setFormExp({ ...formExp, tasks: updatedTasks });
  };

  const addTaskField = () => {
    setFormExp({ ...formExp, tasks: [...formExp.tasks, ""] });
  };

  const removeTaskField = (taskIndex) => {
    const updatedTasks = formExp.tasks.filter((_, i) => i !== taskIndex);
    setFormExp({ ...formExp, tasks: updatedTasks });
  };

  const handleDelete = () => {
    const Delete = DeleteAPI(`experience/${idExperience}`);
    if (Delete) {
      const Data = experiences.filter((item) => item.id !== idExperience);
      Setexperiences(Data);
      SetmodalConfirmOpen(false);
    }
  };

  const StartToEdit = async () => {
    setActiveLader(true);
    console.log("Update Project:", formExp);
    console.log(formExp);
    await EditAPI(`experience/${formExp.id}`, formExp);

    const Data = experiences.map((item) =>
      item.id === exp.id ? formExp : item
    );

    //Update Project Array State
    Setexperiences(Data);

    //closeModal Confirmation
    SetmodalConfirmOpen(false);

    //Close Loading
    setActiveLader(false);
  };

  const ExperienceCard = (
    <div className="categoryBlank category relative">
      {/* Konten utama */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{exp.title}</h3>
          <p className="italic">{exp.company}</p>
          <p>
            {exp.start_date instanceof Date
              ? exp.start_date.toLocaleDateString() + " "
              : exp.start_date + " "}
            |{!exp.isOngoing ? " " + exp.end_date : " Sekarang"}
          </p>
        </div>

        {/* Tombol edit/delete */}
        {localStorage.Token && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                handleEditClick();
              }}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => {
                SetIdExperince(exp.id);
                SetmodalConfirmOpen(true);
              }}
              className="p-1 hover:bg-red-200 dark:hover:bg-red-700 rounded-full"
            >
              <Trash size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      <ul className="list-disc ml-5 text-sm">
        {exp.tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="flex flex-col justify-center relative w-full md:flex-row mb-10 md:mb-0">
        {/* ===== Mobile (selalu 1 kolom) ===== */}
        <div className="md:hidden w-full flex justify-center">
          {ExperienceCard}
        </div>

        {/* ===== Desktop kiri–kanan ===== */}
        <div className="hidden md:flex w-1/2 justify-end pr-4">
          {isLeft && ExperienceCard}
        </div>

        {/* Garis tengah hanya di desktop */}
        <div className="hidden lg:flex w-[1px] dark:bg-slate-200 bg-primary-dark mx-5 relative">
          <span className="absolute -left-[7px] w-4 h-4 bg-primary-dark dark:bg-slate-200 rounded-full top-4"></span>
        </div>

        <div className="hidden md:flex w-1/2 justify-start pl-4">
          {!isLeft && ExperienceCard}
        </div>
      </div>

      {/* ===== Modal Edit ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col ">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Edit Experience
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Body scrollable */}
            <div className="p-6 flex-1">
              <form onSubmit={handleExpSubmit} className="space-y-2 text-sm">
                {/* Title */}
                <input
                  type="text"
                  placeholder="Judul"
                  value={formExp.title}
                  onChange={(e) =>
                    setFormExp({ ...formExp, title: e.target.value })
                  }
                  className="w-full p-1.5 border rounded-lg focus:ring-2 focus:ring-[--color-secondary] dark:bg-slate-800 dark:text-white"
                />

                {/* Company */}
                <input
                  type="text"
                  placeholder="Perusahaan"
                  value={formExp.company}
                  onChange={(e) =>
                    setFormExp({ ...formExp, company: e.target.value })
                  }
                  className="w-full p-1.5 border rounded-lg focus:ring-2 focus:ring-[--color-secondary] dark:bg-slate-800 dark:text-white"
                />

                {/* Date Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  {/* Start Date */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium dark:text-primary">
                      Tanggal Mulai
                    </label>
                    <DatePicker
                      selected={formExp.start_date}
                      onChange={(date) =>
                        setFormExp({ ...formExp, start_date: date })
                      }
                      className="w-full p-1.5 border rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>

                  {/* Switch Ongoing */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium dark:text-primary mb-1">
                      Masih Bekerja?
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formExp.isOngoing || false}
                        onChange={(e) =>
                          setFormExp({
                            ...formExp,
                            isOngoing: e.target.checked,
                            end_date: e.target.checked
                              ? null
                              : formExp.end_date,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div
                        className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full 
          peer dark:bg-gray-700 peer-checked:bg-green-500 
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 after:border after:rounded-full 
          after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"
                      />
                    </label>
                  </div>
                </div>

                {/* End Date (hanya muncul kalau tidak ongoing) */}
                {!formExp.isOngoing && (
                  <div className="space-y-1">
                    <label className="block text-xs font-medium dark:text-primary">
                      Tanggal Akhir
                    </label>
                    <DatePicker
                      selected={formExp.end_date}
                      onChange={(date) =>
                        setFormExp({ ...formExp, end_date: date })
                      }
                      className="w-full p-1.5 border rounded-lg dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[--color-secondary]"
                    />
                  </div>
                )}

                {/* Tasks */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium dark:text-primary">
                    Tasks
                  </label>
                  <div className="space-y-2 max-h-[20vh] overflow-y-auto pr-1">
                    {formExp.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Task ${idx + 1}`}
                          value={task}
                          onChange={(e) =>
                            handleTaskChange(idx, e.target.value)
                          }
                          className="flex-1 p-1.5 border rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeTaskField(idx)}
                          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                        >
                          <Trash size={16} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addTaskField}
                    className="w-full py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                  >
                    + Add Task
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  onClick={() => {
                    SetmodalConfirmOpen(true);
                  }}
                  className="w-full py-2 rounded-lg bg-primary-dark dark:bg-primary dark:text-primary-dark text-white font-semibold hover:opacity-90 transition text-sm"
                >
                  Simpan Experience
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={modalConfirmOpen}
        onClose={() => {
          SetmodalConfirmOpen(false);
          SetIdExperince(null);
        }}
        onConfirm={() => {
          idExperience ? handleDelete() : StartToEdit();
        }}
        message={
          idExperience
            ? "Apakah Anda Yakin Ingin Menghapus Data ?"
            : "Apakah Anda Yakin Untuk Update Data ?"
        }
      />
    </>
  );
};

export default ListExperience;
