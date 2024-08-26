<template>
    <div class="bg-black h-screen flex flex-col">
      <!-- Content -->
      <div class="animate-in flex-1 overflow-y-auto" >
        <div class="lg:w-1/4 w-3/4 mx-auto p-4">
          <!-- Logo and Header -->
          <div class="logo pt-10 pb-5">
            <img src="../../assets/logo.png" width="120px" class="mx-auto" alt="Logo" />
          </div>
  
          <div class=" text-center">
            <div class="leading-none px-2 inline-block italic text-3xl font-bold text-white tracking-wide transform translate-y-1/2 mb-4">
              Login.
            </div>
          </div>
  
          <!-- Google Login Button -->
          <div class="google flex flex-col items-center my-8">
            <button class="w-full max-w-xs font-bold shadow-sm rounded-3xl py-3 bg-gray-200 hover:opacity-80 text-black flex items-center justify-center transition-opacity duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-500">
              <div class="bg-white p-2 rounded-full">
                <img src="../../assets/social/google.png" width="20px" alt="">
              </div>
              <span class="ml-4">LogIn with Google</span>
            </button>
          </div>

           <!-- Create New Account Header -->
           <div class="my-10 text-center">
            <div class="leading-none px-2 inline-block text-xl font-bold text-white tracking-wide transform translate-y-1/2">
              Login with UserName
            </div>
          </div>
  
          <!-- Login Form -->
          <div class="inputs mt-5">
            <div class="relative mb-4">
              <input type="text" id="username" v-model="username" @blur="validateUsername" class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer" placeholder=" " />
              <label for="username" :class="{ 'text-red-500': usernameError }" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {{ usernameError ? usernameError : 'UserName' }}
              </label>
            </div>
  
            <div class="relative mb-4">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" @blur="validatePassword" class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer" placeholder=" " />
              <label for="password" :class="{ 'text-red-500': passwordError }" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                {{ passwordError ? passwordError : 'Password' }}
              </label>
              <button @click="toggleShowPassword" class="absolute right-4 top-4 text-gray-500 hover:text-gray-300">
                <i v-if="showPassword" class="fa-regular fa-eye-slash fa-lg text-gray-400"></i>
                <i v-else class="fa-regular fa-eye fa-lg text-gray-400"></i>
              </button>
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="flex justify-center">
            <button @click="validateAndSubmit" class="w-full text-white bg-gradient-to-r from-yellow-200 via-[#dfa027] to-[#dfa027] hover:bg-gradient-to-bl hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-red-100 font-bold rounded-xl text-lg px-8 py-3 text-center mb-2">Login</button>
          </div>

          <div class="mx-auto justify-center flex py-2 text-sm underline text-gray-600">
                                <router-link to="/signup"><a>I want to Register .. Signup</a></router-link>
                            </div>
        </div>
        <footer-component class="lg:mt-28 mt-14"></footer-component>
      </div>
  
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#dfa027] bg-black bg-opacity-50">
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
    name: "SignIn",
    components: {
      FooterComponent,
    },
    data() {
      return {
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        error: '',
        success: '',
        showToast: false,
        isLoading: false,
        showPassword: false,
      };
    },
    methods: {
      validateUsername() {
        if (!this.username) {
          this.usernameError = 'Please fill this field';
        } else {
          this.usernameError = '';
        }
      },
      validatePassword() {
        if (!this.password) {
          this.passwordError = 'Please fill this field';
        } else {
          this.passwordError = '';
        }
      },
      toggleShowPassword() {
        this.showPassword = !this.showPassword;
      },
      validateAndSubmit() {
  this.validateUsername();
  this.validatePassword();

  if (this.usernameError || this.passwordError) return;

  this.isLoading = true;

  axios.post('/auth/jwt/create/', {
    username: this.username,
    password: this.password,
  })
  .then(response => {
    const token = response.data.token; 
    this.success = 'Logged in successfully';
    this.error = '';
    this.showToast = true;
    this.isLoading = false;

    // Store the token
    localStorage.setItem("token", response.data.access);

    // Set the default header for subsequent requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setTimeout(() => {
      this.showToast = false;
      this.success = '';
      this.$router.push("/");
    }, 3000);
  })
  .catch(error => {
    this.error = 'Your data is incorrect';
    this.success = '';
    this.showToast = true;
    this.isLoading = false;
    setTimeout(() => {
      this.showToast = false;
      this.error = '';
    }, 5000);
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