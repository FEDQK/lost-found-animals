<template>
  <v-bottom-nav :value="true" class="main-menu" color="main">
    <v-btn
      v-for="(item, index) in navigationMenu"
      :to="item.path"
      :key="index"
      exact>
      <span class="white--text">{{ item.title }}</span>
      <v-icon class="white--text">{{ item.icon }}</v-icon>
    </v-btn>
    <v-btn v-show="user" class="logout" @click="onLogout">
      <v-icon class="white--text" >
        exit_to_app
      </v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    navigationMenu() {
      return this.$store.getters.navigationMenu;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.logout {
  position: absolute;
  width: auto;
  right: 0;
  color: #fff;
  opacity: 0.8;
}
</style>