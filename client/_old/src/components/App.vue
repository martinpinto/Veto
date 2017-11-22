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

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
    }, 
    openDialog() {
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