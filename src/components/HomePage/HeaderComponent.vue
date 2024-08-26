<template>
  <section class="px-4 pb-10 bg-[#dfa027] pt-20">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-10">
      <div class="flex flex-col lg:flex-row items-center text-center lg:text-left">
        <div class="lg:w-1/2">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-8xl">
            Everything you are. In one, simple link in bio.
          </h1>
          <p class="mb-8 text-lg font-normal text-white lg:text-xl">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center lg:justify-start sm:space-y-0">
            <router-link to="/signup">
              <a href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-amber-500 bg-white hover:opacity-80 rounded-full">
                Get started
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </router-link>
          </div>
        </div>
        <div class="lg:ml-20 mt-4 w-3/4">
          <img src="../../assets/Header.png" class="rounded-lg" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeaderHome",
};
</script>
