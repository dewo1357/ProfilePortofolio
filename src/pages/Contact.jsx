import LoaderOverlay from "../UI/LoaderOverlay";
const Contact = () => {
  const contacts = [
    { name: "fab fa-github fa-2x", url: "https://github.com/dewo1357" },
    { name: "fab fa-linkedin fa-2x", url: "https://www.linkedin.com/in/sadewo-widyanto-328706265/" },
    { name: "fas fa-envelope fa-2x", url: "mailto:sadewowidyanto@gmail.com" },
  ];

  return (
    <div className="max-w-2xl mx-auto my-20 px-6 text-center text-primary-dark dark:text-primary">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
      <p className="mb-6">Let's collaborate! Reach me via:</p>
      <div className="flex justify-center space-x-6">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            className="text-[--color-secondary] font-semibold underline"
          >
            <i className={c.name}>
              
            </i>
          </a>
        ))}
      </div>
      <LoaderOverlay/>
    </div>
    
  );
};

export default Contact;
