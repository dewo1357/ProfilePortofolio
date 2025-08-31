import axios from "axios";

const EditAPI = async (endpoint, data) => {
   const token = JSON.parse(localStorage.Token)
  try {
    const response = await axios.put(
      `https://cruel-davita-sadeshop-79e55b22.koyeb.app/${endpoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      console.log("Berhasil update:", response.data);
      return response.data;
    }else if (response.status === 401) {
      location.href = "/"
    }
    return false;
  } catch (error) {
    console.error("Gagal update:", error);
    return false;
  }
};

export { EditAPI };
