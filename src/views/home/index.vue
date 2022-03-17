<template>
  <div class="app-wrapper">
    <Spotify v-if="this.isLoggedIn"></Spotify>
    <div v-else>
      <users-list :users="users"></users-list>
      <button @click="fetchCollection">Fetch Collection</button>
      <a href="/api/spotify/login">Spotify Login</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UsersList from "../../components/users-list/index.vue";
import Spotify from "../spotify/index.vue";

export default {
  name: "Home",

  metaInfo: {
    title: "Vue SSR Simple Setup Home",
    meta: [{ name: "description", content: "Home page description" }],
  },

  components: {
    UsersList,
    Spotify,
  },

  computed: {
    ...mapGetters(["users", "isLoggedIn"]),
  },

  data() {
    return {
      routeQuery: this.$route.query,
    };
  },

  methods: {
    ...mapActions({
      getCollections: "getCollections",
      fetchUsers: "getUsers",
      updateAuth: "setAuthData",
      logout: "logout",
      init: "initializeAuthData",
    }),
    fetchCollection() {
      this.getCollections();
    },
    checkQueryToken() {
      const hasSuccess = this.routeQuery.success || false;
      if (hasSuccess) {
        const { access_token, expires_in, refresh_token } = this.routeQuery;
        this.updateAuth({ access_token, expires_in, refresh_token });
        this.$router.push("spotify");
      }
    },
  },

  // Server-side only
  serverPrefetch() {
    // return the Promise from the action so that the component waits before rendering
    return this.fetchUsers();
  },

  created() {
    this.checkQueryToken();
  },

  // Client-side only
  beforeMount() {
    this.init();
  },

  mounted() {
    // If we didn't already do it on the server, we fetch the users
    if (!this.users.length) {
      this.fetchUsers();
    }

    if (this.routeQuery !== null) {
      this.$router.replace({ query: null });
    }
  },
};
</script>
