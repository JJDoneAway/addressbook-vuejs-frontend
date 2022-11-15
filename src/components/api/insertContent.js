import axios from "axios";

export default function insertContent(getData, emit) {
  const createAddress = async (selectedAddress) => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_URL}/addresses`,
        selectedAddress
      );
      getData();
      emit({ ...response.data });
    } catch (error) {
      console.log("Can not update address");
      console.log(error);
    }
  };

  return {
    createAddress,
  };
}
