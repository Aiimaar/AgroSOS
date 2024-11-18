import axios from "axios";

export const onCreatePlot = async (formData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/plots", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el plot", error);
    throw error;
  }
};
