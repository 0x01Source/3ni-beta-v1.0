<template>
  <div class="bg-black">
  <div class="animate-in ">
    <form @submit.prevent="updateProfile">
      <div class="flex justify-center mt-20">
        <div class="relative w-40 h-40">
          <img alt="Avatar" :src="profile.avatar"
            class="shadow-xl rounded-full h-full w-full align-middle border-none object-cover"
            style="margin-top: -80px" />
          <label for="dropzone-file"
            class="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 opacity-80 z-10"
            style="margin-top: -80px; width: 100%; height: 100%">
            <div class="flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span>
              </p>
            </div>
            <input @change="handleAvatarUpload" id="dropzone-file" type="file" accept="image/*" class="hidden" />
          </label>
        </div>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-2">
        <div class="relative mb-4">
          <input type="text" v-model="profile.first_name" id="first_name"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="first_name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            First Name
          </label>
        </div>
        <div class="relative mb-4">
          <input type="text" v-model="profile.last_name" id="last_name"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="last_name"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Last Name
          </label>
        </div>
        <div class="relative mb-4">
          <input type="email" v-model="profile.email" id="email"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="email"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Email
          </label>
        </div>
        <div class="relative mb-4">
          <input type="text" v-model="profile.slug" id="slug"
            class="block px-4 py-4 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " disabled />
          <label for="slug"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Slug
          </label>
        </div>
        <div class="relative mb-4">
          <input type="date" v-model="profile.date_of_birth" id="date_of_birth"
            class="block px-4 py-4 pt-4 w-full text-sm bg-white bg-opacity-20 text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="date_of_birth"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Date of Birth
          </label>
        </div>
        <div class="relative mb-4">
          <input type="text" v-model="profile.phone" id="phone"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="phone"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Phone
          </label>
        </div>
        <div class="relative mb-4">
          <input type="text" v-model="profile.is_prof" id="is_prof"
            class="block px-4 py-4 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " disabled />
          <label for="is_prof"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            is Prof
          </label>
        </div>
        <div class="relative mb-4">
          <input type="text" v-model="profile.cardn" id="cardn"
            class="block px-4 py-4 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " disabled />
          <label for="cardn"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            CardN
          </label>
        </div>
        <div class="relative mb-4 col-span-2">
          <input type="text" v-model="profile.description" id="description"
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for="description"
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Description
          </label>
        </div>
      </div>

      <button type="submit"
        class="btn bg-[#dfa027] hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-none py-3 px-6 rounded-lg mt-4 mb-12">
        Save Changes
      </button>
    </form>



       <!-- Loading Indicator -->
       <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#dfa027] bg-black bg-opacity-50">
        <span class="loading loading-dots loading-lg"></span>
      </div>
  
      <!-- Toast for Errors and Success -->
      <div  class="toast toast-top toast-center mt-20 z-50">
        <div v-if="showErrorToast" id="toast-danger" class="alert alert-info bg-red-700 text-white text-center" >
          <span><i class="fa-solid fa-circle-xmark text-white mr-2 fa-2xl"></i>{{ errorMessage }}</span>
        </div>
        <div v-if="showToast" id="toast-success" class="alert alert-success bg-green-700 text-white text-center ">
          <span><i class="fa-solid fa-circle-check text-white mr-2 fa-2xl"></i>Update successfully</span>
        </div>
      </div>

  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditPage",
  data() {
    return {
      profile: {
        first_name: "",
        last_name: "",
        avatar: null,
        email: "",
        slug: "",
        date_of_birth: "",
        phone: "",
        is_prof: null,
        cardn: "",
        description: "",
      },
      isLoading: false,
      showToast: false,
      showErrorToast: false,
      errorMessage: "",


    };
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get(
          `/api/profiles/${this.$route.params.username}/`
        );
        this.profile = response.data;
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    },

    handleAvatarUpload(event) {
      const file = event.target.files[0];
      this.profile.avatar = file;
    },
    async updateProfile() {
      try {
        const formData = new FormData();
        Object.keys(this.profile).forEach((key) => {
          if (this.profile[key] !== null) {
            formData.append(key, this.profile[key]);
          }
        });

        const token = localStorage.getItem("token");
        this.isLoading = true;
        await axios.put(
          `/api/profiles/${this.$route.params.username}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.showToast = true;
        setTimeout(() => (this.showToast = false), 3000);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.detail || "Error updating profile";
        this.showErrorToast = true;
        setTimeout(() => (this.showErrorToast = false), 3000);
        console.error("Error updating profile:", error);
      }finally {
    this.isLoading = false;
  }
    },
  },
  mounted() {
    this.fetchProfile();
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
