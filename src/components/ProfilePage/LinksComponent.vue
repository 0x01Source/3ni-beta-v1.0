<template>
  <div class="text-center mt-6">
    <div v-if="profile" class="py-2 px-4 mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        <template v-for="link in profile.links" :key="link.id">
          <button class="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200">
            <a :href="link.url" target="_blank">
              <div class="relative block overflow-hidden rounded-lg border-b-4 border-[#dfa027] shadow-lg">
                <div v-if="link.icon">
                  <img :src="link.icon" class="w-full h-48 object-cover" alt="" />
                </div>
                <div v-if="!link.icon" class="bg-white h-16"></div>
                <div class="absolute bottom-0 left-0 right-0 p-1">
                  <div class="text-center">
                    <h4 class="text-white text-xl font-semibold mb-2">
                      {{ link.title }}
                    </h4>
                    <h4 v-if="!link.icon" class="text-black text-xl font-semibold mb-3">
                      {{ link.title }}
                    </h4>
                  </div>
                </div>
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
  name: "LinksComponent",
  props: {
    profile: {
      type: Object,
      default: null,
    },
  },
};
</script>
