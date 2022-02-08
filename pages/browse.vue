<template>
  <v-container fluid>
    <v-data-iterator
      :items="guilds"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      disable-filtering
      disable-pagination
      hide-default-footer
    >
      <template #default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="6"
            lg="4"
          >
            <v-card>
              <v-list-item three-line>
                <v-list-item-avatar size="80">
                  <v-img
                    :src="
                      'https://cdn.discordapp.com/icons/' +
                      item.id +
                      '/' +
                      item.icon +
                      '.jpg'
                    "
                  >
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-1">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      v-if="item.owner"
                      class="ma-2"
                      color="warning"
                      outlined
                    >
                      <v-icon left> mdi-crown </v-icon>
                      Owner
                    </v-chip>
                    <v-chip
                      v-if="!item.owner && item.bot_master"
                      class="ma-2"
                      color="info"
                      outlined
                    >
                      <v-icon left> mdi-shield-crown </v-icon>
                      Bot Master
                    </v-chip>
                    <v-chip
                      v-if="!item.owner && !item.bot_master"
                      class="ma-2"
                      color="primary"
                      outlined
                    >
                      <v-icon left> mdi-account </v-icon>
                      Member
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-spacer />
                <v-btn :to="'/guild/' + item.id + '/profile'" color="grey" nuxt>
                  <v-icon left>mdi-account</v-icon> Profile
                </v-btn>
                <v-btn
                  color="primary"
                  :to="'/guild/' + item.id"
                  :disabled="!item.owner && !item.bot_master"
                  nuxt
                >
                  <v-icon v-if="guilds.leaved_at !== null" left>mdi-cog</v-icon> Dashboard
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <v-overlay :opacity="1" :value="overlay" color="#332F63">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BrowsePage',

  middleware: 'authenticated',

  data () {
    return {
      sortBy: ['owner', 'bot_master'],
      sortDesc: [true, true],
      overlay: true
    }
  },

  computed: {
    ...mapGetters({
      guilds: 'user/getGuilds'
    })
  },

  mounted () {
    this.$store.dispatch("user/getGuilds")
      .then((response) => {
        this.overlay = false
      })
      .catch(error => console.error(error.message))
  },
}
</script>
