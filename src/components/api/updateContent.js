import axios from "axios";

export default function updateContent(getData, emit) {
  const updateAddress = async (selectedAddress) => {
    try {
      await axios.put(
        `${process.env.VUE_APP_URL}/addresses/${selectedAddress.id}`,
        selectedAddress
      );
      getData();
      emit(selectedAddress);
    } catch (error) {
      console.log("Can not update address");
      console.log(error);
    }
  };

  return {
    updateAddress,
  };
}
