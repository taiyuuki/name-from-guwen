<script setup lang="ts">
import { copy_text } from '@taiyuuki/utils'
import type { NameData } from 'src/api'

const props = defineProps<{
    nameData: NameData
}>()

const $q = useQuasar()

const textList = computed(() => {
    return props.nameData.content.split('')
})

const left = ref(true)

const toggle = () => {
    left.value = !left.value
}

function copyText() {
    const text = left.value
        ? `${props.nameData.name[0]}${props.nameData.name[1]}`
        : `${props.nameData.name[1]}${props.nameData.name[0]}`
    copy_text(text)
    $q.notify({
        message: '已复制',
        position: 'top',
        color: 'primary',
    })
}
</script>

<template>
  <div
    pst="rel"
    bg="#1c0d1a"
    text="white center"
    w="lg:22% md:30% sm:45% 90%"
    h="200"
    m="10"
    p="10"
    border="radius-10"
    overfow="hidden"
  >
    <div
      pst="rel"
      w="100%"
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
          :data-text="nameData.name[0]"
          :class="{ 'l-50': left, 'r-50': !left }"
        />
        <div
          pst="abs"
          transition-all
          :data-text="nameData.name[1]"
          :class="{ 'r-50': left, 'l-50': !left }"
        />
      </div>
      <div
        class="i-ic:round-swap-horizontal-circle"
        text="1.5rem"
        pst="abs l-5 t-5"
        pointer
        hover="text-var-primary"
        @click="toggle"
      >
        <q-tooltip
          class="bg-indigo"
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          max-width="200px"
        >
          切换
        </q-tooltip>
      </div>
      <div
        class="i-ic:baseline-copy-all"
        text="1.5rem"
        pst="abs r-5 t-5"
        pointer
        hover="text-var-primary"
        @click="copyText"
      >
        <q-tooltip
          class="bg-indigo"
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          max-width="200px"
        >
          复制
        </q-tooltip>
      </div>
    </div>
    <div m="t-3rem">
      <span
        v-for="(item, index) in textList"
        :key="index"
        :class="{ 'text-primary': nameData.name.join('').match(item) }"
      >{{ item }}</span>
    </div>
    <div pst="abs r-10 b-10">
      [{{ nameData.dynasty }}]{{ nameData.author }}
    </div>
    <div pst="abs r-10 b-30">
      <div hover="pointer">
        {{ nameData.title }}
        <q-tooltip
          class="bg-indigo"
          :offset="[10, 10]"
          max-width="200px"
        >
          {{ nameData.all }}
        </q-tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.text-primary {
  color: var(--primary);
  font-weight: bold;
  font-size: 20px;
}

.l-50 {
  left: -50%;

  &::before {
    content: attr(data-text);
  }
}

.r-50 {
  left: 50%;

  &::before {
    content: attr(data-text);
  }
}
</style>
