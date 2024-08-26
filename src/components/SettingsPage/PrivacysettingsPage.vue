<template>
  <div class="bg-black">
    <div class="animate-in">
      <div class="mb-10">
        <h1 class="text-[#dfa027] mb-2 text-2xl">Privacy Settings</h1>
        <hr class="w-60 h-1 mb-4 bg-[#dfa027] border-0 rounded" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="col-span-2 mb-2">
          <label class="block text-sm font-medium mb-2 ml-2 text-white">Your Profile:</label>
          <ul class="flex space-x-4">
            <li>
              <input type="radio" id="public" name="profile" value="public" class="hidden peer" />
              <label for="public" class="post-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-user-group mr-1"></i>
                <div class="text-lg font-semibold">Public</div>
              </label>
            </li>
            <li>
              <input type="radio" id="private" name="profile" value="private" class="hidden peer" />
              <label for="private" class="post-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-user-lock mr-1"></i>
                <div class="text-lg font-semibold">Private</div>
              </label>
            </li>
          </ul>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium mb-2 ml-2 text-white">How can see your Posts:</label>
          <ul class="grid grid-cols-1 lg:grid-cols-7 gap-3">
            <li>
              <input type="radio" id="everyone" name="post" value="everyone" class="hidden peer" />
              <label for="everyone" class="post-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-users mr-1"></i>
                <div class="text-lg font-semibold">Everyone</div>
              </label>
            </li>
            <li>
              <input type="radio" id="followers" name="post" value="followers" class="hidden peer" />
              <label for="followers" class="post-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-user-group mr-1"></i>
                <div class="text-lg font-semibold">Followes</div>
              </label>
            </li>
            <li>
              <input type="radio" id="only" name="post" value="only" class="hidden peer" />
              <label for="only" class="post-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-user-large mr-1"></i>
                <div class="text-lg font-semibold">me</div>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <button
        class="btn bg-[#dfa027] hover:bg-[#dfa027] hover:bg-opacity-80 text-white border-none py-3 px-6 rounded-lg mt-4 mb-12">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacysettingsComponent",
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

.profile-option {
  @apply flex items-center p-4 bg-black border-2 border-gray-600 text-white hover:bg-[#dfa027] hover:text-black rounded-lg cursor-pointer transition-colors duration-300;
}

.post-option {
  @apply flex items-center p-4 bg-black border-2 border-gray-600 text-white hover:bg-[#dfa027] hover:text-black rounded-lg cursor-pointer transition-colors duration-300;
}
</style>
