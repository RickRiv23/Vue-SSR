<template>
  <div>
    <router-link to="/about">Go to About page</router-link>
    <users-list :users="users"></users-list>
    <button @click="fetchCollection">Fetch Collection</button>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
    <a href="/api/spotify/login" v-else>Spotify Login</a>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UsersList from "./components/users-list/index.vue";

export default {
  name: "Home",

  metaInfo: {
    title: "Vue SSR Simple Setup Home",
    meta: [{ name: "description", content: "Home page description" }],
  },

  components: {
    UsersList,
  },

  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
    }),
    ...mapGetters({
      users: "users",
    }),
  },

  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch() {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchUsers();
  },

  // Client-side only
  created() {
    // let tokenData = this.localStorage.tokenData;
    let tokenData;
    if (this.$route.hash && !tokenData) {
      const hash = this.$route.hash.substr(1);

      hash.split("&").forEach((item) => {
        const [key, value] = item.split("=");
        tokenData = {
          ...tokenData,
          [key]: value,
        };
      });

      // this.localStorage.tokenData = JSON.stringify(tokenData);
      this.updateAuth(tokenData);
    } else {
      this.updateAuth(tokenData);
    }
  },

  mounted() {
    // If we didn't already do it on the server, we fetch the users
    if (!this.users.length) {
      this.fetchUsers();
    }

    if (this.$route.hash) {
      this.$router.push("/");
    }
  },

  methods: {
    ...mapActions({
      getCollections: "getCollections",
    }),
    fetchUsers() {
      return this.$store.dispatch("getUsers");
    },
    fetchCollection() {
      this.getCollections();
    },
    updateAuth(tokenData) {
      this.$store.dispatch("updateSpotifyAuth", tokenData);
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
