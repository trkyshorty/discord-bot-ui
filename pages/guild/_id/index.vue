<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card rounded="lg" min-height="268" class="d-flex flex-column">
          <v-card-title class="justify-center">
            <v-avatar size="56">
              <v-img
                v-if="guild"
                :src="
                  'https://cdn.discordapp.com/icons/' +
                  guild.id +
                  '/' +
                  guild.icon +
                  '.jpg'
                "
              >
              </v-img>
            </v-avatar>
          </v-card-title>
          <v-card-text v-if="guild" class="text-white text-center"
            >{{ guild.name }}

            <v-list class="text-center">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> </v-list-item-title>
                  <v-list-item-subtitle> </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> </v-list
          ></v-card-text>

          <v-spacer></v-spacer>
          <v-card-actions class="justify-center">
            <v-btn color="secondary" @click="addToServer($route.params.id)">
              <v-icon>mdi-door</v-icon> Add To Server
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="9">
        <v-sheet min-height="70vh" rounded="lg">
          <v-container>
            <v-row>
              <v-col v-for="card in cards" :key="card.title" cols="12" sm="4">
                <v-card
                  class="primary"
                  :to="'/guild/' + $route.params.id + card.path"
                  nuxt
                >
                  <v-list-item three-line>
                    <v-icon left size="72">{{ card.icon }}</v-icon>
                    <v-list-item-content>
                      <div class="text-overline mb-4">{{ card.title }}</div>
                      <v-list-item-subtitle>{{
                        card.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions> </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-overlay :opacity="1" :value="overlay" color="#332F63">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GuildIndexPage',

  middleware: 'authenticated',

  data: () => ({
    cards: [
      { title: 'Welcome', path: '/welcome', description: 'Customize powerful moderation commands', icon: 'mdi-human-greeting' },
      { title: 'Special Commands', path: '/special-commands', description: 'Customize powerful moderation commands', icon: 'mdi-apple-keyboard-command' },
      { title: 'Moderation', path: '/moderation', description: 'Customize powerful moderation commands', icon: 'mdi-security' },
      { title: 'Level', path: '/level', description: 'Users earn experience and level by joining the chat', icon: 'mdi-rocket-launch' },
      { title: 'Reaction Role', path: '/reaction-role', description: 'Users earn experience and level by joining the chat', icon: 'mdi-gesture-double-tap' },
      { title: 'Music', path: '/music', description: 'Customize powerful moderation commands', icon: 'mdi-music' },
      { title: 'Stream Alerts', path: '/stream-alerts', description: 'Customize powerful moderation commands', icon: 'mdi-bell' },
      { title: 'Temp Channels', path: '/temp-channels', description: 'Customize powerful moderation commands', icon: 'mdi-clock-time-one-outline' },
    ],
    overlay: true
  }),
  computed: {
    ...mapGetters({
      guild: 'guild/getGuild'
    })
  },

  mounted () {
    this.$store.dispatch("guild/getGuild", {
      guild_id: this.$route.params.id
    })
      .then(() => {
        this.overlay = false
      })
      .catch(() =>
        this.$router.push("/browse")
      )
  },

  methods: {
    addToServer (guildId) {
      openWindow(`${process.env.API_URL}/bot/${guildId}`, 'Auth')
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
