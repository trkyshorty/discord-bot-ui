<template>
  <v-app>
    <Navigation v-if="$route.name !== 'auth-callback'" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer v-if="$route.name !== 'auth-callback'" />
  </v-app>

</template>
<script>

export default {
  name: 'DefaultLayout',
  data: () => ({
  }),
}

</script>
