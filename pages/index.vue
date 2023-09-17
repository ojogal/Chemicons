<script>
export default {
  data: () => ({
    copied: -1,
    icons: [],
    pageSize: 16,
    page: 0,
  }),
  methods: {
    copySVGContent(index, imgSrc) {
      if (imgSrc) {
        fetch(`/assets/images/${imgSrc}`)
          .then((response) => response.text())
          .then(async (svgContent) => {
            await navigator.clipboard.writeText(svgContent);
            this.copied = index;
            setTimeout(() => { this.copied = -1 }, 3000)
          })
          .catch((error) => {
            console.error("Error fetching SVG content:", error);
          });
      }
    },
  },
  mounted() {
    const assets = useAssets();
    this.icons = assets.split("$")
  }
};
</script>

<template>
  <Head>
    <Title>Chemical icons pack</Title>
  </Head>
  <div class="limited-width">
    <div class="head-text">
      <h1>CHEMICAL ICONS PACK</h1>
      <div class="icon-details">
        <p>color: 000000</p>
        <p>size: 100x100px</p>
      </div>
    </div>
    <div class="content">
      <div class="paragraph-text">
        <p>As a young scientist with a background in pharmaceutical technology and hands-on experience in organic
          synthesis,
          I've embarked on a mission to bridge the gap between science and design. This website is a testament to the
          incredible world of chemistry, where chemical formulas come to life as easy to use SVG icons. Whether you're a
          researcher seeking visually appealing representations of your work, an educator looking to make chemistry
          engaging, or simply someone who appreciates the artistry of science, this website offers a design solution for
          you.</p>
      </div>
      <div>
        <div class="info-paragraph">
          <p>Click on icon to copy SVG content</p>
        </div>
        <div class="icons-section">
          <div v-for="(icon, index) of icons.slice(0, page * pageSize + pageSize)" :key="icon" class="icon-card">
            <div v-if="!(this.copied === index)"
              :style="{ backgroundImage: `url(assets/images/${icon})`, width: '100%', height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer' }"
              @click="(e) => { copySVGContent(index, icon) }">
            </div>
            <!-- <img v-if="!(this.copied === index)" :src="`assets/images/${icon}`"
              @click="(e) => { copySVGContent(index, icon) }" alt=""> -->
            <p v-if="!(this.copied === index)">{{ icon.split('/').pop().split('.')[0].replace('_', ' ') }}</p>
            <div v-if="this.copied === index" class="copied-card">
              <p>Copied</p>
            </div>
          </div>
        </div>
        <div class="load-more-wrapper" v-if="(page * pageSize + pageSize) <= icons.length - 1">
          <button @click="page++">Load more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-family: 'Noto Sans', sans-serif;
  font-size: 48px;
}

.head-text {
  gap: 20px;
  display: flex;
  margin-bottom: 10px;

  @media (max-width: 780px) {
    flex-direction: column;
  }

  h1 {
    margin: 0;
    line-height: 1;
  }

  .icon-details {
    margin-top: auto;

    p {
      margin: 0;
      font-weight: 500;
    }
  }
}

.content {
  display: flex;
  gap: 20px;
  min-height: 100vh;

  @media (max-width: 1440px) {
    flex-direction: column;
  }

  .icon-card {
    display: flex;
    flex-direction: column;
    max-width: 150px;
    width: 150px;
    max-height: 150px;
    height: 150px;
    margin: auto;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    background: #F0F0F3;
    box-shadow: -3px -3px 16px 0px #FFF, 8px 8px 16px 0px #DEDEDE;

    @media (max-width: 1240px) {
      width: min(150px, 7rem);
      height: min(150px, 9rem);
    }

    p {
      font-family: Newsreader;
      font-size: 13px;
      font-weight: 500;
      margin: 15px 0 0 0;
    }

    img {
      height: 100px;
      width: 100px;
      margin-top: auto !important;
      margin-bottom: auto !important;
      opacity: 85%;
      cursor: pointer;
    }
  }

  .load-more-wrapper {
    display: flex;
    justify-content: center;

    button {
      border: none;
      background: none;
      font-weight: 500;
      cursor: pointer;
      font-size: 16px;
    }
  }

  .info-paragraph {
    line-height: 0;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;

    p {
      font-weight: 500;
      margin-left: auto;
    }
  }

  .icons-section {
    margin-bottom: 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 572px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .paragraph-text {
    p {
      max-width: 250px;
      margin: 0;
      text-align: justify;
      font-size: 14px;

      @media (max-width: 1440px) {
        max-width: 550px
      }
    }
  }

  .copied-card {
    p {
      font-size: 18px;
    }
  }
}
</style>