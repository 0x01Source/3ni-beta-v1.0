<template>
  <div class="bg-black">
    <div class="animate-in">
      <div v-if="profile && profile.links">
        <div class="mb-10">
          <h1 class="text-[#dfa027] mb-2 text-2xl">Edit Account Links</h1>
          <hr class="w-60 h-1 mb-4 bg-[#dfa027] border-0 rounded" />
        </div>
        <div
          v-for="(link, index) in profile.links"
          :key="link.id"
          class="mb-4 flex items-center space-x-4"
        >
          <div class="relative w-1/2">
            <input
              type="text"
              v-model="link.title"
              id=""
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" "
            />
            <label
              for=""
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Link Title
            </label>
          </div>
          <div class="relative w-1/2">
            <input
              type="text"
              v-model="link.url"
              id=""
              class="block px-4 py-4 pt-4 w-full text-sm text-white bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer"
              placeholder=" "
            />
            <label
              for=""
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin- bg-black px-2 peer-focus:px-4 peer-focus:text-[#dfa027] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Link URL
            </label>
          </div>
          
          <button
            @click="removeLink(index, link.id)"
            class="border-2 border-gray-600 hover:bg-red-600 text-red-600 hover:text-white py-3 px-5 rounded-lg"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          
        </div>

        <button
          @click="addLink()"
          class="btn bg-black hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-gray-600 border-2 hover:border-none py-3 px-6 rounded-lg mt-4 mb-12 mr-2"
        >
          Add Link
        </button>
        <button
          @click="updateLinks()"
          class="btn bg-[#dfa027] hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-none py-3 px-6 rounded-lg mt-4 mb-12"
        >
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
          <span><i class="fa-solid fa-circle-xmark text-white mr-2 fa-2xl"></i>Error in Updating check your data</span>
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
        links: [],
      },
      linksToDelete: [],
      isLoading: false,
      showToast: false,
      showErrorToast: false,
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      this.isLoading = true;
      axios
        .get(`/api/profiles/${this.$route.params.username}`)
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
    addLink() {
      this.profile.links.push({ title: "", url: "", icon: null });
    },
    removeLink(index, linkId) {
      this.profile.links.splice(index, 1);

      if (!this.linksToDelete) {
        this.linksToDelete = [];
      }
      this.linksToDelete.push({ id: linkId });
    },
    validateLinks() {
      return this.profile.links.every(
        (link) => link.title.trim() !== "" && link.url.trim() !== ""
      );
    },
    updateLinks() {
  if (!this.validateLinks()) {
    this.showErrorToast = true;
    setTimeout(() => {
      this.showErrorToast = false;
    }, 3000);
    return;
  }

  const token = localStorage.getItem("token");
  this.isLoading = true;
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Deleting links that are marked for deletion
    if (this.linksToDelete.length) {
      const deletePromises = this.linksToDelete.map((link) => {
        return axios
          .delete(`http://197.134.253.234:9100/api/links/${link.id}/`, {
            headers,
          })
          .then(() => {
            console.log(`Link with id ${link.id} deleted successfully.`);
          })
          .catch((error) => {
            console.error(`Error deleting link with id ${link.id}:`, error);
            this.showErrorToast = true;
          });
      });

      Promise.all(deletePromises).then(() => {
        this.linksToDelete = [];
      });
    }

    // Updating existing links and adding new ones
    const updatePromises = this.profile.links.map((link) => {
      if (link.id) {
        // Update existing link
        return axios
          .put(`http://197.134.253.234:9100/api/links/${link.id}/`, link, {
            headers,
          })
          .then(() => {
            console.log(`Link with id ${link.id} updated successfully.`);
          })
          .catch((error) => {
            console.error(`Error updating link with id ${link.id}:`, error);
            this.showErrorToast = true;
          });
      } else {
        // Add new link
        return axios
          .post("http://197.134.253.234:9100/api/links/", link, { headers })
          .then((response) => {
            console.log("New link added successfully.");
            // Update the link's id with the id returned from the server
            link.id = response.data.id;
          })
          .catch((error) => {
            console.error("Error adding new link:", error);
            this.showErrorToast = true;
          });
      }
    });

    Promise.all(updatePromises)
      .then(() => {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      })
      .catch(() => {
        this.showErrorToast = true;
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
/* Your existing styles here */
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

