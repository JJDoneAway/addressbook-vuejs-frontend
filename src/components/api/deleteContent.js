import axios from "axios";

export default function deleteContent(getData, emit) {
  const deleteAddress = async (selectedAddress) => {
    try {
      await axios.delete(
        "http://localhost:8080/addresses/" + selectedAddress.id
      );
      getData();
      emit(null);
    } catch (error) {
      console.log("Can not delete address");
      console.log(error);
    }
  };

  return {
    deleteAddress,
  };
}
