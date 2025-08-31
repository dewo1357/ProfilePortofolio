// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Konfirmasi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {message || "Apakah kamu yakin melakukan aksi ini?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 dark:text-slate-200 rounded-xl border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
