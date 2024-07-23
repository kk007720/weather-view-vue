<template>
  <div class="w-full bg-[#53b478] py-6 px-20 flex justify-between items-center">
    <router-link to="/">
      <div class="text-white text-3xl font-bold">天氣概況</div></router-link
    >

    <router-link :to="currentRoute.path === '/settings' ? '/' : '/settings'">
      <div
        class="w-8 h-8 text-white cursor-pointer flex items-center justify-center"
      >
        <component
          :is="currentRoute.path === '/settings' ? X : Settings"
          class="w-full h-full"
        />
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { Settings, X } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const currentRoute = useRoute();
</script>

<style></style>
