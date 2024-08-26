<template>
  <div class="bg-black">
    <div class="animate-in">
      <div class="mb-10">
        <h1 class="text-[#dfa027] mb-2 text-2xl">Change Password</h1>
        <hr class="w-60 h-1 mb-4 bg-[#dfa027] border-0 rounded" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Current Password Field -->
        <div class="relative mb-4 mr-2">
          <input :type="showPassword ? 'text' : 'password'" id="currentPassword" v-model="currentPassword"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="currentPassword"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Current Password
          </label>
          <button @click="toggleShowPassword" class="absolute right-4 top-4 text-gray-500 hover:text-gray-300">
            <i v-if="showPassword" class="fa-regular fa-eye-slash fa-lg text-gray-400"></i>
            <i v-else class="fa-regular fa-eye fa-lg text-gray-400"></i>
          </button>
        </div>

        <!-- New Password Field -->
        <div class="relative mb-4">
          <input :type="showRePassword ? 'text' : 'password'" id="newPassword" v-model="newPassword"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="newPassword"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            New Password
          </label>
          <button @click="toggleShowRePassword" class="absolute right-4 top-4 text-gray-500 hover:text-gray-300">
            <i v-if="showRePassword" class="fa-regular fa-eye-slash fa-lg text-gray-400"></i>
            <i v-else class="fa-regular fa-eye fa-lg text-gray-400"></i>
          </button>
        </div>
      </div>
      <!-- Save Changes Button -->
      <button @click="changePassword"
        class="btn bg-[#dfa027] hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-none py-3 px-6 rounded-lg mt-4 mb-12">
        Save Changes
      </button>

      <!-- Toast for Errors and Success -->
      <div class="toast toast-top toast-center mt-20 z-50">
        <div v-if="showErrorToast" id="toast-danger" class="alert alert-info bg-red-700 text-white text-center">
          <span><i class="fa-solid fa-circle-xmark text-white mr-2 fa-2xl"></i>Error in Updating check your data</span>
        </div>
        <div v-if="showSuccessToast" id="toast-success" class="alert alert-success bg-green-700 text-white text-center">
          <span><i class="fa-solid fa-circle-check text-white mr-2 fa-2xl"></i>Update successfully</span>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#dfa027] bg-black bg-opacity-50">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountsettingsComponent",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      showPassword: false,
      showRePassword: false,
      showErrorToast: false,
      showSuccessToast: false,
      isLoading: false,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowRePassword() {
      this.showRePassword = !this.showRePassword;
    },
    changePassword() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        this.isLoading = true;

        axios
          .post(
            "/auth/users/set_password/",
            {
              current_password: this.currentPassword,
              new_password: this.newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            this.showSuccessToast = true;
            this.showErrorToast = false;

            setTimeout(() => {
              this.showSuccessToast = false;
              // Clear the token and redirect to the login page
              localStorage.removeItem("token");
              this.$router.push("/login");
            }, 3000); // Hide the toast after 3 seconds
          })
          .catch((error) => {
            this.showErrorToast = true;
            this.showSuccessToast = false;
            this.errorMessage =
              error.response?.data?.detail || "Failed to change password";
            setTimeout(() => {
              this.showErrorToast = false;
            }, 3000); // Hide the toast after 3 seconds
          })
          .finally(() => {
            this.isLoading = false;
          });

        this.currentPassword = "";
        this.newPassword = "";
      } catch (error) {
        console.error(error);
      }
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
