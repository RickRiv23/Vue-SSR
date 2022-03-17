<template>
  <div class="app-container">
    <Sidebar></Sidebar>
    <ContentContainer></ContentContainer>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Sidebar from "../../components/spotify/sidebar.vue";
import ContentContainer from "../../components/spotify/contentContainer.vue";

export default {
  name: "Spotify",
  metaInfo: {
    title: "Spotify Demo",
    meta: [
      { name: "description", content: "A Vue SSR demo utilizing Spotify API" },
    ],
  },
  components: {
    Sidebar,
    ContentContainer,
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
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>
