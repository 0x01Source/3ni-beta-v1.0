<template>
    <div>
        <login-component></login-component>
    </div>
</template>

<script>
import LoginComponent from "@/components/Authentication/LoginComponent.vue";

export default {
    name: "LoginPage",
    components: {
        LoginComponent,
    },
};
</script>
