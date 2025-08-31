import axios from "axios";

const GET_API = async (endpoint) => {
  try {
    const response = await axios.get(`https://cruel-davita-sadeshop-79e55b22.koyeb.app/${endpoint}`);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.error("Gagal dihapus:", error);
    return false;
  }
};

export { GET_API };
