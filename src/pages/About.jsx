import LoaderOverlay from "../UI/LoaderOverlay";
import { useTheme } from "../context/ThemeProvider";
const About = () => {
  const { Profile } = useTheme();
  console.log(Profile)
  return (
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
      <LoaderOverlay />
    </div>
  );
};

export default About;
