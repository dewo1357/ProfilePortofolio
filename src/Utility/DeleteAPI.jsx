import axios from "axios";

const DeleteAPI = async (endpoint) => {

  const token = localStorage.Token ? JSON.parse(localStorage.Token) : null;
  try {
    const response = await axios.delete(`https://cruel-davita-sadeshop-79e55b22.koyeb.app/${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    if (response.status === 200) {
      console.log("Berhasil dihapus:", response.data);
      return true;
    } else if (response.status === 401) {
      location.href = "/"
    }

    return false;
  } catch (error) {
    console.error("Gagal dihapus:", error);
    return false;
  }
};

export { DeleteAPI };
