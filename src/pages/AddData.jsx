import { useEffect, useState } from "react";
import Exp from "../UI/Form/Exp";
import Blog from "../UI/Form/Blog";
import Project from "../UI/Form/Project";
import LoaderOverlay from "../UI/LoaderOverlay";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { POST } from "../Utility/POST";

const AddData = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const { Auth, SetAuth, activeLoader } = useTheme();
  const navigate = useNavigate();

  const CheckToken = async (token) => {
    const checking = await POST("checkToken", { token });
    return checking;
  };

  useEffect(() => {
    if (!Auth || !localStorage.Token) {
      navigate("/Login");
      SetAuth(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {["experience", "project", "blog"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
              ${
                activeTab === tab
                  ? "bg-[--color-secondary] text-gray-700 dark:text-gray-200 shadow-lg dark:shadow-cyan-500/50"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-slate-200 dark:bg-slate-900 shadow-lg dark:shadow-cyan-500/50 rounded-2xl p-8 transition-colors max-w-4xl mx-auto ">
        {activeTab === "experience" && <Exp />}
        {activeTab === "project" && <Project />}
        {activeTab === "blog" && <Blog />}
      </div>
      <LoaderOverlay active={activeLoader} />
    </div>
  );
};

export default AddData;
