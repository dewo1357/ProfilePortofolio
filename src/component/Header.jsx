import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { Camera } from "lucide-react"; // pakai icon dari lucide-react

const Header = () => {
  const { Auth, Profile,setProfile,setActiveLader } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // kontrol modal
  const [preview, setPreview] = useState(Profile.image); // foto profile sementara
  const [newFile, setNewFile] = useState(null); // file baru

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      setPreview(URL.createObjectURL(file)); // preview sebelum save
    }
  };

  const handleSave = async () => {
    setActiveLader(true)
    if (!newFile) return;

    const formData = new FormData();
    formData.append("image", newFile);
    formData.append("oldFile", Profile.FileName); // nama file lama dari profile

    try {
      const res = await fetch("http://localhost:3000/upload-profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status === "success") {
        // update state profile image
        setProfile(()=>({...Profile, image : data.url}));
        // TODO: update Profile di context / database user
        console.log("New image URL:", data.url);
        setActiveLader(false)
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-20 md:mt-[100px] px-6 md:px-30 gap-10">
      {/* Text Section */}
      <div className="text-primary-dark dark:text-primary text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold">
          Hi, I'm{" "}
          <Link to="/Login">
            <span className="text-[--color-secondary] dark:text-cyan-400">
              {Profile.name}
            </span>
          </Link>
        </h1>
        <p className="mt-4 text-base md:text-xl text-gray-600 dark:text-gray-300">
          {Profile.profesi}
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <Link
            to="/projects"
            className="px-6 py-3 rounded-lg bg-[--color-secondary] text-primary-dark font-medium dark:text-primary shadow dark:bg-cyan-200 dark:text-primary-dark hover:shadow-xl dark:shadow-cyan-500/50 
              font-medium text-center hover:opacity-90 duration-200"
          >
            View Projects
          </Link>
          <Link
            to={Profile.Link}
            target="_blank"
            className="px-6 py-3 rounded-lg shadow text-[--color-secondary] 
              bg-primary dark:bg-cyan-200 dark:text-primary-dark hover:shadow-xl dark:shadow-cyan-500/50 
              font-medium text-center"
          >
            Download CV
          </Link>
        </div>
      </div>

      {/* Profile Image with Hover */}
      {Auth && localStorage.Token ? (
        <div
          className="relative group cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={
              Profile.image
            }
            alt="Profile"
            className="w-48 h-48 md:w-[400px] md:h-[400px] object-cover rounded-full shadow-xl dark:shadow-cyan-500/50"
          />

          {/* Hover Overlay */}
          {Auth && localStorage.Token && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <Camera className="text-white w-10 h-10" />
              <span className="absolute bottom-5 text-white font-medium text-sm">
                Change Photo
              </span>
            </div>
          )}
        </div>
      ) : (
        <img
          src={
            Profile.image 
          }
          alt="Profile"
          className="w-48 h-48 md:w-[400px] md:h-[400px] object-cover rounded-full shadow-xl dark:shadow-cyan-500/50"
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg ">
            <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-primary">
              Ganti Foto Profile
            </h2>

            {/* Foto saat ini */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  preview ||
                  "https://btgvmkjerqvsufxwyfak.supabase.co/storage/v1/object/public/profileFoto/deo.png"
                }
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Foto saat ini
              </p>
            </div>

            {/* Input File */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPreview(Profile.image); // reset preview kalau batal
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:text-primary-dark"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Upload ke Supabase Storage
                  console.log("Upload file:", newFile);
                  handleSave();
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-[--color-secondary] bg-slate-900 dark:bg-slate-500 text-white hover:opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
