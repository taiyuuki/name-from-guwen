<script setup lang="ts">
import type { NameData } from 'src/api'
import { getGuwen } from 'src/api'
import { arr_random } from '@taiyuuki/utils'
import { getRandomName, removePunctuation } from 'src/utils'

const keyword = ref('')
const count = ref(6)

keyword.value = ''

const guwen = ref<NameData[]>([])

function getText() {
    getGuwen('songci', keyword.value || void 0).then(data => {
        const set = new Set<NameData>()
        while (set.size < count.value && set.size < data.length) {
            const result = arr_random(data)
            const content = arr_random(result.content)
            const text = removePunctuation(content).replaceAll(keyword.value, '').split('')
            let name_1 = arr_random(text)
            if (name_1 === '') {
                name_1 = arr_random(text)
            }
            let name_2 = keyword.value === '' ? arr_random(text) : keyword.value
            while (name_1 === name_2) {
                name_2 = arr_random(text)
            }
            set.add({
                ...result,
                content,
                name: getRandomName(name_1, name_2),
            })
        }
        guwen.value = [...set]
    })
}
</script>

<template>
  <button @click="getText">
    生成
  </button>
  <div>
    <NameCard
      v-for="(nameData, index) in guwen"
      :key="index"
      :name-data="nameData"
    />
  </div>
</template>
