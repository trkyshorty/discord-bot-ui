<template>
  <v-app-bar app dense>
    <div class="d-flex align-center">Bot</div>
    <v-spacer></v-spacer>
    <div v-if="user == null">
      <v-btn text @click="auth">
        <v-icon left>mdi-account-key</v-icon>
        <span class="">Login</span>
      </v-btn>
    </div>
    <div v-else>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-avatar size="32">
              <v-img
                :src="
                  'https://cdn.discordapp.com/avatars/' +
                  user.id +
                  '/' +
                  user.avatar +
                  '.jpg'
                "
              >
              </v-img
            ></v-avatar>
            <span class="ml-2">{{ user.username }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/browse" nuxt>
            <v-list-item-title>Servers</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationComponent',

  computed: {
    ...mapGetters({
      token: 'user/getToken',
      user: 'user/getUser'
    })
  },

  watch: {
    token (newToken) {
      if (newToken) {
        this.$store.dispatch("user/getUser")
          .then((response) => {
            this.$router.push('/browse');
          })
          .catch(error => console.error(error.message))
      }
    },
  },

  mounted () {
    if (this.token) {
      this.$store.dispatch("user/getUser")
        .catch(error => console.error(error.message))
    }
  },

  methods: {
    auth () {
      openWindow(`${process.env.API_URL}/auth`, 'Auth')
    },

    logout () {
      this.$store.dispatch("user/logout")
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => console.error(error.message))
    },
  },
}

/**
 * VueJS OAuth popup block fix for Safari and Firefox
 *
 * @param  {Object} options
 * @return {Window}
 * @reference https://gist.github.com/jrosczyk/0edaeb1ba7787ce7086a63c211dbc223
 */
function openWindow (url, title, options = {}) {
  if (typeof url === 'object') {
    options = url
    url = ''
  }
  options = { url, title, width: 500, height: 800, ...options }
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
  const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
  options.self = "_self"
  options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
  options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
  const optionsStr = Object.keys(options).reduce((acc, key) => {
    acc.push(`${key}=${options[key]}`)
    return acc
  }, []).join(',')
  const newWindow = window.open(url, title, optionsStr)
  if (!newWindow) {
    console.log('Please unblock popups in your browser settings for authentication.')
  } else if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}
</script>
