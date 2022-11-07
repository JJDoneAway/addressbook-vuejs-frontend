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
      <!--Update existing address -->
      <!-- Create new Address-->
      <div class="w3-card-4">
        <div class="w3-container w3-blue-grey">
          <h5>New Address</h5>
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
      <p />

      <div v-if="selectedAddress" class="w3-card-4">
        <div class="w3-container w3-blue-grey">
          <h5>Selected Address</h5>
        </div>
        <!-- Validation errors-->
        <div v-if="validationErrors.length > 0">
          <div class="w3-container w3-red">
            <ul class="w3-ul">
              <li v-for="error in validationErrors" :key="error">
                {{ error }}
              </li>
            </ul>
          </div>
          <p />
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

function validateAddress(address) {
  let result = [];
  if (address.firstName == null || address.firstName.trim() == "") {
    result.push("First name must not be empty");
  }

  if (address.lastName == null || address.lastName.trim() == "") {
    result.push("Last name must not be empty");
  }

  if (address.email == null || !validEmail(address.email)) {
    result.push("Email must be set and valid");
  }

  if (address.phone == null || !validPhone(address.phone)) {
    result.push("Phone must be set and valid like '+490913132587'");
  }

  return result;
}

function validEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validPhone(phone) {
  var re = /\+\d{5,50}/;
  return re.test(phone);
}

export default {
  name: "AddressBook",
  data() {
    return {
      addresses: [],
      selectedAddress: null,
      newAddress: {},
      validationErrors: [],
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
        this.validationErrors = validateAddress(this.selectedAddress);
        if (this.validationErrors.length > 0) {
          console.log(this.validationErrors);
          return;
        }

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
      this.validationErrors = [];
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
