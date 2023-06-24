module.exports = {
    root: true,
    extends: ['@taiyuuki/eslint-config-vue-unimport'],
    globals: {
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly',
        useQuasar: 'readonly',
        Notify: 'readonly',
        Dialog: 'readonly',
        LocalStorage: 'readonly',
        useMeta: 'readonly',
    },

    rules: {
        'import/no-unresolved':
      ['error', {
          'ignore': [
              'uno.css',

              '~pages',
              'virtual:generated-layouts',
              'virtual:generated-pages',
              'virtual:vue-component-preview',

          ],
      }],
    },

}
