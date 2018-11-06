<i18n>
  {
    "en": {
      "all": "All",
      "find": "Found",
      "lost": "Lost",
      "typeMarker": "Marker Type",
      "petType": "Kind of pet",
      "petBreed": "Pet Breed",
      "petAge": "Pet Age",
      "petAgeSuffix": "yr",
      "petColor": "Pet color",
      "petColoring": "Pet coloring",
      "radius": "Search radius",
      "radiusSuffix": "km"
    },
    "ua": {
      "all": "Всі",
      "find": "Знайдено",
      "lost": "Загублено",
      "typeMarker": "Тип маркера",
      "petType": "Вид тварини",
      "petBreed": "Порода тварини",
      "petAge": "Вік тварин:",
      "petAgeSuffix": "рік",
      "petColor": "Колір тварини",
      "petColoring": "Окрас тварини",
      "radius": "Радіус пошуку",
      "radiusSuffix": "км"
    },
    "ru": {
      "all": "Всe",
      "find": "Найдено",
      "lost": "Потеряно",
      "typeMarker": "Тип маркера",
      "petType": "Вид животного",
      "petBreed": "Порода животного",
      "petAge": "Возраст животного",
      "petAgeSuffix": "год",
      "petColor": "Цвет животного",
      "petColoring": "Окрас животного",
      "radius": "Радиус поиска",
      "radiusSuffix": "км"
    }
  }
</i18n>

<template>
  <v-layout class="filters" wrap>
    <v-flex xs12>
      <v-select
        :items="typeMarkers"
        v-model="filterAdvert.typeMarker"
        :label="$t('typeMarker')"
        @change="onUpdateFilter('typeMarker', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="petTypes"
        v-model="filterAdvert.id_pet_type"
        :label="$t('petType')"
        @change="onUpdateFilter('id_pet_type', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12 v-show="filterAdvert.id_pet_type && filterAdvert.id_pet_type != 'all'">
      <v-select
        :items="petBreeds"
        v-model="filterAdvert.id_pet_breed"
        :label="$t('petBreed')"
        @change="onUpdateFilter('id_pet_breed', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field :mask="maskPetAge" v-model="filterAdvert.petAge" :label="$t('petAge')" :suffix="$t('petAgeSuffix')" @change="onUpdateFilter('petAge', $event)"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="petColors"
        v-model="filterAdvert.id_pet_color"
        :label="$t('petColor')"
        multiple
        @change="onUpdateFilter('id_pet_color', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-select
        :items="petColorings"
        v-model="filterAdvert.id_pet_coloring"
        :label="$t('petColoring')"
        @change="onUpdateFilter('id_pet_coloring', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs12>
      <v-text-field v-model="filterAdvert.radius" :mask="maskRadius" :label="$t('radius')" :suffix="$t('radiusSuffix')" @change="onUpdateFilter('radius', $event)"></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'advert-filter',
  computed: {
    typeMarkers() {
      const result = this.$store.getters.typeMarkers.map(value => ({
        text: this.$t(value),
        value,
      }));
      this.addOptionAll(result);
      return result;
    },
    petTypes() {
      const result = this.$store.getters.dataOfTableForSelect('petTypes');
      this.addOptionAll(result);
      return result;
    },
    petColors() {
      return this.$store.getters.dataOfTableForSelect('petColors');
    },
    petColorings() {
      const result = this.$store.getters.dataOfTableForSelect('petColorings');
      this.addOptionAll(result);
      return result;
    },
    filterAdvert() {
      return this.$store.getters.filterAdvert;
    },
  },
  data() {
    return {
      petBreeds: [],
      maskPetAge: '##',
      maskRadius: '#####',
    };
  },
  methods: {
    onUpdateFilter(typeFilter, value) {
      if (typeFilter === 'id_pet_type') {
        this.$store.dispatch('updateAdvertFilter', {
          typeFilter: 'id_pet_breed',
          value: 'all',
        });
        const petBreeds = this.$store.getters.dataPetBreedsForSelect(value);
        this.addOptionAll(petBreeds);
        this.petBreeds = petBreeds;
      }
      this.$store.dispatch('updateAdvertFilter', { typeFilter, value });
    },
    addOptionAll(result) {
      result.unshift({ text: this.$t('all'), value: 'all' });
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
