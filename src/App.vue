<template>
  <v-app>
    <router-view></router-view>
    <navigation></navigation>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  data() {
    return {};
  },
  name: 'App',
  components: {
    Navigation,
  },
};
</script>
