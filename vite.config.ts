import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Online_Protfolio/', // ⚠️ 一定要和你的仓库名一模一样
  plugins: [react()],
})
