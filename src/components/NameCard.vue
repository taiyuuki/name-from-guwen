<script setup lang="ts">
import type { NameData } from 'src/api'

const props = defineProps<{
    nameData: NameData
}>()

const textList = computed(() => {
    return props.nameData.content.split('')
})

const left = ref(true)

const toggle = () => {
    left.value = !left.value
}
</script>

<template>
  <div
    bg="#1c0d1a"
    text="white center"
    w="lg:23% md:30% sm:45% 90%"
    h="180px"
    m="10"
    p="10"
    border="radius-10"
    overfow="hidden"
  >
    <div
      pst="rel"
      w="1.5rem"
      text="1.5rem bold"
      display="inline-block"
    >
      <div
        pst="abs"
        transition-all
        :class="{ 'l-50': left, 'r-50': !left }"
      >
        {{ nameData.name[0] }}
      </div>
      <div
        pst="abs"
        transition-all
        :class="{ 'r-50': left, 'l-50': !left }"
      >
        {{ nameData.name[1] }}
      </div>
      <div
        class="i-ic:round-swap-horizontal-circle"
        pst="abs l-150%"
        pointer
        hover="text-red"
        @click="toggle"
      />
    </div>
    <div m="t-3rem">
      <span
        v-for="(item, index) in textList"
        :key="index"
        :class="{ 'text-red': nameData.name.join('').match(item) }"
      >{{ item }}</span>
    </div>
    <div>——{{ nameData.author }}[{{ nameData.dynasty }}] 《{{ nameData.title }}》</div>
  </div>
</template>

<style scoped>
.text-red {
  color: #ec2b24;
  font-weight: bold;
  font-size: 20px;
}

.l-50 {
  left: -50%;
}

.r-50 {
  left: 50%;
}
</style>
