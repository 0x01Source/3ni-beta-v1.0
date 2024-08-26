<template>
  <div class="bg-black">
    <div class="animate-in">
      <div class="mb-10">
        <h1 class="text-[#dfa027] mb-2 text-2xl">General Settings</h1>
        <hr class="w-60 h-1 mb-4 bg-[#dfa027] border-0 rounded" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="mr-2">
          <label for="language" class="block text-sm font-medium mb-2 ml-2 text-white">Language:</label>
          <select id="language"
            class="block px-4 py-4 pt-4 w-full text-sm text-[#dfa027] bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer">
            <option value="US">English US</option>
            <option value="CA">English UK</option>
            <option value="FR">Arabic</option>
            <option value="DE">Fancies</option>
          </select>
        </div>

        <div>
          <label for="country" class="block text-sm font-medium mb-2 ml-2 text-white">Country:</label>
          <select id="country"
            class="block px-4 py-4 pt-4 w-full text-sm text-[#dfa027] bg-transparent rounded-xl border-1 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-[#dfa027] peer">
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium my-2 ml-2 text-white">Gender:</label>
          <ul class="flex space-x-4">
            <li>
              <input type="radio" id="male" name="gender" value="male" class="hidden peer" />
              <label for="male" class="gender-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-person fa-xl mr-1"></i>
                <div class="text-lg font-semibold">Male</div>
              </label>
            </li>
            <li>
              <input type="radio" id="female" name="gender" value="female" class="hidden peer" />
              <label for="female" class="gender-option peer-checked:bg-[#dfa027] peer-checked:text-white">
                <i class="fa-solid fa-person-dress fa-xl mr-1"></i>
                <div class="text-lg font-semibold">Female</div>
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
  name: "GeneralsettingsComponent",
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

.gender-option {
  @apply flex items-center p-4 bg-black border-2 border-gray-600 text-white hover:bg-[#dfa027] hover:text-black rounded-lg cursor-pointer transition-colors duration-300;
}
</style>
