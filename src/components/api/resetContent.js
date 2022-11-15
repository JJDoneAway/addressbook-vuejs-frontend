import axios from "axios";

export default function resetContent(getData, emit) {
  const resetData = async () => {
    try {
      await axios.patch(`${process.env.VUE_APP_URL}/addresses`);
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
