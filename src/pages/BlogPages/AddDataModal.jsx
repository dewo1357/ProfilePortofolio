import { useState } from "react";
import { Plus } from "lucide-react";
import Blog from "../../UI/Form/Blog";

export default function AddDataModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium
          bg-gradient-to-r from-green-500 to-green-600 text-white
          hover:from-green-600 hover:to-green-700
          transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Plus size={18} /> Tambah Data
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-[50%]">
            {/* Tombol Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-primary-dark dark:text-primary mb-4">
              Tambah Data
            </h2>

            {/* Form / Komponen */}
            <Blog closeModal={setIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
}
