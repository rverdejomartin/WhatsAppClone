import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      //redirige las peticiones de socket al puerto 3000 a Node
      'socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  }
})
