<template>
  <div v-if="profile" class="text-center">
    <div class="flex justify-center">
      <div class="relative">
        <div  tabindex="0" role="button" class="w-40 circle avatar">
          <div class="rounded-full">
            <img :src="profile.avatar" class="" alt="User Avatar" />
          </div>
        </div>

        
      </div>
    </div>
    <div  class="text-center mt-1 text-white">



      <h3 class="text-3xl font-semibold leading-normal text-blueGray-700">
        {{ profile.first_name }} {{ profile.last_name }}

      </h3>
      <div class="text-sm font-bold leading-normal mb-4 text-blueGray-700">
        @{{ profile.slug }}
      </div>
      <div   class="text-black">
<button class="btn " onclick="my_modal_3.showModal()">Description</button>
<dialog id="my_modal_3" class="modal">
  <div  class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost hover:bg-red-600  hover:text-white absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-lg font-bold">Description</h3>
    <p class="py-4 ">{{profile.description}}</p>
  </div>
</dialog>


</div>


    </div>


  </div>
</template>

<script>
export default {
  name: "InformationComponent",
  props: {
    profile: {
      type: Object,
      default: null,
    },
  },
};
</script>
