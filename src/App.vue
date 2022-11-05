<template>
  <header class="w3-container">
    <h1>Address Book</h1>
  </header>
  <AddressBook />
</template>

<script>
import AddressBook from "./components/AddressBook.vue";

export default {
  name: "App",
  components: {
    AddressBook,
  },
};
</script>
