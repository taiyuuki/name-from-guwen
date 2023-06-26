import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetTaiyuuki } from '@taiyuuki/unocss-preset'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1,
        }),
        presetTaiyuuki(),
    ],
})
