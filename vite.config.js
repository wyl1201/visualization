/* eslint-disable import/no-extraneous-dependencies */
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

const pages = fs
  .readdirSync(resolve(__dirname, './pages'))
  .reduce((acc, dir) => {
    acc[dir] = resolve(__dirname, `./pages/${dir}/index.html`)
    return acc
  }, {})

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './'),
    },
  },
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html'), ...pages },
    },
  },
})
