<template>
  <v-dialog v-model="active" persistent max-width="400">
    <v-form ref="form" v-model="isValidForm">
      <v-card>
        <v-card-title class="headline">{{ isEditMode ? 'Оновити маркер' : 'Додати маркер'}}</v-card-title>
        <v-card-text class="content">
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-radio-group class="type-marker" v-model="typeMarker">
                  <v-radio label="Знайдена" :value="'find'" color="primary"></v-radio>
                  <v-radio label="Загублена" :value="'lost'" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="animalTypes"
                  v-model="animalType"
                  label="Вид тварини"
                  required
                  :rules="animalTypeRules"
                  @change="onChangeAnimalType"
                ></v-select>
              </v-flex>
              <v-flex xs12 v-show="animalType">
                <v-select
                  :items="animalBreeds[animalType]"
                  v-model="animalBreed"
                  label="Порода тварини"
                  required
                  :rules="animalBreedRules"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-text-field required :rules="animalAgeRules" :mask="maskAnimalAge" v-model="animalAge" label="Вік тварини" suffix="рік"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="animalColors"
                  v-model="animalColor"
                  label="Колір тварини"
                  required
                  multiple
                  chips
                  :rules="animalColorRules"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="animalColorings"
                  v-model="animalColoring"
                  label="Окраса тварини"
                  required
                  :rules="animalColoringRules"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field required :rows="3" :rules="contactInfoRules" v-model="contactInfo" label="Контактна інформація" textarea no-resize></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field required :rules="photoUrlRules" v-model="photoUrl" label="Фотографія"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="form-buttons">
          <v-layout justify-center v-if="!isEditMode">
              <v-btn color="info" depressed @click="createMarker">Так</v-btn>
              <v-btn color="error" depressed @click="hidePopup">Ні</v-btn>
          </v-layout>
          <v-layout justify-center v-else>
              <v-btn color="info" depressed @click="onUpdateAdvertInfo">Оновити</v-btn>
              <v-btn color="error" depressed @click="onCancelEdit">Відмінити</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'marker-popup',
  props: {
    latLng: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.$bus.$on('editAdvert', () => {
      const dataEditAdvert = this.$store.getters.dataEditAdvert;
      if (dataEditAdvert) {
        this.animalType = dataEditAdvert.advertInfo.animalType;
        this.animalBreed = dataEditAdvert.advertInfo.animalBreed;
        this.animalColor = dataEditAdvert.advertInfo.animalColor;
        this.animalColoring = dataEditAdvert.advertInfo.animalColoring;
        this.typeMarker = dataEditAdvert.advertInfo.typeMarker;
        this.photoUrl = dataEditAdvert.advertInfo.photoUrl;
        this.contactInfo = dataEditAdvert.advertInfo.contactInfo;
        this.animalAge = dataEditAdvert.advertInfo.animalAge;
        this.editAdvertId = dataEditAdvert.id;
        this.isEditMode = true;
      }
    });
  },
  data() {
    return {
      animalType: null,
      animalBreed: null,
      animalColor: [],
      animalColoring: null,
      typeMarker: 'find',
      photoUrl: '',
      contactInfo: '',
      animalAge: null,
      isValidForm: true,
      maskAnimalAge: '##',
      isEditMode: false,
      editAdvertId: null,
      animalAgeRules: [
        v => !!v || 'Вік тварини обов\'язковий',
      ],
      contactInfoRules: [
        v => !!v || 'Контактна інформація обов\'язкова',
      ],
      photoUrlRules: [
        v => !!v || 'Фотографія обов\'язкова',
      ],
      animalTypeRules: [
        v => !!v || 'Вид тварини обов\'язковий',
      ],
      animalBreedRules: [
        v => !!v || 'Порода тварини обов\'язкова',
      ],
      animalColorRules: [
        v => v.length > 0 || 'Колір тварини обов\'язковий',
      ],
      animalColoringRules: [
        v => !!v || 'Окраса тварини обов\'язкова',
      ],
    };
  },
  computed: {
    active() {
      return this.$store.state.visibleMarkerPopup;
    },
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
  },
  methods: {
    createMarker() {
      if (this.$refs.form.validate()) {
        const newMarker = {
          advertInfo: {
            typeMarker: this.typeMarker,
            animalType: this.animalType,
            animalBreed: this.animalBreed,
            animalAge: String(Number(this.animalAge)),
            animalColor: this.animalColor,
            animalColoring: this.animalColoring,
            contactInfo: this.contactInfo,
            photoUrl: this.photoUrl,
          },
          position: this.latLng,
        };
        this.$store.dispatch('createAdvert', newMarker);
        this.hidePopup();
      }
    },
    onUpdateAdvertInfo() {
      if (this.$refs.form.validate()) {
        const newAdvertInfo = {
          id: this.editAdvertId,
          typeMarker: this.typeMarker,
          animalType: this.animalType,
          animalBreed: this.animalBreed,
          animalAge: String(Number(this.animalAge)),
          animalColor: this.animalColor,
          animalColoring: this.animalColoring,
          contactInfo: this.contactInfo,
          photoUrl: this.photoUrl,
        };
        this.$store.dispatch('updateAdvert', newAdvertInfo);
        this.onCancelEdit();
      }
    },
    hidePopup() {
      this.$refs.form.reset();
      this.typeMarker = 'find';
      this.$store.commit('showMarkerPopup', false);
    },
    onChangeAnimalType() {
      this.animalBreed = null;
    },
    onCancelEdit() {
      this.hidePopup();
      setTimeout(() => {
        this.isEditMode = false;
      }, 200);
    },
  },
};
</script>

<style scoped>
  .headline {
    padding-bottom: 0;
    justify-content: center;
  }
  .type-marker {
    padding-top: 0;
  }
  .type-marker >>> label {
    color: rgba(0,0,0,.87);
  }
  .form-buttons {
    padding: 0 16px 16px;
  }
  .content {
    padding-bottom: 0;
  }
</style>
