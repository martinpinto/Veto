<!-- src/components/App.vue -->
<template>

  <div class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header mdl-layout__header--fixed">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Title</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation -->
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" v-link="'home'">Home</a>
          <a class="mdl-navigation__link" v-if="user.authenticated" v-link="'login'" @click="logout()">Logout</a>
        </nav>
      </div>
    </header>
    <main class="mdl-layout__content">
      <router-view></router-view>
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