const fs = require('fs')
const files = fs.readdirSync('./public/assets/images')
process.env.STATIC_REFERRAL_DOCS = files.reverse().join("$")


export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
  ],
  $meta: [{
    viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
  },
  {
    name: 'description',
    content: 'A source for chemistry themed SVG icons that anyone can use for free',
  },
  {
    name: 'title',
    content: 'Chemical icons pack',
  },
  {
    name: 'keywords',
    content: 'chemistry, icons, icon pack, free, chemicons',
  },
  {
    name: 'robots',
    content: 'index, follow',
  },
  {
    name: 'Content-Type',
    content: 'text/html; charset=utf-8',
  },
  ],
  app: {
    head: {
      charset: 'utf-8',
      script: [{
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-8269338553074223',
        async: true
      }],
      title: "Chemical icons pack",
    },
  },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      files: process.env.STATIC_REFERRAL_DOCS || "",
      gtagId: "G-L2CLJS9S80",
    }
  },
  imports: { dirs: ["composables/**"] },
})
