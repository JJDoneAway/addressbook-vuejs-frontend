<template>
  <header class="w3-container">
    <div class="w3-bar">
      <span class="w3-bar-item"
        >Used Backend:
        <a :href="getBackend + '/addresses'" target="_blank">{{
          getBackend
        }}</a></span
      >
      <span class="w3-bar-item w3-right"
        ><button @click="resetData()">Reset Data</button></span
      >
    </div>
  </header>
  <div class="w3-row">
    <div class="w3-twothird w3-container">
      <table class="w3-table-all w3-card-4 w3-hoverable">
        <tr class="w3-blue-grey">
          <th>Last Name</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr
          v-for="address in addresses"
          :key="address.id"
          @click="activate(address)"
          :class="{
            'selected-row': isSelected(address),
          }"
        >
          <td>
            {{ address.lastName }}
          </td>
          <td>{{ address.firstName }}</td>
          <td>{{ address.email }}</td>
          <td>{{ address.phone }}</td>
        </tr>
      </table>
    </div>
    <div class="w3-third w3-container">
      <AddressEditor
        title="Create new address"
        :address="newAddress"
        create
        @create-address="createAddress(newAddress)"
      />
      <p />
      <AddressEditor
        title="Update address"
        :address="selectedAddress"
        @update-address="updateAddress(selectedAddress)"
        @delete-address="deleteAddress(selectedAddress)"
      />
      <p />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AddressEditor from "./AddressEditor.vue";
import loadContent from "./api/loadContent";
import updateContent from "./api/updateContent";
import resetContent from "./api/resetContent";
import deleteContent from "./api/deleteContent";
import insertContent from "./api/insertContent";

export default {
  setup() {
    const selectedAddress = ref({});
    const newAddress = ref({});

    const activate = (address) =>
      (selectedAddress.value = address == null ? null : { ...address });

    const isSelected = (address) => {
      return (
        selectedAddress.value != null &&
        address != null &&
        selectedAddress.value.id == address.id
      );
    };

    const { addresses, getData } = loadContent();

    const { createAddress } = insertContent(getData, (address) => {
      activate(address);
      newAddress.value = {};
    });

    const { updateAddress } = updateContent(getData, activate);

    const { deleteAddress } = deleteContent(getData, activate);

    const { resetData } = resetContent(getData, activate);

    return {
      addresses,
      selectedAddress,
      newAddress,
      isSelected,
      getData,
      resetData,
      createAddress,
      updateAddress,
      deleteAddress,
      activate,
    };
  },

  name: "AddressBook",
  components: {
    AddressEditor,
  },
  computed: {
    getBackend() {
      return process.env.VUE_APP_URL;
    },
  },
};
</script>
<style>
tr:hover td {
  background-color: Silver;
}
.selected-row td {
  background-color: Silver !important;
}
th {
  font-weight: normal !important;
  font-size: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 2.6em;
}
</style>
