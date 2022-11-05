<template>
  <div class="w3-row">
    <div class="w3-twothird w3-container">
      <table class="w3-table-all w3-card-4">
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr
          v-for="address in addresses"
          :key="address.id"
          @click="activate(address)"
          :class="{ 'selected-row': address.id == selectedAddress.id }"
        >
          <td :class="{ 'selected-row': address.id == selectedAddress.id }">
            {{ address.lastName }}
          </td>
          <td>{{ address.firstName }}</td>
          <td>{{ address.email }}</td>
          <td>{{ address.phone }}</td>
        </tr>
      </table>
    </div>
    <div class="w3-third w3-container">
      <!--Update existing address -->
      <div v-if="selectedAddress" class="w3-card-4">
        <div class="w3-container">
          <h2>Selected Address</h2>
        </div>

        <div class="w3-container">
          <label>First Name</label>
          <input
            class="w3-input"
            type="text"
            v-model="selectedAddress.firstName"
          />
          <label>Last Name</label>
          <input
            class="w3-input"
            type="text"
            v-model="selectedAddress.lastName"
          />
          <label>Email</label>
          <input class="w3-input" type="text" v-model="selectedAddress.email" />
          <label>Phone</label>
          <input class="w3-input" type="text" v-model="selectedAddress.phone" />
          <p />
          <div class="w3-center">
            <div class="w3-bar">
              <button
                class="w3-button w3-ripple w3-gray"
                @click="updateAddress()"
                style="margin-right: 5px; width: 8em"
              >
                Update
              </button>
              <button
                class="w3-button w3-ripple w3-red"
                @click="deleteAddress()"
                style="margin-right: 5px; width: 8em"
              >
                Delete
              </button>
            </div>
          </div>
          <p />
        </div>
      </div>
      <p />
      <!-- Create new Address-->
      <div class="w3-card-4">
        <div class="w3-container">
          <h2>New Address</h2>
        </div>

        <div class="w3-container">
          <label>First Name</label>
          <input class="w3-input" type="text" v-model="newAddress.firstName" />
          <label>Last Name</label>
          <input class="w3-input" type="text" v-model="newAddress.lastName" />
          <label>Email</label>
          <input class="w3-input" type="text" v-model="newAddress.email" />
          <label>Phone</label>
          <input class="w3-input" type="text" v-model="newAddress.phone" />
          <p />
          <div class="w3-center">
            <div class="w3-bar">
              <button
                class="w3-button w3-ripple w3-gray"
                @click="createAddress()"
                style="margin-right: 5px; width: 8em"
              >
                Save
              </button>
              <button
                class="w3-button w3-ripple w3-red"
                @click="clearAddress()"
                style="margin-right: 5px; width: 8em"
              >
                Clear
              </button>
            </div>
          </div>
          <p />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddressBook",
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
        this.activate(this.addresses[0]);
        this.clearAddress();
      } catch (error) {
        console.log("Can not load data");
        console.log(error);
      }
    },
    activate(address) {
      this.selectedAddress = { ...address };
    },
    async deleteAddress() {
      try {
        await axios.delete(
          "http://localhost:8080/addresses/" + this.selectedAddress.id
        );
        this.getData();
      } catch (error) {
        console.log("Can not delete address");
        console.log(error);
      }
    },
    async updateAddress() {
      try {
        await axios.put(
          "http://localhost:8080/addresses/" + this.selectedAddress.id,
          this.selectedAddress
        );
        this.getData();
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
    clearAddress() {
      this.newAddress = {};
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
tr:hover td {
  background-color: gray;
}
.selected-row td {
  background-color: gray !important;
}
</style>
