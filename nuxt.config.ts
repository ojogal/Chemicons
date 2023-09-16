const fs = require('fs')
const files = fs.readdirSync('./public/assets/images')
process.env.STATIC_REFERRAL_DOCS = files.reverse().join("$")


export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/google-analytics',
  ],
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: { 
    public: { 
      files: process.env.STATIC_REFERRAL_DOCS || "",
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID || "G-L2CLJS9S80",
      },
      gtm: {
        id: process.env.GTM_ID || 'GTM-WFBGWDD4',
        queryParams: {
          gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
          gtm_preview: 'env-4',
          gtm_cookies_win: 'x',
        },
        defer: false,
        compatibility: false,
        nonce: '2726c7f26c',
        enabled: true,
        debug: true,
        loadScript: true,
        enableRouterSync: true,
        ignoredViews: ['homepage'],
        trackOnNextTick: false,
        devtools: true,
      }
    } 
  },
  imports: { dirs: [ "composables/**" ] }
})
