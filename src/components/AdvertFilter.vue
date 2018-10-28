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
        :items="petTypes"
        v-model="filterAdvert.petType"
        label="Вид тварини"
        @change="onUpdateFilter('petType', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12 v-show="filterAdvert.petType">
      <v-select
        :items="petBreeds[filterAdvert.petType]"
        v-model="filterAdvert.petBreed"
        label="Порода тварини"
        @change="onUpdateFilter('petBreed', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field :mask="maskPetAge" v-model="filterAdvert.petAge" label="Вік тварини" suffix="рік" @change="onUpdateFilter('petAge', $event)"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="petColors"
        v-model="filterAdvert.petColor"
        label="Колір тварини"
        multiple
        @change="onUpdateFilter('petColor', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="petColorings"
        v-model="filterAdvert.petColoring"
        label="Окраса тварини"
        @change="onUpdateFilter('petColoring', $event)"
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
    petTypes() {
      return this.$store.getters.petTypes;
    },
    petBreeds() {
      return this.$store.getters.petBreeds;
    },
    petColors() {
      return this.$store.getters.petColors;
    },
    petColorings() {
      return this.$store.getters.petColorings;
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
      maskPetAge: '##',
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
