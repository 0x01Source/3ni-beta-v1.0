<template>
  <div class="bg-black">
    <div class="animate-in">
      <div class="background-container bg-black bg-cover bg-center min-h-screen"
        :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="overlay"></div>
        <div class="relative min-h-screen bg-cover bg-center">
          <section class="relative py-16">
            <div class="container mx-auto px-4">
              <div class="flex flex-col min-w-0 break-words w-full mb-6 rounded-3xl">
                <div class="px-6 py-4 mx-auto">
                  <!-- Skeleton Loader -->
                  <div v-if="loading" class="w-full mt-5">
                    <div class="skeleton mx-auto h-40 w-40 bg-gray-300 shrink-0 rounded-full mb-2"></div>
                    <div class="items-center mb-1">
                      <div class="mb-1">
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-40 mb-2"></div>
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-40 mb-2"></div>
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-30 mb-2"></div>
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-50 mb-2"></div>
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-40 mb-2"></div>
                        <div class="skeleton mx-auto bg-gray-300 h-8 w-56 mb-2"></div>
                      </div>
                    </div>
                    <div class="skeleton mx-auto bg-gray-300 h-40 w-full"></div>
                  </div>

                  <!-- Actual Content -->
                  <div v-else-if="profile">
                    <navbar-component v-if="isLoggedIn" class="bg-black bg-opacity-30">
                    </navbar-component>
                    <div class="mt-5">
                      <div v-if="isLoggedIn" :profile="profile" class="absolute">
                        <!-- Open Modal Button -->
                        <button
                          class="btn h-12 w-12 ml-4 lg:mt-2 lg:ml-80 p-0 rounded-full text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200"
                          @click="showModal">
                          <i class="fa-solid fa-palette fa-2xl"></i>
                        </button>
                        <!-- Modal for Changing Background -->
                        <dialog id="background-modal" class="modal">
                          <div class="modal-box bg-black text-white">
                            <form @submit.prevent="saveBackgroundImage">
                              <button type="button"
                                class="btn btn-sm btn-circle btn-ghost absolute hover:bg-red-600 right-2 top-2"
                                @click="closeModal">
                                ✕
                              </button>
                              <h3 class="text-lg font-bold">
                                Choose Background Image
                              </h3>
                              <div class="grid grid-cols-3 gap-1 py-2">
                                <div v-for="image in images" :key="image" class="relative">
                                  <img :src="image" @click="selectImage(image)"
                                    class="cursor-pointer w-40 h-20 rounded-lg" :class="{
                                      'border-[#dfa027] border-2':
                                        image === selectedImage,
                                    }" />
                                </div>
                              </div>
                              <button type="submit"
                                class="text-black bg-[#dfa027] hover:opacity-80 font-medium rounded-lg text-sm px-4 py-3 mt-2 text-center">
                                Change Background
                              </button>
                            </form>
                          </div>
                        </dialog>
                      </div>

                      <information-component :profile="profile"></information-component>
                      <social-component :profile="profile"></social-component>
                      <links-component :profile="profile"></links-component>
                    </div>
                  </div>

                  <!-- Handle No Data Case -->
                  <div v-else>
                    <p class="text-red-600">
                      No profile data available. please Try Again
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarComponent from "@/components/NavbarComponent.vue";
import InformationComponent from "@/components/ProfilePage/InformationComponent.vue";
import SocialComponent from "@/components/ProfilePage/SocialComponent.vue";
import LinksComponent from "@/components/ProfilePage/LinksComponent.vue";

export default {
  components: {
    NavbarComponent,
    InformationComponent,
    SocialComponent,
    LinksComponent,
  },
  data() {
    return {
      profile: null,
      isLoggedIn: false,
      loading: true,
      backgroundImage: localStorage.getItem("backgroundImage") || "",
      images: [
        require("@/assets/background/blur.jpeg"),
        require("@/assets/background/city.jpg"),
        require("@/assets/background/forest.jpg"),
        require("@/assets/background/smoke.jpg"),
        require("@/assets/background/red.jpg"),
        require("@/assets/background/stars.jpg"),
      ],
      selectedImage: localStorage.getItem("backgroundImage") || "",
    };
  },
  async created() {
    await this.checkAuthentication();
    await this.fetchProfile();
  },
  watch: {
    "$route.params.username": async function () {
      await this.fetchProfile();
    },
  },
  methods: {
    async checkAuthentication() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/auth/users/me/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      } catch (error) {
        this.isLoggedIn = false;
      }
    },
    async fetchProfile() {
      this.loading = true;
      try {
        const response = await axios.get(
          `/api/profiles/${this.$route.params.username}/`
        );
        this.profile = response.data;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        this.profile = null;
      } finally {
        this.loading = false;
      }
    },
    showModal() {
      document.getElementById("background-modal").showModal();
    },
    closeModal() {
      document.getElementById("background-modal").close();
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    saveBackgroundImage() {
      if (this.selectedImage) {
        this.backgroundImage = this.selectedImage;
        localStorage.setItem("backgroundImage", this.selectedImage);
        this.closeModal();
      } else {
        alert("No image selected.");
      }
    },
  },
};
</script>

<style scoped>
.background-container {
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  /* Adjust the opacity as needed */
  z-index: 0;
  /* Make sure the overlay is behind the content */
}

.relative {
  position: relative;
  z-index: 1;
  /* Ensure the content is above the overlay */
}

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
