const fs = require('fs')
const files = fs.readdirSync('./public/assets/images')
process.env.STATIC_REFERRAL_DOCS = files.reverse().join("$")


export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [],
  $meta: [{ viewport: 'width=device-width, initial-scale=1.0', }],
  app: {
    head: {
      charset: 'utf-8',
      
      script: [{}],
    },
  },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      files: process.env.STATIC_REFERRAL_DOCS || "",
    }
  },
  imports: { dirs: ["composables/**"] }
})
