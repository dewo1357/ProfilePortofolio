import { useEffect } from "react";
import axios from "axios";
import LoaderOverlay from "../../UI/LoaderOverlay";
import ProjectList from "./ProjectList";
import { useTheme } from "../../context/ThemeProvider";
import AddDataModal from "./AddDataModal";


const Projects = () => {
  
  const { activeLoader, setActiveLader,Auth,projects, setProject } = useTheme();
  
  useEffect(() => {
    setActiveLader(true);
    axios
      .get("https://cruel-davita-sadeshop-79e55b22.koyeb.app/api/projects") // endpoint dari Hapi
      .then((res) => {
        console.log("✅ Data projects:", res.data);
        setProject(res.data);
        setActiveLader(false);
      })
      .catch((err) => {
        console.error("❌ Error fetch:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-primary-dark dark:text-primary">
            Projects
          </h1>

          {/* Tombol Tambah Data (modular) */}
          {Auth && localStorage.Token && <AddDataModal />}
        </div>
        <ProjectList
          projects={projects}
          setProject={(Data) => {
            setProject(Data);
          }}
        />
      </div>
      <LoaderOverlay active={activeLoader} />
    </>
  );
};

export default Projects;
