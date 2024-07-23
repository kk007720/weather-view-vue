<template>
  <div class="border-2 border-[#53b478] rounded">
    <div class="bg-[#53b478] px-6 py-3">
      <span class="text-white text-2xl">{{ city }}, {{ country }}</span>
    </div>
    <div class="bg-white">
      <div class="flex justify-between px-6 items-center py-3">
        <!-- Icon變化邏輯 -->
        <component :is="weatherIcon" class="w-16 h-16" />
        <div class="text-2xl font-bold">{{ weather.temp }}°C</div>
      </div>
      <div class="text-center py-3 font-semibold">
        Feels like {{ weather.feels_like }}°C
      </div>
      <div class="grid grid-cols-2 px-6 gap-4 pb-4 pt-4">
        <div class="flex gap-4">
          <Gauge /><span>{{ weather.wind_speed }}</span>
        </div>
        <div class="flex gap-4">
          <Droplets /><span>{{ weather.humidity }}%</span>
        </div>
        <div class="flex gap-4">
          <Sunrise /><span>{{ formatTime(weather.sunrise) }}</span>
        </div>
        <div class="flex gap-4">
          <Sunset /><span>{{ formatTime(weather.sunset) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Wind,
  Gauge,
  Droplets,
  Sunrise,
  Sunset,
  Sun,
  CloudRain,
} from 'lucide-vue-next';
import { defineProps, computed } from 'vue';

const props = defineProps({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  weather: {
    type: Object,
    required: true,
  },
});

const formatTime = (timestamp) => {
  console.log(timestamp);
  const date = new Date(timestamp * 1000); // 将秒转换为毫秒
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const weatherIcon = computed(() => {
  if (props.temperature > 30) {
    return Sun;
  } else if (props.wind > 5 && props.temperature < 30) {
    return Wind;
  } else if (props.humidity > 75) {
    return CloudRain;
  } else {
    return null;
  }
});
</script>

<style></style>
