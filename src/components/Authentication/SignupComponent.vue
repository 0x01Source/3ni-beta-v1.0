<template>
  <div class="bg-black h-screen flex flex-col">
    <!-- Content -->
    <div class="animate-in flex-1 overflow-y-auto">
      <div class="lg:w-1/4 w-3/4 mx-auto p-4">
        <!-- Logo and Header -->
        <div class="logo pt-10 pb-5">
          <img src="../../assets/logo.png" width="120px" class="mx-auto" alt="Logo" />
        </div>

        <div class="mb-8 text-center">
          <div
            class="leading-none px-2 inline-block italic text-3xl font-bold text-white tracking-wide transform translate-y-1/2">
            Join to us.
          </div>
        </div>

        <!-- Google Signup Button -->
        <div class="google flex flex-col items-center">
          <button
            class="w-full max-w-xs font-bold shadow-sm rounded-3xl py-3 bg-gray-200 hover:opacity-80 text-black flex items-center justify-center transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500">
            <div class="bg-white p-2 rounded-full">
              <img src="../../assets/social/google.png" width="20px" alt="" />
            </div>
            <span class="ml-4">Sign Up with Google</span>
          </button>
        </div>

        <!-- Create New Account Header -->
        <div class="my-10 text-center">
          <div
            class="leading-none px-2 inline-block text-xl font-bold text-white tracking-wide transform translate-y-1/2">
            Create New Account
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="inputs mt-5">
          <div class="relative mb-4">
            <input type="text" id="username" v-model="username" @blur="validateUsername"
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" " />
            <label for="username" :class="{ 'text-red-500': usernameError }"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              {{ usernameError ? usernameError : "UserName" }}
            </label>
          </div>

          <div class="relative mb-4">
            <input type="email" id="email" v-model="email" @blur="validateEmail"
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" " />
            <label for="email" :class="{ 'text-red-500': emailError }"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              {{ emailError ? emailError : "Email" }}
            </label>
          </div>

          <div class="relative mb-4">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" @blur="validatePassword"
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" " />
            <label for="password" :class="{ 'text-red-500': passwordError }"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              {{ passwordError ? passwordError : "Password" }}
            </label>
            <button @click="toggleShowPassword" class="absolute right-4 top-4 text-gray-500 hover:text-gray-300">
              <i v-if="showPassword" class="fa-regular fa-eye-slash fa-lg text-gray-400"></i>
              <i v-else class="fa-regular fa-eye fa-lg text-gray-400"></i>
            </button>
          </div>

          <div class="relative mb-4">
            <input :type="showRePassword ? 'text' : 'password'" id="re_password" v-model="rePassword"
              @blur="validateRePassword"
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" " />
            <label for="re_password" :class="{ 'text-red-500': rePasswordError }"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              {{ rePasswordError ? rePasswordError : "Confirm Password" }}
            </label>
            <button @click="toggleShowRePassword" class="absolute right-4 top-4 text-gray-500 hover:text-gray-300">
              <i v-if="showRePassword" class="fa-regular fa-eye-slash fa-lg text-gray-400"></i>
              <i v-else class="fa-regular fa-eye fa-lg text-gray-400"></i>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button @click="validateAndSubmit"
            class="w-full text-white bg-gradient-to-r from-yellow-200 via-[#dfa027] to-[#dfa027] hover:bg-gradient-to-bl hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-red-100 font-bold rounded-xl text-lg px-8 py-3 text-center mb-2">
            SignUp
          </button>
        </div>
      </div>

      <div class="mx-auto justify-center flex py-2 text-sm underline text-gray-600">
        <router-link to="/login"><a>I Already have Account .. Login</a></router-link>
      </div>
      <footer-component></footer-component>
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#dfa027] bg-black bg-opacity-50">
      <span class="loading loading-dots loading-lg"></span>
    </div>

    <!-- Toast for Errors and Success -->
    <div class="toast toast-top toast-center" v-if="showToast">
      <div class="alert alert-info bg-red-700 text-white text-center" v-if="error">
        <span><i class="fa-solid fa-circle-xmark text-white mr-2 fa-2xl"></i>{{ error }}</span>
      </div>
      <div class="alert alert-success bg-green-700 text-white text-center" v-if="success">
        <span><i class="fa-solid fa-circle-check text-white mr-2 fa-2xl"></i>{{ success }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FooterComponent from "../FooterComponent.vue";

export default {
  name: "SignupComponent",
  components: {
    FooterComponent,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      rePassword: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      rePasswordError: "",
      error: "",
      success: "",
      showToast: false,
      isLoading: false,
      showPassword: false,
      showRePassword: false,
    };
  },
  methods: {
    validateUsername() {
      if (!this.username) {
        this.usernameError = "Please fill this field";
      } else {
        this.usernameError = "";
      }
    },
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Invalid email";
      } else if (!this.email) {
        this.emailError = "Please fill this field";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      if (this.password.length < 8) {
        this.passwordError = "At least 8 characters";
      } else if (!this.password) {
        this.passwordError = "Please fill this field";
      } else {
        this.passwordError = "";
      }
    },
    validateRePassword() {
      if (this.rePassword !== this.password) {
        this.rePasswordError = "Passwords do not match";
      } else if (!this.rePassword) {
        this.rePasswordError = "Please fill this field";
      } else {
        this.rePasswordError = "";
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowRePassword() {
      this.showRePassword = !this.showRePassword;
    },

    validateAndSubmit() {
      this.validateUsername();
      this.validateEmail();
      this.validatePassword();
      this.validateRePassword();

      if (
        this.usernameError ||
        this.emailError ||
        this.passwordError ||
        this.rePasswordError
      )
        return;

      this.isLoading = true;

      axios
        .post("/auth/users/", {
          username: this.username,
          email: this.email,
          password: this.password,
          re_password: this.rePassword,
        })
        .then((response) => {
          this.success = "User created successfully";
          this.error = "";
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
            this.success = "";
            this.$router.push("/login"); // Redirect to login page after toast disappears
          }, 3000);
        })
        .catch((error) => {
          this.error = "Error creating user";
          this.success = "";
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
            this.error = "";
          }, 5000);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.animate-in {
  animation: animate-in 0.9s ease-in-out;
}

@keyframes animate-in {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
