<template>
  <div v-if="address" class="w3-card-4">
    <!-- title-->
    <div class="w3-container w3-blue-grey">
      <h5>{{ title }}</h5>
    </div>

    <!-- Validation errors -->
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

    <!-- input fields-->
    <div class="w3-container">
      <label>First Name</label>
      <input
        class="w3-input"
        type="text"
        name="firstName"
        :value="address.firstName"
        @input="emitValue"
      />
      <label>Last Name</label>
      <input
        class="w3-input"
        type="text"
        name="lastName"
        :value="address.lastName"
        @input="emitValue"
      />
      <label>Email</label>
      <input
        class="w3-input"
        type="text"
        name="email"
        :value="address.email"
        @input="emitValue"
      />
      <label>Phone</label>
      <input
        class="w3-input"
        type="text"
        name="phone"
        :value="address.phone"
        @input="emitValue"
      />
      <p />

      <!-- Buttons-->
      <div class="w3-center">
        <div class="w3-bar">
          <button
            v-if="create"
            class="w3-button w3-ripple w3-gray"
            @click="createAddress()"
            style="margin-right: 5px; width: 8em"
          >
            Save
          </button>
          <button
            v-if="create"
            class="w3-button w3-ripple w3-red"
            @click="clearAddress()"
            style="margin-right: 5px; width: 8em"
          >
            Clear
          </button>
          <button
            v-if="!create"
            class="w3-button w3-ripple w3-gray"
            @click="updateAddress()"
            style="margin-right: 5px; width: 8em"
          >
            Update
          </button>
          <button
            v-if="!create"
            class="w3-button w3-ripple w3-red"
            @click="$emit('deleteAddress')"
            style="margin-right: 5px; width: 8em"
          >
            Delete
          </button>
        </div>
      </div>
      <p />
    </div>
  </div>
</template>

<script>
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
  name: "AddressEditor",
  props: {
    title: String,
    create: Boolean,
    address: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
  },
  emits: [
    "updateAddress",
    "createAddress",
    "deleteAddress",
    "update:modelValue",
  ],
  data() {
    return {
      validationErrors: [],
    };
  },
  methods: {
    emitValue(e) {
      let value = e.target.value;
      // eslint-disable-next-line vue/no-mutating-props
      this.address[e.target.name] = value;
      this.$emit("update:modelValue", this.address);
    },
    clearAddress() {
      // eslint-disable-next-line vue/no-mutating-props
      this.address.firstName = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.address.lastName = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.address.email = "";
      // eslint-disable-next-line vue/no-mutating-props
      this.address.phone = "";
      this.$emit("update:modelValue", this.address);
    },
    updateAddress() {
      this.validateAddress(this.address);
      if (this.validationErrors.length > 0) return;
      this.$emit("updateAddress");
    },
    createAddress() {
      this.validateAddress(this.address);
      if (this.validationErrors.length > 0) return;
      this.$emit("createAddress");
    },
    validateAddress(address) {
      this.validationErrors = [];
      if (address.firstName == null || address.firstName.trim() == "") {
        this.validationErrors.push("First name must not be empty");
      }

      if (address.lastName == null || address.lastName.trim() == "") {
        this.validationErrors.push("Last name must not be empty");
      }

      if (address.email == null || !validEmail(address.email)) {
        this.validationErrors.push("Email must be set and valid");
      }

      if (address.phone == null || !validPhone(address.phone)) {
        this.validationErrors.push(
          "Phone must be set and valid like '+490913132587'"
        );
      }
    },
  },
};
</script>
