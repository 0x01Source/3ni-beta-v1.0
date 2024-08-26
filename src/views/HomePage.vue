<template>
    <div class="bg-black" >
    <div class="animate-in">
        <navbar-component class="bg-white"></navbar-component>
        <header-component></header-component>
        <carousel-component></carousel-component>
        <slat-component></slat-component>
        <cards-component></cards-component>
        <store-component></store-component>
        <footer-component class="bg-orange-50 pb-5"></footer-component>
    </div>
</div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import HeaderComponent from "@/components/HomePage/HeaderComponent.vue";
import CarouselComponent from "@/components/HomePage/CarouselComponent.vue";
import SlatComponent from "@/components/HomePage/SlatComponent.vue";
import CardsComponent from "@/components/HomePage/CardsComponent.vue";
import StoreComponent from "@/components/HomePage/StoreComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
    name: "HomePage",
    components: {
        NavbarComponent,
        HeaderComponent,
        CarouselComponent,
        SlatComponent,
        CardsComponent,
        StoreComponent,
        FooterComponent,
    },
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
</style>