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
      <div class="paragraph-text-wrapper">
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

  @media (max-width: 867px) {
    flex-direction: column;
  }

  h1 {
    margin: 0;
    line-height: 1;

    @media (max-width: 608px) {
      font-size: 36px;
      text-align: center;
    }
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

  @media (max-width: 1526px) {
    flex-direction: column;
    gap: 0;
  }

  @media (max-width: 680px) {
    gap: 20px;
  }

  .icon-card {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    margin: auto;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 24px;
    background: #F0F0F3;
    box-shadow: -3px -3px 16px 0px #FFF, 8px 8px 16px 0px #DEDEDE;
    text-align: center;

    @media (max-width: 1240px) {
      width: 100%;
    }

    p {
      font-family: Newsreader;
      font-size: 13px;
      font-weight: 500;
      margin: 0 0 25px 0;
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
      color: #333333 !important;
    }
  }

  .info-paragraph {
    line-height: 0;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;

    @media (max-width: 1526px) {
      margin-top: 0;
    }

    p {
      font-weight: 500;
      margin-left: auto;

      @media (max-width: 1526px) {
        margin-right: 45px;
      }

      @media (max-width: 1380px) {
        margin-right: 35px;
      }

      @media (max-width: 1280px) {
        margin-right: 25px;
      }

      @media (max-width: 1240px) {
        margin-right: 0;
      }

      @media (max-width: 680px) {
        margin-left: 0;
      }
    }
  }

  .icons-section {
    margin-bottom: 60px !important;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    margin: 0 auto;
    width: 100%;

    @media (max-width: 924px) {
      // gap: 20px;
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 546px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .paragraph-text-wrapper {
    p {
      max-width: 250px;
      margin: 0;
      text-align: justify;
      font-size: 14px;

      @media (max-width: 1526px) {
        max-width: 550px
      }
    }
  }

  .copied-card {
    width: 100%;
    height: 100%;

    p {
      font-size: 18px;
    }
  }
}
</style>