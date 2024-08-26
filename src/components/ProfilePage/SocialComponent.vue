<template>
  <div class="text-center mt-6">
   
 
    <div v-if="profile" class="py-2 px-4 mx-auto max-w-screen-xl">
      <div class="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-6">
        <template v-for="social in profile.social_media_links" :key="social.id">
          <button class="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200">
            <a :href="getSocialMediaUrl(social.platform, social.username)" target="_blank">
              <div class="w-12 h-12 p-0.5 rounded-full">
                <img :src="getSocialIcon(social.platform)" class="w-12" alt="" />
              </div>
            </a>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialComponent",
  props: {
    profile: {
      type: Object,
      default: null,
    },
  },

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); 
    },
  },

  methods: {
    getSocialIcon(platform) {
      switch (platform) {
        case "facebook":
          return require("@/assets/social/fb.png");
        case "twitter":
          return require("@/assets/social/x.png");
        case "instagram":
          return require("@/assets/social/instagram.png");
        case "snapchat":
          return require("@/assets/social/snapchat.png");
        case "linkedin":
          return require("@/assets/social/linkedin.png");
        case "tiktok":
          return require("@/assets/social/tiktok.png");
        default:
          return "";
      }
    },
    getSocialMediaUrl(platform, username) {
      switch (platform) {
        case "facebook":
          return `https://www.facebook.com/${username}`;
        case "twitter":
          return `https://twitter.com/${username}`;
        case "instagram":
          return `https://www.instagram.com/${username}`;
        case "snapchat":
          return `https://www.snapchat.com/add/${username}`;
        case "linkedin":
          return `https://www.linkedin.com/in/${username}`;
        case "tiktok":
          return `https://www.tiktok.com/@${username}`;
        default:
          return "#";
      }
    },
  },
};
</script>
