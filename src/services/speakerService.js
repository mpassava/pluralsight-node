import axios from "axios";

const speakerService = () => {
  const getSpeakerById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/speakers/${id}`);
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    getSpeakerById,
  };
};

export default speakerService();
