import axios from "axios";

const EditAPI = async (endpoint, data) => {
  const token = JSON.parse(localStorage.Token);
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
    }
    return false;
  } catch (error) {
    console.log(error);
    console.log(error.response.status);
    if (error.response.status === 401) {
      localStorage.removeItem("Token");
      location.href = "/";
    }
    return false;
  }
};

export { EditAPI };
