import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Основные настройки приложения
  app: {
    head: {
      title: 'Registration Form',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        // Фавиконки для разных цветовых схем
        { rel: 'icon', href: '/favicon-dark.ico' },
        {
          rel: 'icon',
          href: '/favicon-light.ico',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          href: '/favicon-dark.ico',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
  },

  // Настройки сборки и разработки
  ssr: true,
  devtools: { enabled: true },

  // Модули
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  // Настройки модуля @nuxt/image
  image: {
    quality: 100,
    format: ['avif', 'webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1920,
    },
  },

  // Настройки Vite
  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },

  // Настройки сборки
  build: {
    filenames: {
      chunk: () => '[name].[id].[contenthash].js',
    },
  },

  // Конфигурация времени выполнения
  runtimeConfig: {
    public: {}, // Публичные переменные, доступные на клиенте
  },

  // Совместимость (Cloudflare-specific)
  compatibilityDate: '2025-02-17',
});
