const fs = require('fs')
const files = fs.readdirSync('./public/assets/images')
process.env.STATIC_REFERRAL_DOCS = files.reverse().join("$")


export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: { public: { files: process.env.STATIC_REFERRAL_DOCS || "THERE IS NO FILES MON" } },
  imports: { dirs: [ "composables/**" ] }
})
