<script setup lang="ts">
import type { NameData } from 'src/api'

const props = defineProps<{
    nameData: NameData
}>()

const textList = computed(() => {
    return props.nameData.content.split('')
})
</script>

<template>
  <div>
    <span
      v-for="(item, index) in textList"
      :key="index"
      :class="{ 'text-red': nameData.name.match(item) }"
    >{{ item }}</span>
    <div>{{ nameData.name }}</div>
    <div>——{{ nameData.author }} {{ nameData.title }}</div>
  </div>
</template>

<style scoped>
.text-red {
  color: #ec2b24;
  font-weight: bold;
  font-size: 20px;
}
</style>
