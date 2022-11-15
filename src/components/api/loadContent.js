import { ref, onMounted } from "vue";
import axios from "axios";

export default function loadContent() {
  const addresses = ref([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.VUE_APP_URL}/addresses`);
      addresses.value = [...response.data];
      addresses.value.sort((a, b) => {
        return a.lastName === b.lastName
          ? a.firstName.localeCompare(b.firstName)
          : a.lastName.localeCompare(b.lastName);
      });
    } catch (error) {
      console.log("Can not load data");
      console.log(error);
    }
  };

  onMounted(() => getData());

  return {
    addresses,
    getData,
  };
}
