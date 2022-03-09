<template>
  <div>
    <button @click="logout">Logout</button>
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
  methods: {
    ...mapActions({
      logout: "logout",
    }),
  },
};
</script>
