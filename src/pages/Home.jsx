import Header from "../component/Header";
import Experience from "../component/Experience";
import ListExperience from "../UI/ListExperience";
import LoaderOverlay from "../UI/LoaderOverlay";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";
import { Link } from "react-router-dom";
import { GET_API } from "../Utility/Get";
import { X } from "lucide-react";
import Exp from "../UI/Form/Exp";

const Home = () => {
  const [experiences, Setexperiences] = useState([]);
  const [PrimaryProjects, SetPrimaryProjects] = useState([]);
  const { activeLoader, setActiveLader, Auth } = useTheme();

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  const EXPERIENCE = "Experience";
  const PROJECT = "PrimaryProjects";

  const getExperience = async () => {
    await get_data_from_source("api/experiences", Setexperiences, EXPERIENCE);
  };

  const getPrimaryProjects = async () => {
    await get_data_from_source(
      "api/Primaryprojects",
      SetPrimaryProjects,
      PROJECT
    );
    setActiveLader(false);
  };

  const get_data_from_source = async (endpoint, setData, key_chace) => {
    //get Chace First
    const getFromChace = localStorage.key_chace;
    if (getFromChace) {
      return setData(JSON.parse(getFromChace));
    }

    const response = await GET_API(endpoint);
    if (response) {
      setData(response);
      localStorage.setItem(key_chace, JSON.stringify(response));
    }
  };

  const getData = async () => {
    setActiveLader(true);
    await getExperience();
    await getPrimaryProjects();
    setActiveLader(false)
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text-primary-dark dark:text-primary">
        <Header />

        {/* Featured Projects */}
        {(PrimaryProjects.length > 1 || experiences.length > 1) && 
          <>
            <section className="my-20">
              <h2 className="text-3xl font-bold text-center">
                Featured Projects
              </h2>
              <div
                className={`${
                  PrimaryProjects.length > 1
                    ? "grid md:grid-cols-2 gap-6"
                    : "flex justify-center"
                } mt-6 px-6`}
              >
                {PrimaryProjects.map((item, i) => (
                  <div key={i}>
                    <div className="p-6 border rounded-lg shadow lg:h-[200px]">
                      <Link to={item.link}>
                        <h2 className="font-bold text-3xl mb-3 hover:underline">
                          {item.name}
                        </h2>
                      </Link>
                      <p>
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="my-20 px-6">
              <Experience>
                {localStorage.Token && Auth && (
                  <div className="flex justify-center items-center mb-6">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Tambah Experience
                    </button>
                  </div>
                )}
                {experiences.map((exp, i) => (
                  <ListExperience
                    key={i}
                    turnIndex={i}
                    index={2}
                    exp={exp}
                    experiences={experiences}
                    Setexperiences={Setexperiences}
                  />
                ))}
              </Experience>
            </section>
          </>
        }

        {/* CTA */}
        <Contact />
      </div>

      {/* Loader */}
      <LoaderOverlay active={activeLoader} />

      {/* Modal Tambah */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg w-full max-w-[50%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl dark:text-primary font-bold">
                Tambah Experience
              </h2>
              <button onClick={() => setOpenModal(false)}>
                <X size={20} />
              </button>
            </div>
            <Exp
              experiences={experiences}
              Setexperiences={Setexperiences}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
