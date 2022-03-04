<template>
  <div>
    <router-link to="/">Go to Home page</router-link>
    <div v-if="this.isLoggedIn"></div>
    <div v-else>
      <a href="/api/spotify/login">Spotify Login</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Spotify",
  metaInfo: {
    title: "Spotify Demo",
    meta: [
      { name: "description", content: "A Vue SSR demo utilizing Spotify API" },
    ],
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
    }),
  },
};
</script>
