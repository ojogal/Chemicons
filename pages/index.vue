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
            <img v-if="!(this.copied === index)" :src="`assets/images/${icon}`"
              @click="(e) => { copySVGContent(index, icon) }" alt="">
            <p v-if="!(this.copied === index)">{{ icon.split('/').pop().split('.')[0].replace('_', ' ') }}</p>
            <div class="copied-card">
              <p v-if="this.copied === index">Copied</p>
            </div>
          </div>
        </div>
        <div class="load-more-wrapper" v-if="(page * pageSize + pageSize) <= icons.length-1">
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

  .icon-card {
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 150px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    background: #F0F0F3;
    box-shadow: -3px -3px 16px 0px #FFF, 8px 8px 16px 0px #DEDEDE;

    p {
      font-family: Newsreader;
      font-size: 13px;
      font-weight: 500;
      margin: 15px 0 0 0;
    }

    img {
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
      // margin: 0 auto
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
}

.icons-section {
  // margin-top: 60px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px
}

.paragraph-text {
  p {
    width: 250px;
    margin: 0;
    text-align: justify;
    font-size: 14px;
  }
}
</style>