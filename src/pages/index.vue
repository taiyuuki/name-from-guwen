<script setup lang="ts">
import type { Category, CategoryCheck, NameData } from 'src/api'
import { getGuwen } from 'src/api'
import { arr_random, object_keys } from '@taiyuuki/utils'
import { removePunctuation } from 'src/utils'

const keyword = ref('')
const count = ref(8)
const categoryList = ref<CategoryCheck>({
    chuci: true,
    shijing: true,
    songci: true,
    yuefu: true,
    cifu: true,
    gushi: true,
})
const category = computed(() => {
    const result: Category[] = []
    object_keys(categoryList.value).forEach(key => {
        if (categoryList.value[key]) {
            result.push(key)
        }
    })
    return result
})

keyword.value = '玉'

const guwen = ref<NameData[]>([])

function getText() {
    getGuwen(category.value, keyword.value || void 0).then(data => {
        const set = new Set<NameData>()
        while (set.size < count.value && set.size < data.length) {
            const result = arr_random(data)
            let content = arr_random(result.content)
            while (content.length <= 2) {
                content = arr_random(result.content)
            }
            const text = removePunctuation(content).replaceAll(keyword.value, '').split('')
            let name_1 = arr_random(text)
            while (name_1 === '') {
                name_1 = arr_random(text)
            }
            let name_2 = keyword.value === '' ? arr_random(text) : keyword.value
            while (name_1 === name_2) {
                name_2 = arr_random(text)
            }
            if (Math.random() > 0.5) {
                [name_1, name_2] = [name_2, name_1]
            }
            set.add({
                ...result,
                content,
                name: [name_1, name_2],
            })
        }
        guwen.value = [...set]
    })
}
</script>

<template>
  <div class="q-gutter-sm">
    <q-checkbox
      v-for="(_, key) in categoryList"
      :key="key"
      v-model="categoryList[key]"
      dense
      :label="key"
      color="teal"
    />
  </div>
  <button @click="getText">
    生成
  </button>
  <div
    flex="row items-center justify-middle wrap"
    w="max-1600 100%"
  >
    <NameCard
      v-for="(nameData, index) in guwen"
      :key="index"
      :name-data="nameData"
    />
  </div>
</template>
