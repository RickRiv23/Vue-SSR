<template>
  <div>
    <router-link to="/about">Go to About page</router-link>
    <users-list :users="users"></users-list>
    <button @click="fetchCollection">Fetch Collection</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  mounted() {
    // If we didn't already do it on the server, we fetch the users
    if (!this.users.length) {
      this.fetchUsers();
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
  },
};
</script>
