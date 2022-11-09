<template>
  <header class="w3-container">
    <div class="w3-bar">
      <span class="w3-bar-item w3-right"
        ><button @click="reset()">Reset Data</button></span
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
        @create-address="createAddress"
      />
      <p />
      <AddressEditor
        title="Update address"
        :address="selectedAddress"
        @update-address="updateAddress"
        @delete-address="deleteAddress"
      />
      <p />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddressEditor from "./AddressEditor.vue";

export default {
  name: "AddressBook",
  components: {
    AddressEditor,
  },
  data() {
    return {
      addresses: [],
      selectedAddress: null,
      newAddress: {},
    };
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get("http://localhost:8080/addresses");
        this.addresses = response.data;
        this.addresses.sort((a, b) => {
          return a.lastName === b.lastName
            ? a.firstName.localeCompare(b.firstName)
            : a.lastName.localeCompare(b.lastName);
        });
        this.clearAddress();
      } catch (error) {
        console.log("Can not load data");
        console.log(error);
      }
    },
    async deleteAddress() {
      try {
        await axios.delete(
          "http://localhost:8080/addresses/" + this.selectedAddress.id
        );
        this.getData();
        this.selectedAddress = null;
      } catch (error) {
        console.log("Can not delete address");
        console.log(error);
      }
    },
    async updateAddress() {
      try {
        let oldSelected = { ...this.selectedAddress };
        await axios.put(
          "http://localhost:8080/addresses/" + this.selectedAddress.id,
          this.selectedAddress
        );
        this.getData();
        this.activate(oldSelected);
      } catch (error) {
        console.log("Can not update address");
        console.log(error);
      }
    },
    async createAddress() {
      try {
        await axios.post("http://localhost:8080/addresses", this.newAddress);
        this.getData();
      } catch (error) {
        console.log("Can not update address");
        console.log(error);
      }
    },
    async reset() {
      try {
        await axios.patch("http://localhost:8080/addresses");
        this.getData();
        this.selectedAddress = null;
        this.clearAddress();
      } catch (error) {
        console.log("Can not update address");
        console.log(error);
      }
    },
    clearAddress() {
      this.newAddress = {};
    },
    activate(address) {
      this.selectedAddress = { ...address };
    },
    isSelected(address) {
      return (
        this.selectedAddress != null &&
        address != null &&
        this.selectedAddress.id == address.id
      );
    },
  },
  created() {
    this.getData();
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
