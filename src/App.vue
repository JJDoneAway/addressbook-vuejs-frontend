<template>
  <div v-if="!backendIsConnected">
    <div class="w3-panel w3-yellow w3-display-container">
      <span
        onclick="this.parentElement.style.display='none'"
        class="w3-button w3-large w3-display-topright"
        >&times;</span
      >
      <h3>Problem!</h3>
      <p>
        It is not possible to contact the Addressbook Backend: {{ getBackend }}
      </p>
    </div>
  </div>
  <AddressBook v-if="backendIsConnected" />
</template>

<script>
import axios from "axios";
import AddressBook from "./components/AddressBook.vue";

export default {
  name: "App",
  components: {
    AddressBook,
  },
  data() {
    return { backendIsConnected: true };
  },
  methods: {
    checkBackendConnection() {
      axios
        .get(`${process.env.VUE_APP_URL}/status/up`)
        .then((response) => {
          this.backendIsConnected = true;
          console.log(
            `Backend is up and running. Response was: ${JSON.stringify(
              response.statusText
            )}`
          );
        })
        .catch((error) => {
          this.backendIsConnected = false;
          console.log(
            `Backend is broken. Response was: ${JSON.stringify(error)}`
          );
        });
    },
  },
  computed: {
    getBackend() {
      return process.env.VUE_APP_URL;
    },
  },
  created() {
    this.checkBackendConnection();
  },
};
</script>
