<!-- src/components/Home.vue -->

<template>
    <div>

      <div v-if="typeof quotes !== 'undefined'" v-for="quote in quotes" class="demo-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Welcome</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris sagittis pellentesque lacus eleifend lacinia...
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Get Started
          </a>
        </div>
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">share</i>
          </button>
        </div>
      </div>

      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" v-on:click="getQuotes()">Get Quotes</button>
    </div>

    <style>
      .demo-card-wide.mdl-card {
        width: 512px;
      }
      .demo-card-wide > .mdl-card__title {
        color: #fff;
        height: 176px;
        background: url('../assets/demos/welcome_card.jpg') center / cover;
      }
      .demo-card-wide > .mdl-card__menu {
        color: #fff;
      }
  </style>
</template>

<script>
  export default {
    data() {
      return {
        quotes: undefined
      }
    },
    methods: {
      getQuotes() {
        this.$http
          .get('http://localhost:3001/api/quotes', (data) => {
            this.quotes = data;
            console.log(data);
          })
          .error((err) => console.log(err))
      }
    }
  }
</script>