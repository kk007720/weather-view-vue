<template>
  <section class="flex flex-col min-h-screen">
    <HeaderBar />
    <router-view></router-view>
    <Footer />
  </section>
</template>
<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style></style>
