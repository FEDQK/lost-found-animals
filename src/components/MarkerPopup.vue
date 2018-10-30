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
                  :items="petTypes"
                  v-model="petType"
                  label="Вид тварини"
                  required
                  :rules="petTypeRules"
                  @change="onChangePetType"
                ></v-select>
              </v-flex>
              <v-flex xs12 v-show="petType">
                <v-select
                  :items="petBreeds"
                  v-model="petBreed"
                  label="Порода тварини"
                  required
                  :rules="petBreedRules"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-text-field required :rules="petAgeRules" :mask="maskPetAge" v-model="petAge" label="Вік тварини" suffix="рік"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="petColors"
                  v-model="petColor"
                  label="Колір тварини"
                  required
                  multiple
                  chips
                  :rules="petColorRules"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="petColorings"
                  v-model="petColoring"
                  label="Окраса тварини"
                  required
                  :rules="petColoringRules"
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
        this.petType = dataEditAdvert.advertInfo.petType;
        this.petBreed = dataEditAdvert.advertInfo.petBreed;
        this.petColor = dataEditAdvert.advertInfo.petColor;
        this.petColoring = dataEditAdvert.advertInfo.petColoring;
        this.typeMarker = dataEditAdvert.advertInfo.typeMarker;
        this.photoUrl = dataEditAdvert.advertInfo.photoUrl;
        this.contactInfo = dataEditAdvert.advertInfo.contactInfo;
        this.petAge = dataEditAdvert.advertInfo.petAge;
        this.editAdvertId = dataEditAdvert.id;
        this.isEditMode = true;
      }
    });
  },
  data() {
    return {
      petBreeds: [],
      petType: null,
      petBreed: null,
      petColor: [],
      petColoring: null,
      typeMarker: 'find',
      photoUrl: '',
      contactInfo: '',
      petAge: null,
      isValidForm: true,
      maskPetAge: '##',
      isEditMode: false,
      editAdvertId: null,
      petAgeRules: [v => !!v || "Вік тварини обов'язковий"],
      contactInfoRules: [v => !!v || "Контактна інформація обов'язкова"],
      photoUrlRules: [v => !!v || "Фотографія обов'язкова"],
      petTypeRules: [v => !!v || "Вид тварини обов'язковий"],
      petBreedRules: [v => !!v || "Порода тварини обов'язкова"],
      petColorRules: [v => v.length > 0 || "Колір тварини обов'язковий"],
      petColoringRules: [v => !!v || "Окраса тварини обов'язкова"],
    };
  },
  computed: {
    active() {
      return this.$store.state.visibleMarkerPopup;
    },
    locale() {
      return this.$store.state.locale;
    },
    petTypes() {
      return this.$store.getters.dataOfTableForSelect('petTypes');
    },
    petColors() {
      return this.$store.getters.dataOfTableForSelect('petColors');
    },
    petColorings() {
      return this.$store.getters.dataOfTableForSelect('petColorings');
    },
  },
  methods: {
    createMarker() {
      if (this.$refs.form.validate()) {
        const newMarker = {
          typeMarker: this.typeMarker,
          petType: this.petType,
          petBreed: this.petBreed,
          petAge: String(Number(this.petAge)),
          petColor: this.petColor,
          petColoring: this.petColoring,
          contactInfo: this.contactInfo,
          photoUrl: this.photoUrl,
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
          petType: this.petType,
          petBreed: this.petBreed,
          petAge: String(Number(this.petAge)),
          petColor: this.petColor,
          petColoring: this.petColoring,
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
    onChangePetType(value) {
      if (value !== this.petType) {
        this.petBreed = null;
        this.petBreeds = this.$store.getters.dataPetBreedsForSelect(value);
      }
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
  color: rgba(0, 0, 0, 0.87);
}
.form-buttons {
  padding: 0 16px 16px;
}
.content {
  padding-bottom: 0;
}
</style>
