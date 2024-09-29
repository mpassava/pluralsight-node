import axios from "axios";

const speakerService = () => {
  function getSpeakerById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/speakers/${id}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  return {
    getSpeakerById,
  };
};

export default speakerService();
