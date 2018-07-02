<template>
  <GmapMarker
    :position="markerData.position"
    :clickable="true"
    @click="toggleInfoWindow"/>
</template>

<script>

export default {
  name: 'advert-marker',
  props: {
    markerData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    toggleInfoWindow() {
      this.$store.dispatch('updateInfoWindow', this.markerData);
    },
  },
};
</script>