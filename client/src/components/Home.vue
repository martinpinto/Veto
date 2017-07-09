<!-- src/components/Home.vue -->

<template>
    <div>
      <div v-for="quote in quotes" class="veto-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{ quote.title }}</h2>
        </div>
        <div>
          <div class="veto-description-controls">
            Vote:
            <a href="#" v-on:click="upvote()"><i class="material-icons ">thumb_up</i></a>
            {{ quote.votes }}
            <a href="#" v-on:click="downvote()"><i class="material-icons">thumb_down</i></a>

          </div>
          <div class="mdl-card__supporting-text">
            {{ quote.description }}
          </div>
          <div>Category</div>
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Get Started
          </a>
            Save, Comments
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
      .veto-card-wide {
        border-radius: 5px;
        margin-top: 50px;
      }
      .mdl-card {
        width: 100%;
      }
      .mdl-card__title {
        height: 70px;
        background: url('../assets/demos/welcome_card.jpg') center / cover;
      }
      .mdl-card__supporting-text {
        height: 100px;
        width: 80%;
        float: right;
      }
      .mdl-card__menu {
        color: #fff;
      }
      .veto-description-controls {
        width: 20%;
        float: left;
      }
  </style>
</template>

<script>
  export default {
    created() {
      this.getQuotes();
    },
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
          })
          .error((err) => console.log(err))
      },
      upvote() {
        this.$http
          .post('http://localhost:3001/api/quotes/voting/1', () => {
          })
      },
      downvote() {

      }
    }
  }
</script>