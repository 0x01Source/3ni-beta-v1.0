<template>
  <div class="bg-black ">
  <div class="">
    <div v-if="!isLoggedIn" class="bg-black h-screen text-red-600  pt-40 text-bold text-center mx-auto text-2xl font-bold">
      <div><i class="fa-solid fa-user-xmark mb-5 text-8xl"></i></div>Sorry .. you don't have access for this page.
    </div>
    <div v-else class="bg-black ">
           <navbar-component class="bg-black"></navbar-component>
           <button @click="toggleAside" class="toggle-button rounded-full hover:opacity-80 pt-4 pl-2 mt-1 lg:pl-60">
         <i class="fa-solid fa-sliders fa-lg lg:fa-xl text-[#dfa027]"></i>
       </button>
      <aside :class="{ open: isAsideOpen }" class="aside-menu pt-28 lg:w-80 text-[#dfa027]">
        <ul>
          <li @click="openComponent('EditinformationComponent')" class="hover:bg-white  hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-user fa-lg mr-2"></i> <span>Information</span>
          </li>
          <li @click="openComponent('EditsocialComponent')" class="hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-hashtag fa-lg mr-2"></i>Social Media
          </li>
          <li @click="openComponent('EditlinksComponent')" class="hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-link mr-2"></i>Links
          </li>
          <li @click="openComponent('AccounsettingsComponent')" class="hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-key fa-lg mr-2"></i>Password
          </li>
          <li @click="openComponent('GeneralsettingsComponent')" class="hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-gear fa-lg mr-2"></i>General
          </li>
          <li @click="openComponent('PrivacysettingsPage')" class="hover:bg-white hover:bg-opacity-10 rounded-lg px-2 py-3 cursor-pointer">
            <i class="fa-solid fa-user-lock fa-lg mr-2"></i>Privacy
          </li>
        </ul>
      </aside>
      <div :class="{ 'expanded': isAsideOpen }" class="component-container mx-auto h-screen lg:h-screen w-full lg:w-3/4  mt-20 pt-10">
        <EditinformationComponent v-if="currentComponent === 'EditinformationComponent'" class="lg:w-3/4 lg:px-0 px-4 mx-auto " />
        <EditsocialComponent v-if="currentComponent === 'EditsocialComponent'" class="lg:w-3/4 lg:px-0 px-4 mx-auto" />
        <EditlinksComponent v-if="currentComponent === 'EditlinksComponent'" class="lg:w-3/4 lg:px-0 px-4 mx-auto" />
        <AccounsettingsComponent v-if="currentComponent === 'AccounsettingsComponent'" class="lg:w-3/4 lg:px-0 px-4 mx-auto" />
        <GeneralsettingsComponent v-if="currentComponent === 'GeneralsettingsComponent'" class="lg:w-3/4 lg:px-0 px-4 mx-auto" />
        <PrivacysettingsPage v-if="currentComponent === 'PrivacysettingsPage'" class="lg:w-3/4 lg:px-0 px-4 mx-auto" />
      </div>
    </div>
  </div>
</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import NavbarComponent from '@/components/NavbarComponent.vue';
  import EditinformationComponent from '@/components/EditprofilePage/EditinformationComponent.vue';
  import EditsocialComponent from '@/components/EditprofilePage/EditsocialComponent.vue';
  import EditlinksComponent from '@/components/EditprofilePage/EditlinksComponent.vue';
  import GeneralsettingsComponent from "@/components/SettingsPage/GeneralsettingsComponent.vue";
  import AccounsettingsComponent from "@/components/SettingsPage/AccounsettingsComponent.vue";
  import PrivacysettingsPage from "@/components/SettingsPage/PrivacysettingsPage.vue";
  
  export default {
    name: "SettingsPage",
    props: {
    profile: {
      type: Object,
      default: null,
    },
  },

    components: {
      NavbarComponent,
      EditinformationComponent,
      EditsocialComponent,
      EditlinksComponent,
      GeneralsettingsComponent,
      AccounsettingsComponent,
      PrivacysettingsPage,
    },
  
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem("token"); 
      },
    },
  
    setup() {
      const isAsideOpen = ref(true); // Set default to true
      const currentComponent = ref(localStorage.getItem('currentComponent') || 'EditinformationComponent'); // Default to 'EditinformationComponent'
  
      function toggleAside() {
        isAsideOpen.value = !isAsideOpen.value;
      }
  
      function openComponent(componentName) {
        currentComponent.value = componentName;
        localStorage.setItem('currentComponent', componentName);
      }
  
      return {
        isAsideOpen,
        currentComponent,
        toggleAside,
        openComponent,
      };
    },
  };
  </script>
  
  <style>
  /* Base styles for the aside menu */
  .aside-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color: #000;
    padding: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }
  
  /* Open state for the aside menu */
  .aside-menu.open {
    transform: translateX(0);
  }
  
  .component-container {
    transition: margin-left 0.3s ease, width 0.3s ease;
  }
  
  /* Adjust margin and width when aside is open */
  .component-container.expanded {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
  
  /* Toggle button */
  .toggle-button {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1001; /* Ensure it's above the aside menu */
  }
  
  /* Responsive design */
  @media (min-width: 1024px) {
    .aside-menu {
      width: 350px;
    }
    
    .component-container.expanded {
      margin-left: 350px;
      width: calc(100% - 350px);
    }
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
