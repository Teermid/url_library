<template>
  <v-dialog v-model="$store.state.settingsPopUp" origin="top center" max-width="400px" lazy>
    <v-card>
      <v-card-title>
        <span class="headline px-2"> {{ text.header }} </span>
        <v-spacer></v-spacer>
        <v-btn icon slot="activator" @click="close">
          <v-icon color="grey lighten-2">close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs>
          <v-tab> {{ text.app.title }} </v-tab>
          <v-tab>{{ text.user.title }}</v-tab>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="appSettings pt-4">
                  <p>{{ text.app.color }}</p>
                  <div class="colorContainer">
                    <div class="color" v-for="color in settings.colors" @click="setColor(color)" v-bind:style="{ 'background-color':color.hex }"></div>
                  </div>
                  <div class="notificationsCheck">
                    <v-checkbox
                       :label="text.app.notifications"
                       v-model="notifications"
                     ></v-checkbox>
                   </div>
                  <v-select
                    @click="changeLanguage"
                    :items="settings.language"
                    v-model="languageSelected"
                    label="Idioma"
                    single-line
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                <v-btn @click="apply">APPLY</v-btn>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import User from '@/services/User'
export default {
  data () {
    return {
      text: {
        header: null,
        app: {
          title: null,
          color: null,
          notifications: null
        },
        user: {
          title: null
        }
      },
      notifications: null,
      userSettings: {},
      languageSelected: null,
      settings: {
        colors: [
          {
            hex: '#2c3e50',
            light: false
          },
          {
            hex: '#2b2b2b',
            light: false
          },
          {
            hex: '#f6f6f6',
            light: true
          }
        ],

        language: [
          {
            text: null,
            value: 'catalan'
          },
          {
            text: null,
            value: 'spanish'
          },
          {
            text: null,
            value: 'english'
          }
        ]
      }
    }
  },

  beforeMount () {
    this.text.header = this.$store.getters.getContent.settings.header
    this.text.app.title = this.$store.getters.getContent.settings.app.title
    this.text.app.color = this.$store.getters.getContent.settings.app.color
    this.text.app.notifications = this.$store.getters.getContent.settings.app.notifications
    this.text.user.title = this.$store.getters.getContent.settings.user.title
    this.settings.language[0].text = this.$store.getters.getContent.settings.app.languages.catalan
    this.settings.language[1].text = this.$store.getters.getContent.settings.app.languages.spanish
    this.settings.language[2].text = this.$store.getters.getContent.settings.app.languages.english
    this.notifications = this.$store.getters.getNotifications
  },

  methods: {
    prepareSettings () {
      /* for (var i = 0; i < this.settings.colors.length; i++) {
        if (this.settings.colors[i].hex === this.userSettings.color.hex) {
          this.settings.colors[i].selected = true
        } else {
          this.settings.colors[i].selected = false
        }
      } */

      for (var j = 0; j < this.settings.language.length; j++) {
        if (this.settings.language[j].value === this.userSettings.language.value) {
          this.languageSelected = this.settings.language[j]
        }
      }
    },

    close () {
      this.$store.commit('setSettingsPopUp')
    },

    async setColor (color) {
      this.$store.commit('setColor', color)
    },

    async apply () {
      this.$store.commit('setLanguage', this.languageSelected)
      this.$store.commit('setNotifications', this.notifications)
      await User.loadSettings(this.$store.state.user._id, this.$store.state.settings)
      this.$store.commit('setContent', (await User.getAppContent()).data)
      this.$router.go()
    }
  },

  watch: {
    '$store.state.settingsPopUp': {
      async handler (value) {
        this.userSettings = this.$store.getters.getSettings
        this.notifications = this.userSettings.notifications
        this.prepareSettings()
      }
    }
  }
}
</script>
<style src="../../css/settings.css"></style>
