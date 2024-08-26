import LoginPage from "@/views/Authentication/LoginPage.vue";
import SignupPage from "@/views/Authentication/SignupPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProfilePage from "@/views/Profile/ProfilePage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "SignupPage",
    path: "/signup",
    component: SignupPage,
  },
  {
    name: "LoginPage",
    path: "/login",
    component: LoginPage,
  },
  {
    path: '/:username',
    name: 'ProfilePage',
    component: ProfilePage,
  },


  {
    name: "SettinsPage",
    path: "/:username/settings",
    component: SettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
