import Navbar from "../UI/Navbar";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
const MainPages = ({ children }) => {
  const { isOpenModal, setOpenModal } = useTheme();
  console.log(isOpenModal)

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
    return;
  };
  return (
    <>
      <Navbar />
      {children}
      <ConfirmationModal
        isOpen={isOpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onConfirm={() => {
          onLogout();
          setOpenModal(false);
        }}
        message={"Apakah Anda Yakin Ingin Logout ?"}
      />
    </>
  );
};

export default MainPages;
