import axios from "axios";

export default function updateContent(getData, emit) {
  const updateAddress = async (selectedAddress) => {
    try {
      console.log(selectedAddress);
      await axios.put(
        "http://localhost:8080/addresses/" + selectedAddress.id,
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
