<script setup lang="ts">
import type { Category, NameData, Result } from 'src/api'
import { getGuwen } from 'src/api'
import { arr_random, throttle } from '@taiyuuki/utils'
import { getRandomStr, removePunctuation } from 'src/utils'
import { useInstance } from 'src/composables/instance'
import { QInput } from 'quasar'

const keyword = ref('')
const ipt = useInstance<typeof QInput>()
const count = ref(8)
const $q = useQuasar()
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
        lable: '辞赋',
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
        lable: '古体诗',
    },
]
const checkList = ref<(Category | 'no')[]>(['tangshi', 'songci', 'yuefu', 'cifu', 'shijing', 'chuci', 'gushi'])

const searchList = computed(() => {
    return checkList.value.filter(item => item !== 'no') as Category[]
})

const guwen = ref<NameData[]>([])

const noResult = ref(false)
function getNameList() {
    if (ipt.value.hasError) {
        $q.notify({
            message: '请输入单个汉字',
            type: 'error',
            position: 'top',
            color: 'negative',
        })
        return
    }
    getGuwen(searchList.value, keyword.value || void 0).then(data => {
        noResult.value && (noResult.value = false)
        guwen.value.length = 0
        const guwenList = new Set<Result>()
        while (guwenList.size < count.value && guwenList.size < data.length) {
            const result = arr_random(data)
            guwenList.add(result)
        }
        for (const result of guwenList) {
            let content = arr_random(result.content)
            while (content.length <= 2) {
                content = arr_random(result.content)
            }
            const text = removePunctuation(content)
                .replaceAll(keyword.value, '')
                .split('')
            let name_1 = arr_random(text)
            while (name_1 === '') {
                name_1 = arr_random(text)
            }
            let name_2 = keyword.value === '' ? arr_random(text) : keyword.value
            while (name_1 === name_2) {
                name_2 = arr_random(text)
            }
            guwen.value.push({
                ...result,
                content,
                name: [name_1, name_2],
            })
            if (guwen.value.length === 0) {
                noResult.value = true
            }
        }
    })
}

const genNames = throttle(getNameList, 300)

function check(value: Category | 'no') {
    if (value === 'no' && searchList.value.length === 0) {
        checkList.value = ['tangshi', 'songci', 'yuefu', 'cifu', 'shijing', 'chuci', 'gushi']
    }
}

function validKeyword(value: string) {
    const reg = /^[\u4e00-\u9fa5]$/g
    return value === '' || reg.test(value) || '请输入单个汉字'
}

function changeName(nameData: NameData) {
    let name = getRandomStr(nameData.content)
    while (name === nameData.name[0]) {
        name = getRandomStr(nameData.content)
    }
    nameData.name[0] = name
    if (keyword.value === '') {
        nameData.name[1] = getRandomStr(nameData.content)
        while (nameData.name[0] === nameData.name[1]) {
            nameData.name[1] = getRandomStr(nameData.content)
        }
    }
}
</script>

<template>
  <div class="q-gutter-sm p-10">
    <div m="y-20">
      <q-checkbox
        v-for="(item, i) in category"
        :key="item.name"
        v-model="checkList[i]"
        size="lg"
        dense
        keep-color
        :label="item.lable"
        color="primary"
        :true-value="item.name"
        false-value="no"
        class="m-10"
        @update:model-value="check"
      />
    </div>
    <div
      flex="row"
      m="y-20"
    >
      <q-btn
        color="primary"
        label="取名"
        dense
        size="lg"
        class="m-x-10 m-b-20"
        @click="genNames"
      />
      <q-input
        ref="ipt"
        v-model="keyword"
        outlined
        type="text"
        :rules="[validKeyword]"
        lazy-rules
        maxlength="1"
        label="筛选关键字"
        class="w-200"
        @keypress.enter="genNames"
      />
    </div>
  </div>
  <div
    flex="row items-center justify-middle wrap"
    w="max-1600 100%"
  >
    <NameCard
      v-for="(nameData, index) in guwen"
      :key="index"
      :name-data="nameData"
      @change="changeName(nameData)"
    />

    <div v-if="noResult">
      没找到与相关的诗文
    </div>
  </div>
</template>
