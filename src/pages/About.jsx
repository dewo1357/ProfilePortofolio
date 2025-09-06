import LoaderOverlay from "../UI/LoaderOverlay";
import { useTheme } from "../context/ThemeProvider";
const About = () => {
  const { Profile } = useTheme();
  console.log(Profile);
  return (
    <>
      <div className="max-w-5xl mx-auto my-20 px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Foto profil */}
        <div className="flex-shrink-0">
          <img
            src={Profile.image}
            alt={Profile.name}
            className="h-[300px] w-[300px] object-cover rounded-full shadow-xl dark:shadow-cyan-500/50"
          />
        </div>

        {/* Konten teks */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-primary-dark dark:text-primary mb-4">
            About Me
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {Profile.profesi}
          </h2>

          <div
            className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: Profile.description }}
          ></div>
        </div>
      </div>
      <h3 className="text-4xl text-center font-bold text-primary-dark dark:text-primary ">
        Experience Tools
      </h3>
      {/* Container Skills */}
      <div className="w-full flex justify-center flex-wrap p-5 my-10 gap-20 ">
        {/* JavaScript */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/javascript/000000"
            alt="JavaScript"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/javascript/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            JavaScript
          </span>
        </div>

        {/* Python */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/python/000000"
            alt="Python"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/python/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            Python
          </span>
        </div>

        {/* PHP */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/php/000000"
            alt="PHP"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/php/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            PHP
          </span>
        </div>

        {/* Laravel */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/laravel/000000"
            alt="Laravel"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/laravel/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            Laravel
          </span>
        </div>

        {/* FastAPI */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/fastapi/000000"
            alt="FastAPI"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/fastapi/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            FastAPI
          </span>
        </div>

        {/* React */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/react/000000"
            alt="React"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/react/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            React
          </span>
        </div>

        {/* TailwindCSS */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/tailwindcss/000000"
            alt="TailwindCSS"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/tailwindcss/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            TailwindCSS
          </span>
        </div>

        {/* HTML */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/html5/000000"
            alt="HTML"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/html5/ffffff')]"
          />
          <span className="text-sm dark:text-primary mt-2 font-semibold">
            HTML
          </span>
        </div>
        {/* jQuery */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.simpleicons.org/jquery/000000"
            alt="jQuery"
            className="h-12 w-12 dark:content-[url('https://cdn.simpleicons.org/jquery/ffffff')]"
          />
          <span className="text-sm mt-2 font-semibold">jQuery</span>
        </div>
      </div>
      <LoaderOverlay />
    </>
  );
};

export default About;
