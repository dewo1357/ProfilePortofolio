import { createContext, useContext, useState, useEffect } from "react";
import { POST } from "../Utility/POST";
import { GET_API } from "../Utility/Get";

// 1. Buat context
const ThemeContext = createContext();

// 2. Buat provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [activeLoader, setActiveLader] = useState(false);
  const [Auth, SetAuth] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProject] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [Profile, setProfile] = useState({
    id: "",
    name: "",
    profesi: "",
    description: "",
  });

  // kalau ada setting sebelumnya di localStorage, pakai itu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  // update DOM dan localStorage tiap kali theme berubah
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const GetProfile = async () => {
      const DataProfile = await GET_API("GetProfileData");
      if (DataProfile) {
        console.log(DataProfile.Profile[0]);
        setProfile(DataProfile.Profile[0]);
      }
    };
    Profile.id=='' && GetProfile();
    console.log(Profile);
  }, [Profile]);

  const checkToken = async () => {
    const token = JSON.parse(localStorage.Token);
    const checking = await POST("checkToken", { token });
    if (checking) {
      SetAuth(true);
    } else {
      SetAuth(false);
      localStorage.removeItem("Token");
    }
  };

  useEffect(() => {
    if (localStorage.Token || Auth) {
      checkToken();
    }
  }, [Auth]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        activeLoader,
        setActiveLader,
        Auth,
        SetAuth,
        blogs,
        setBlogs,
        projects,
        setProject,
        isOpenModal,
        setOpenModal,
        Profile,
        setProfile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook biar gampang dipakai
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
