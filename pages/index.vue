<script>
export default {
  data: () => ({
    copied: -1,
    icons: [],
    pageSize: 16,
    page: 0,
    isMobile: false,
  }),
  methods: {
    copySVGContent(index, imgSrc) {
      if (imgSrc) {
        fetch(`/assets/images/${imgSrc}`)
          .then((response) => response.text())
          .then(async (svgContent) => {
            await window.navigator.clipboard.writeText(svgContent)
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
    this.icons = assets.split("$");
    this.isMobile = (() => {
      let check = false;
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    })();
    console.log(this.isMobile)
  }
};
</script>

<template>
  <Head>
    <Title>Chemical icons pack</Title>
  </Head>
  <div class="limited-width">
    <div>
      <div class="head-text">
        <h1>CHEMICAL ICON PACK</h1>
      </div>
      <div class="content">
        <div>
          <div class="info-paragraph">
            <div>
              <p>Click on icon to {{ isMobile ? 'download' : 'copy' }} SVG content</p>
            </div>
            <div class="icon-details">
              <div>
                <p>color: 000000</p>
              </div>
              <div>
                <p>size: 100x100px</p>
              </div>
            </div>
          </div>
          <div class="icons-section">
            <ClientOnly>
              <div v-for="(icon, index) of icons.slice(0, page * pageSize + pageSize)" :key="icon" class="icon-card"
                :id="index">
                <a v-if="!(this.copied === index)"
                  :style="{ backgroundImage: `url(assets/images/${icon})`, width: '100%', height: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer' }"
                  @click="() => !isMobile ? copySVGContent(index, icon) : void (0)" :download="isMobile ? icon : null"
                  :href="isMobile ? `/assets/images/${icon}` : `javascript:void(0)`">
                </a>
                <p v-if="!(this.copied === index)">{{ icon.split('/').pop().split('.')[0].replace('_', ' ') }}</p>
                <div v-if="this.copied === index" class="copied-card">
                  <p>Copied</p>
                </div>
              </div>
            </ClientOnly>
          </div>
          <div class="load-more-wrapper" v-if="(page * pageSize + pageSize) <= icons.length - 1">
            <button @click="page++">Load more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/scss/_variables";

.head-text {
  padding-bottom: 40px;

  @media (max-width: 867px) {
    flex-direction: column;
  }

  h1 {
    margin: 0;
    line-height: 1;
    letter-spacing: 0.01em;
    font-family: 'Hanuman';
    font-weight: 700;
    font-size: 78px;
    text-align: center;

    @media (max-width: 1085px) {
      font-size: 70px !important;
    }

    @media (max-width: 995px) {
      font-size: 60px !important;
    }

    @media (max-width: 876px) {
      font-size: 50px !important;
    }

    @media (max-width: 759px) {
      font-size: 45px !important;
    }

    @media (max-width: 608px) {
      font-size: 36px;
      text-align: center;
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
      font-family: 'Inter';
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.03em;
      margin: 0px 15px 25px 15px;
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
      color: $color-black-base !important;
    }
  }

  .info-paragraph {
    line-height: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;

    @media (max-width: 594px) {
      flex-direction: column;
      text-align: center;
      > .icon-details {
        justify-content: center !important;
      }
    }

    p {
      font-weight: 400;
    }
  }

  .icon-details {
    display: flex;
    gap: 20px;
  }

  .icons-section {
    margin-bottom: 60px !important;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    margin: 0 auto;
    width: 100%;

    @media (max-width: 924px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 594px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 390px) {
      gap: 10px
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
    p {
      font-family: 'Hanuman';
      font-size: 20px;
      margin: auto;
      font-weight: 400;
    }
  }
}
</style>