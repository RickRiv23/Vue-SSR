<template>
  <div>
    <router-link to="/spotify">Go to Spotify page</router-link>
    <users-list :users="users"></users-list>
    <button @click="fetchCollection">Fetch Collection</button>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
    <!-- <button type="button" @click="login" v-else>Spotify Login</button> -->
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
    ...mapGetters(["users", "isLoggedIn"]),
  },

  data() {
    return {
      tokenHolder: null,
      routeQuery: () => {
        return this.$route.query;
      },
    };
  },

  methods: {
    ...mapActions({
      getCollections: "getCollections",
      // login: "login",
      fetchUsers: "getUsers",
      updateAuth: "setAuthData",
      logout: "logout",
    }),
    fetchCollection() {
      this.getCollections();
    },
  },

  // Server-side only
  serverPrefetch() {
    // return the Promise from the action so that the component waits before rendering
    return this.fetchUsers();
  },

  created() {
    const hasSuccess = this.routeQuery.success || false;
    if (hasSuccess) {
      const { access_token, expires_in, refresh_token } = this.routeQuery;

      this.updateAuth({ access_token, expires_in, refresh_token });
    }
  },

  // Client-side only
  beforeMount() {
    if (!this.isLoggedIn && this.routeQuery) {
      window.localStorage.setItem("token", { ...this.routeQuery });
    }
  },
  mounted() {
    // If we didn't already do it on the server, we fetch the users
    if (!this.users.length) {
      this.fetchUsers();
    }

    if (this.routeQuery !== null) {
      this.$router.push({ path: "/", query: null });
    }
  },
};
</script>
