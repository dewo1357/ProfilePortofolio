import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-7xl font-bold text-[--color-secondary] dark:text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Oops! Halaman tidak ditemukan
      </h2>
      <p className="mt-2 text-gray-600 text-primary-dark dark:text-gray-200 ">
        Halaman yang Anda cari mungkin sudah dipindahkan, dihapus,
        atau belum tersedia.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[--color-secondary] text-gray-900 dark:text-gray-200 font-medium rounded-lg shadow-md hover:opacity-90 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
