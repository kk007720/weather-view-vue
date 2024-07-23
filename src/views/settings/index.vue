<template>
  <section class="flex-grow bg-[#e2e2e2]">
    <div class="px-20 py-6">
      <div class="font-bold text-3xl">設定</div>
      <div class="sm:flex justify-between gap-8">
        <div
          class="border-2 border-black rounded p-4 relative mt-3 sm:w-1/2 max-h-20"
        >
          <label
            class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#e2e2e2] px-2 text-gray-700 font-semibold"
            >新增地點</label
          >
          <div class="flex justify-between items-center gap-4">
            <el-input
              v-model="input"
              placeholder="請輸入"
              clearable
              class="rounded h-10"
            />
            <el-button
              :disabled="loading"
              @click="handleAddCountry"
              type="primary"
              plain
              class="border-2 border-[#53b478] h-10 text-[#53b478] hover:bg-[#53b478]/50 hover:border-[#53b478]/50 font-semibold bg-white"
              >送出</el-button
            >
          </div>
        </div>
        <!-- 地點卡片 -->
        <div
          v-loading="loading"
          class="flex-grow gap-3 flex-col flex mt-4 sm:mt-0"
        >
          <LocationCard
            v-for="data in countryStore.countryData"
            :key="data.id"
            :id="data.id"
            :country="data.country"
            :city="data.city"
            @handleDeleteCountry="handleDeleteCountry"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import LocationCard from '@/components/LocationCard.vue';
import { ElMessage } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';

import { getDegrees, getWeather } from '@/api/locationApi';
import { useCountryStore } from '@/stores/countryStore';

const input = ref('');

const countryStore = useCountryStore();

const loading = ref(false);

/** 刪除國家地區 */
const handleDeleteCountry = (id) => {
  countryStore.removeCountryData(id);
  ElMessage({
    type: 'success',
    grouping: true,
    message: '刪除成功',
  });
};

/** 加入國家地區 */
const handleAddCountry = async () => {
  try {
    if (input.value) {
      loading.value = true;
      //先取經緯度
      const resDegrees = await getDegrees(input.value);
      // 再取天氣資料
      if (resDegrees.status) {
        const resWeather = await getWeather(
          resDegrees.data[0].latitude,
          resDegrees.data[0].longitude
        );
        if (resWeather.status) {
          const newCountry = {
            id: uuidv4(),
            country: resDegrees.data[0].country,
            city: resDegrees.data[0].name || '未知',
            latitude: resDegrees.data[0].latitude,
            longitude: resDegrees.data[0].longitude,
            weather: resWeather.data,
          };

          countryStore.addCountryData(newCountry);

          ElMessage({
            type: 'success',
            grouping: true,
            message: `新增成功 ${resDegrees.data[0].country}: ${resDegrees.data[0].name}`,
          });
        } else {
          ElMessage({
            type: 'error',
            grouping: true,
            message: `抓取天氣失敗!`,
          });
        }
      }
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      grouping: true,
      message: `抓取${input.value}經緯度失敗!`,
    });
    console.log(error);
  } finally {
    input.value = '';
    loading.value = false;
  }
};
</script>

<style></style>
