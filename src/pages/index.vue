<script setup lang="ts">
import type { Category, NameData } from 'src/api'
import { getGuwen } from 'src/api'
import { arr_random } from '@taiyuuki/utils'
import { removePunctuation } from 'src/utils'

const keyword = ref('')
const count = ref(8)
const category = [
    {
        name: 'tangshi',
        lable: '唐诗',
    },
    {
        name: 'songci',
        lable: '宋词',
    },
    {
        name: 'yuefu',
        lable: '乐府诗',
    },
    {
        name: 'cifu',
        lable: '词赋',
    },
    {
        name: 'shijing',
        lable: '诗经',
    },
    {
        name: 'chuci',
        lable: '楚辞',
    },
    {
        name: 'gushi',
        lable: '古诗',
    },
]
const checkList = ref<(Category | 'no')[]>(['tangshi', 'songci', 'yuefu', 'cifu', 'shijing', 'chuci', 'gushi'])

const searchList = computed(() => {
    return checkList.value.filter(item => item !== 'no') as Category[]
})

const guwen = ref<NameData[]>([])

function getText() {
    getGuwen(searchList.value, keyword.value || void 0).then(data => {
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

function check(value: Category | 'no') {
    if (value === 'no' && searchList.value.length === 0) {
        checkList.value = ['tangshi', 'songci', 'yuefu', 'cifu', 'shijing', 'chuci', 'gushi']
    }
}

function validKeyword(value: string) {
    const reg = /^[\u4e00-\u9fa5]$/g
    return value === '' || reg.test(value) || '请输入单个汉字'
}
</script>

<template>
  <div class="q-gutter-sm">
    <q-input
      v-model="keyword"
      outlined
      type="text"
      :rules="[validKeyword]"
      maxlength="1"
      label="关键字"
    />
    <q-checkbox
      v-for="(item, i) in category"
      :key="item.name"
      v-model="checkList[i]"
      dense
      :label="item.lable"
      color="teal"
      :true-value="item.name"
      false-value="no"
      @update:model-value="check"
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
