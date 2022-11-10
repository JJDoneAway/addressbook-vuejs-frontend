import axios from "axios";

export default function insertContent(getData, emit) {
  const createAddress = async (selectedAddress) => {
    try {
      console.log(selectedAddress);
      const response = await axios.post(
        "http://localhost:8080/addresses",
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
