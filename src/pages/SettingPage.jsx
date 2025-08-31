import { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { EditAPI } from "../Utility/EditAPI";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useTheme } from "../context/ThemeProvider";
import LoaderOverlay from "../UI/LoaderOverlay";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isOpenModal,setOpenModal] = useState(false)
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [settings, setSettings] = useState({
    name: "",
    profesi: "",
    description: "",
    Link : ""
  });


  const {Profile,setProfile,setActiveLader,activeLoader}  = useTheme()
  // Menampilkan notifikasi
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };  

  // Menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(settings);
    setOpenModal(true)
    
  };

  const StartToEdit = async ()=>{
    setActiveLader(true)
    const Edit = await EditAPI(`EditProfileData/${settings.id}`,settings)
    if(Edit){
      setProfile(settings)
      showNotification(`Pengatura berhasil disimpan!`);
      setOpenModal(false)
      setActiveLader(false)
      
    }
    
  }

  // Load settings dari localStorage saat komponen dimount
  useEffect(() => {
    setSettings(Profile)
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-200 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">
            Pengaturan Konten
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "home"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("home")}
              >
                Home
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "about"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
            </div>
          </div>

          {/* Home Settings Form */}
          {activeTab === "home" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="home-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="home-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={settings.name}
                  onChange={(e) =>
                    setSettings({ ...settings, name: e.target.value })
                  }
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label
                  htmlFor="home-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Judul Profesi
                </label>
                <input
                  type="text"
                  id="home-title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={settings.profesi}
                  onChange={(e) =>
                    setSettings({ ...settings, profesi: e.target.value })
                  }
                  placeholder="Contoh: Backend Developer | Data Enthusiast"
                />
              </div>

              <div>
                <label
                  htmlFor="home-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link CV
                </label>
                <input
                  type="text"
                  id="home-title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={settings.Link}
                  onChange={(e) =>
                    setSettings({ ...settings, Link: e.target.value })
                  }
                  placeholder="Contoh: Backend Developer | Data Enthusiast"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Simpan Pengaturan Home
              </button>
            </form>
          )}

          {/* About Settings Form */}
          {activeTab === "about" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="about-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi
                </label>
                <div className="">
                  <ReactQuill
                    theme="snow"
                    value={settings.description}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e })
                    }
                    className="bg-white dark: quill-custom text-black shadow-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Simpan Pengaturan About
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-[100px] right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {notification.message}
        </div>
      )}
      <ConfirmationModal
        isOpen={isOpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onConfirm={() => {
          StartToEdit();
          setOpenModal(false);
        }}
        message={"Apakah Anda Yakin Ingin Merubah Data Profile ?"}
      />
      <LoaderOverlay active={activeLoader}/>
    </>
  );
};

export default SettingsPage;
