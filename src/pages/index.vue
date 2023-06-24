<script setup lang="ts">
import type { Result } from 'src/api'
import { getGuwen } from 'src/api'
import { arr_random } from '@taiyuuki/utils'
import { removePunctuation, getRandomName } from 'src/utils'

const keyword = ref('')
const count = ref(6)

keyword.value = '瑶'

const guwen = ref<Result>({
    content: [],
    author: '',
    book: '',
    dynasty: '',
    title: '',
})

const textArray = computed(() => {
    if (guwen.value.content.length === 0) {
        return []
    }
    return arr_random(guwen.value.content).split('')
})

const randomChar = computed(() => {
    const rName = removePunctuation(textArray.value.join('')).replaceAll(keyword.value, '')
    return arr_random(rName.split(''))
})

const names = computed(() => {
    return Array.from({ length: count.value }).map(() => getRandomName(keyword.value, randomChar.value))
})

function getText() {
    getGuwen('songci', keyword.value).then(data => {
        guwen.value = arr_random(data)
    })
}
</script>

<template>
  <div v-if="textArray.length > 0">
    <span
      v-for="(text, index) in textArray"
      :key="index"
      :class="{ 'text-red': text === keyword || text === randomChar }"
    >{{ text }}</span>
  </div>
  <button @click="getText">
    生成
  </button>
  <div v-show="randomChar">
    <div
      v-for="(name, index) in names"
      :key="index"
    >
      {{ name }}
    </div>
  </div>
</template>

<style lang="scss">
.text-red {
  color: #ec2b24;
  font-weight: bold;
  font-size: 20px;
}
</style>
