<template>
  <div class="navbar px-10 lg:px-80 w-full mx-auto fixed top-0 left-0 right-0 z-50">
    <div class="flex-1">
      <router-link to="/">
        <a class="btn btn-ghost text-xl w-16 h-16 p-0 rounded-full">
          <img src="../assets/logo.png" alt="Logo" class="w-16" />
        </a>
      </router-link>
    </div>
    <div class="flex-none">
      <div v-if="loading" class="flex w-52 flex-col gap-1">
        <!-- Skeleton Loader -->
        <div class="flex items-center gap-1">
          <div class="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-1">
            <div class="skeleton h-6 w-20"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Actual content -->
        <div v-if="!isLoggedIn" class="dropdown dropdown-end">
          <div>
            <router-link to="/login">
              <button
                class="text-white bg-gray-400 hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-4 py-3 text-center mr-2 btn">
                Login
              </button>
            </router-link>
            <router-link to="/signup">
              <button
                class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-3 text-center btn">
                Get Started
              </button>
            </router-link>
          </div>
        </div>
        <div v-else class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost bg-transparent hover:bg-transparent">
            <button type="button"
              class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-3 text-center">
              <i class="fa-solid fa-user mr-2"></i>{{ userData.username
              }}<i class="fa-solid fa-circle-chevron-down ml-2"></i>
            </button>
          </div>

          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-44 py-4 shadow">
            <router-link :to="{
              name: 'ProfilePage',
              params: { username: userData.username },
            }">
              <li>
                <a class="py-2"><i class="fa-solid fa-user"></i>Profile</a>
              </li>
            </router-link>
            <router-link :to="{
              name: 'SettinsPage',
              params: { username: userData.username },
            }">
              <li>
                <a class="py-2"><i class="fa-solid fa-gear"></i>Settings</a>
              </li>
            </router-link>
            <li>
              <a class="py-2" @click="logout"><i class="fa-solid fa-right-from-bracket"></i>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      profile: null,
      userData: {
        email: "",
        id: "",
        username: "",
      },
      isLoggedIn: false,
      loading: true, // Loading state
    };
  },
  created() {
    this.checkAuthentication();
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
          this.userData = response.data;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        this.isLoggedIn = false;
      } finally {
        this.loading = false; // Set loading to false once the API call is done
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>
