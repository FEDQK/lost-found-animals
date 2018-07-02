<template>
  <v-app>
    <main-map></main-map>
  </v-app>
</template>

<script>
import MainMap from './components/MainMap';

export default {
  data() {
    return {};
  },
  name: 'App',
  components: {
    MainMap,
  },
};
</script>
