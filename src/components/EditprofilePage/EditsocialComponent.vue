<template>
  <div class="bg-black">
  <div class="animate-in">
    <div class="mb-10">
    <h1 class="text-[#dfa027] mb-2  text-2xl">Edit Social Media</h1>
    <hr class="w-60 h-1  mb-4 bg-[#dfa027] border-0 rounded  ">

  </div>
    <div v-if="profile && profile.social_media_links">
      <div v-for="(social, index) in profile.social_media_links" :key="social.id"
        class="mb-4 flex items-center space-x-4">
        <select v-model="social.platform" class="block px-4 py-4 pt-4 w-1/2 text-sm text-[#dfa027] bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer">
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="snapchat">Snapchat</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
        </select>
        <div class="relative  w-1/2">
          <input type="text" v-model="social.username" id=""
            class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
            placeholder=" " />
          <label for=""
            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
             User Name
          </label>
        </div>
        <button @click="removeSocial(index, social.id)"
          class="border-2 border-gray-600 hover:bg-red-600 text-red-600 hover:text-white py-3 px-5 rounded-lg">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <button @click="addSocial()"
      class="btn bg-black hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-gray-600 border-2 hover:border-none py-3 px-6 rounded-lg mt-4 mb-12 mr-2">
        Add Social Media Link
      </button>
      <button @click="updateSocialMedia()"
      class="btn bg-[#dfa027] hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-none py-3 px-6 rounded-lg mt-4 mb-12">
        Save Changes
      </button>
    </div>



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
  data() {
    return {
      profile: {
        social_media_links: [],
      },
      isLoading: false,
      showToast: false,
      showErrorToast: false,
      errorMessage: "",
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      this.isLoading = true;
      axios
        .get(`/api/profiles/${this.$route.params.username}/`)
        .then((response) => {
          this.profile = response.data;
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        })
        .finally(() => {
    this.isLoading = false;
  });
    },
    addSocial() {
      this.profile.social_media_links.push({
        platform: "facebook",
        username: "",
      });
    },
    removeSocial(index) {
      const social = this.profile.social_media_links[index];

      if (!this.socialsToDelete) {
        this.socialsToDelete = [];
      }
      this.socialsToDelete.push(social);

      this.profile.social_media_links.splice(index, 1);
    },

    updateSocialMedia() {
  const token = localStorage.getItem("token");
  this.isLoading = true;

  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requests = [];

    // Handle deletion of social media links
    if (this.socialsToDelete && this.socialsToDelete.length) {
      this.socialsToDelete.forEach((social) => {
        if (social.id) {
          const request = axios.delete(`/api/socialmedia/${social.id}/`, { headers });
          requests.push(request);
        }
      });
      this.socialsToDelete = [];
    }

    // Handle updates and additions of social media links
    this.profile.social_media_links.forEach((social) => {
      let request;
      if (social.id) {
        // Existing link - perform update
        request = axios.put(
          `/api/socialmedia/${social.id}/`,
          { platform: social.platform, username: social.username },
          { headers }
        );
      } else {
        // New link - perform addition
        request = axios.post(
          "/api/socialmedia/",
          { platform: social.platform, username: social.username },
          { headers }
        );
      }
      requests.push(request);
    });

    // Execute all requests
    Promise.all(requests)
      .then(() => {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      })
      .catch((error) => {
        this.showErrorToast = true;
        this.errorMessage = "Failed to update social media links. Please try again.";
        console.error("Error updating social media links:", error);
        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}


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
