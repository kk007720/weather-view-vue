<template>
  <!-- 地點卡片 -->
  <div
    class="border-2 border-[#53b478] rounded bg-white flex gap-3 items-center justify-between"
  >
    <div class="p-4">{{ city }}, {{ country }}</div>
    <div class="mr-4 cursor-pointer" @click="handleClick">
      <Trash2 class="w-6 h-6" />
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const { id, country, city } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
import { Trash2 } from 'lucide-vue-next';

const emit = defineEmits(['handleDeleteCountry']);
const handleClick = () => {
  emit('handleDeleteCountry', id);
};
</script>

<style></style>
