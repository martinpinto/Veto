<!-- src/components/App.vue -->
<template>

  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Title</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation -->
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Neues Zitat</a>
          <a class="mdl-navigation__link" v-link="'home'">Home</a>
          <a class="mdl-navigation__link" v-if="user.authenticated" v-link="'login'" @click="logout()">Logout</a>
        </nav>
      </div>
    </header>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">4</div>

      <main class="mdl-layout__content mdl-cell mdl-cell--4-col">
        <router-view></router-view>
      </main>

      <div class="mdl-cell mdl-cell--2-col">4</div>
    </div>
    </main>
  </div>

</template>

<script>
export default {
  data() {
    return {
      user: ""
    }
  },
  methods: {
    logout() {
    }
  }
}
</script>