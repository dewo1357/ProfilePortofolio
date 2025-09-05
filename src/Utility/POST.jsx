import axios from "axios";

const POST = async (endpoint, data, auth = true) => {
  console.log("Add Data");
  const token =
    auth && localStorage.Token ? JSON.parse(localStorage.Token) : null;
  try {
    const response = await axios.post(
      `https://cruel-davita-sadeshop-79e55b22.koyeb.app/${endpoint}`,
      data,
      {
        headers: {
          Authorization: auth ? `Bearer ${token}` : null,
        },
      }
    );
    console.log(response);
    if (response.status === 201) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.status)
    if (error.response.status === 401) {
      localStorage.removeItem("Token");
      location.href = "/";
      return false;
    }
  }
};

export { POST };
