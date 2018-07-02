<template>
  <v-layout class="filters" wrap>
    <v-flex xs12>
      <v-select
        :items="typeMarkers"
        v-model="filterAdvert.typeMarker"
        label="Тип маркера"
        @change="onUpdateFilter('typeMarker', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="animalTypes"
        v-model="filterAdvert.animalType"
        label="Вид тварини"
        @change="onUpdateFilter('animalType', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12 v-show="filterAdvert.animalType">
      <v-select
        :items="animalBreeds[filterAdvert.animalType]"
        v-model="filterAdvert.animalBreed"
        label="Порода тварини"
        @change="onUpdateFilter('animalBreed', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field :mask="maskAnimalAge" v-model="filterAdvert.animalAge" label="Вік тварини" suffix="рік" @change="onUpdateFilter('animalAge', $event)"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="animalColors"
        v-model="filterAdvert.animalColor"
        label="Колір тварини"
        multiple
        @change="onUpdateFilter('animalColor', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="animalColorings"
        v-model="filterAdvert.animalColoring"
        label="Окраса тварини"
        @change="onUpdateFilter('animalColoring', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field v-model="filterAdvert.radius" :mask="maskRadius" label="Радіус пошуку" suffix="км" @change="onUpdateFilter('radius', $event)"></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'advert-filter',
  computed: {
    animalTypes() {
      return this.$store.getters.animalTypes;
    },
    animalBreeds() {
      return this.$store.getters.animalBreeds;
    },
    animalColors() {
      return this.$store.getters.animalColors;
    },
    animalColorings() {
      return this.$store.getters.animalColorings;
    },
    filterAdvert() {
      return this.$store.getters.filterAdvert;
    },
  },
  data() {
    return {
      typeMarkers: [
        { text: 'Знайдено', value: 'find' },
        { text: 'Загублено', value: 'lost' },
      ],
      maskAnimalAge: '##',
      maskRadius: '#####',
    };
  },
  methods: {
    onUpdateFilter(typeFilter, value) {
      this.$store.dispatch('updateAdvertFilter', { typeFilter, value });
    },
  },
};
</script>

<style scoped>
  .filters {
    justify-content: space-between;
  }
  .filters > .flex {
    align-items: center;
    display: flex;
    max-width: 30%;
  }
</style>
