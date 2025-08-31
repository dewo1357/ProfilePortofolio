import axios from "axios";

const POST = async (endpoint, data, auth = true) => {
  const token = auth && localStorage.Token ? JSON.parse(localStorage.Token) : null;
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
    if (response.status === 201) {
      return response.data;
    } else if (response.status === 401) {
      location.href = "/";
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { POST };
