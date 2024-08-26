import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "flowbite";
import axios from "axios";

axios.defaults.baseURL = "http://197.134.253.234:9100";

createApp(App).use(store).use(router).mount("#app");
