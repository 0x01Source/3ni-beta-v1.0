<template>
    <div>
        <signup-component></signup-component>
    </div>
</template>

<script>
import SignupComponent from "@/components/Authentication/SignupComponent.vue";

export default {
    name: "SignupPage",
    components: {
        SignupComponent,
    },
};
</script>
