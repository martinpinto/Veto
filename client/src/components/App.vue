<!-- src/components/App.vue -->
<template>

  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <div>
        <!-- Title -->
        <a class="mdl-layout-title" v-link="'home'"><img id="veto-logo" src="../assets/images/veto-logo.png" /></a>
        </div>
        <!-- Add spacer, to align navigation to the right -->
        <div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
            <label class="mdl-button mdl-js-button mdl-button--icon"
                  for="fixed-header-drawer-exp">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" name="sample"
                    id="fixed-header-drawer-exp">
            </div>
          </div>
        </div>
        <!-- Navigation -->
        <div>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" @click="quote()" id="show-dialog"><i class="material-icons">forum</i>Zitiere</a>
          <a class="mdl-navigation__link" v-if="user.authenticated" v-link="'login'" @click="logout()">Logout</a>
        </nav>
        </div>
      </div>
    </header>
    </div>

    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col">Left Column</div>

      <main class="mdl-layout__content mdl-cell mdl-cell--4-col">
        <router-view></router-view>
      </main>

      <div class="mdl-cell mdl-cell--2-col">Right Column</div>
    </div>

    <dialog class="mdl-dialog">
      <h4 class="mdl-dialog__title">Allow data collection?</h4>
      <div class="mdl-dialog__content">
        <p>
          Allowing us to collect data will let us get you the information you want faster.
        </p>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button">Agree</button>
        <button type="button" class="mdl-button close">Disagree</button>
      </div>
    </dialog>
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
    },
    quote() {
      var dialog = document.querySelector('dialog');
      var showDialogButton = document.querySelector('#show-dialog');
      if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      showDialogButton.addEventListener('click', function() {
        dialog.showModal();
      });
      dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
    }
  }
}
</script>