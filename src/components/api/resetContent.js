import axios from "axios";

export default function resetContent(getData, emit) {
  const resetData = async () => {
    try {
      await axios.patch("http://localhost:8080/addresses");
      getData();
      emit(null);
    } catch (error) {
      console.log("Can not update address");
      console.log(error);
    }
  };

  return {
    resetData,
  };
}
