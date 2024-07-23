<template>
  <div class="bg-[#e2e2e2] flex-grow">
    <div class="flex justify-between px-20 py-6 items-center">
      <div class="font-bold text-3xl">現在天氣</div>
      <RefreshCcw
        class="w-8 h-8 cursor-pointer"
        @click="handleRefreshWeather"
      />
    </div>
    <!-- 顯示天氣卡片區域 -->
    <div
      v-loading="loading"
      class="grid sm:grid-cols-2 grid-cols-1 px-20 gap-4 pb-4"
    >
      <WeatherCard
        v-for="data in countryStore.countryData"
        :key="data.id"
        :country="data.country"
        :city="data.city"
        :weather="data.weather"
      />
    </div>
  </div>
</template>

<script setup>
import WeatherCard from '@/components/WeatherCard.vue';
import { RefreshCcw } from 'lucide-vue-next';
import { useCountryStore } from '@/stores/countryStore';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const countryStore = useCountryStore();

const loading = ref(false);

const handleRefreshWeather = async () => {
  try {
    loading.value = true;
    await countryStore.updateWeatherData();
    ElMessage({
      type: 'success',
      grouping: true,
      message: '更新成功',
    });
  } catch (error) {
    console.log(error);
    ElMessage({
      type: 'error',
      grouping: true,
      message: '更新失敗',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
