<script>
</script>

<template>
  <div class="footer">
    <div class="limited-width container">
      <div>
        <p>© Chemicons | All Rights Reserved. | <NuxtLink to="/policy">Privacy Policy</NuxtLink>
        </p>
      </div>
      <div class="right-text">
        <p>Made by <NuxtLink href="https://www.linkedin.com/in/alexandr-ojog/" target="_blank">Alexandr Ojog</NuxtLink> |
          Contact: <NuxtLink href="mailto:ojog.al@gmail.com">ojog.al@gmail.com</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/scss/_variables";

.footer {
  .container {
    display: flex;
    flex-direction: row;

    @media (max-width: 864px) {
      align-items: center;
      flex-direction: column-reverse !important;
    }
  }

  p {
    color: $color-black-base;
    opacity: .4;
    font-size: 15px;
    text-align: center;
  }

  a {
    color: $color-black-base;
    text-decoration: none
  }

  .right-text {
    margin-left: auto;

    @media (max-width: 864px) {
      margin-left: 0;
    }
  }
}
</style>