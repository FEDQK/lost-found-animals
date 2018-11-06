<template>
  <section class="profile">
    <v-toolbar color="main">
      <v-toolbar-title class="title">Мои обявления</v-toolbar-title>
    </v-toolbar>
    <v-container class="scroll-y adverts-container">
      <v-layout style="height: auto;">
        <v-flex>
          <v-card v-for="(advert, index) in userAdverts" :key="index" class="advert">
            <v-card-media class="advert-photo" height="200" :src="advert.photoUrl"></v-card-media>
            <v-card-text>{{advert.contactInfo}}</v-card-text>
          </v-card>
        </v-flex>
        
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {};
  },
  computed: {
    userAdverts() {
      return this.$store.getters.userAdverts;
    },
    containerHeight() {
      return window.innerHeight - 112;
    },
  },
  methods: {},
};
</script>

<style scoped>
.profile {
  height: 100%;
}
.title {
  color: #fff;
}
.adverts-container::-webkit-scrollbar-track {
  background-color: #fafafa;
}

.adverts-container::-webkit-scrollbar {
  width: 5px;
}

.adverts-container::-webkit-scrollbar-thumb {
  background-color: #292d33;
}
.advert {
  display: flex;
  margin-bottom: 15px;
}
.advert-photo {
  width: 60%;
}
</style>
