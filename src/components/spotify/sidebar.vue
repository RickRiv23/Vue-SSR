<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h3>Spotify Demo</h3>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-content-item">
        <router-link to="/">Home</router-link>
      </div>
      <div class="sidebar-content-item">
        <router-link to="/spotify">Spotify</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style></style>
