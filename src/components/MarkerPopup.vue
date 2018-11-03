<i18n>
  {
    "en": {
      "headlineUpdate": "Update marker",
      "headlineCreate": "Add marker",
      "labelFind": "Found",
      "labelLost": "Lost",
      "labelPetType": "Kind of pet",
      "labelPetBreed": "Pet breed",
      "labelPetAge": "Age og pet",
      "labelPetAgeSuffix": "yr",
      "labelPetColor": "Pet color",
      "labelPetColoring": "Pet coloring",
      "labelContactInfo": "Contact Information",
      "labelPhotoUrl": "Photo",
      "buttonCreateMarker": "Yes",
      "buttonCancelCreateMarker": "No",
      "buttonUpdateAdvert": "Update",
      "buttonCancelUpdateAdvert": "Cancel",
      "petAgeRules": "The age of the pet is required",
      "contactInfoRules": "Contact information is required",
      "photoUrlRules": "Photo required",
      "petTypeRules": "Type of pet required",
      "petBreedRules": "Breed pet required",
      "petColorRules": "The color of the pet is required",
      "petColoringRules": "Pet coloring is required"
    },
    "ua": {
      "headlineUpdate": "Оновити маркер",
      "headlineCreate": "Додати маркер",
      "labelFind": "Знайдена",
      "labelLost": "Загублена",
      "labelPetType": "Вид тварини",
      "labelPetBreed": "Порода тварини",
      "labelPetAge": "Вік тварини",
      "labelPetAgeSuffix": "рік",
      "labelPetColor": "Колір тварини",
      "labelPetColoring": "Окраса тварини",
      "labelContactInfo": "Контактна інформація",
      "labelPhotoUrl": "Фотографія",
      "buttonCreateMarker": "Так",
      "buttonCancelCreateMarker": "Hi",
      "buttonUpdateAdvert": "Оновити",
      "buttonCancelUpdateAdvert": "Відмінити",
      "petAgeRules": "Вік тварини обов'язковий",
      "contactInfoRules": "Контактна інформація обов'язкова",
      "photoUrlRules": "Фотографія обов'язкова",
      "petTypeRules": "Вид тварини обов'язковий",
      "petBreedRules": "Порода тварини обов'язкова",
      "petColorRules": "Колір тварини обов'язковий",
      "petColoringRules": "Окраса тварини обов'язкова"
    },
    "ru": {
      "headlineUpdate": "Обновить маркер",
      "headlineCreate": "Добавить маркер",
      "labelFind": "Найдена",
      "labelLost": "Потерянная",
      "labelPetType": "Вид животного",
      "labelPetBreed": "Порода животного",
      "labelPetAge": "Возраст животного",
      "labelPetAgeSuffix": "год",
      "labelPetColor": "Цвет животного",
      "labelPetColoring": "Окраса животного",
      "labelContactInfo": "Контактная информация",
      "labelPhotoUrl": "Фотография",
      "buttonCreateMarker": "Да",
      "buttonCancelCreateMarker": "Нет",
      "buttonUpdateAdvert": "Обновить",
      "buttonCancelUpdateAdvert": "Отменить",
      "petAgeRules": "Возраст животного обязателен",
      "contactInfoRules": "Контактная информация обязательная",
      "photoUrlRules": "Фотография обязательна",
      "petTypeRules": "Вид животного обязателеная",
      "petBreedRules": "Порода животного обязательна",
      "petColorRules": "Цвет животного обязательна",
      "petColoringRules": "Окраса животного обязательна"
    }
  }
</i18n>

<template>
  <v-dialog v-model="active" persistent max-width="400">
    <v-form ref="form" v-model="isValidForm">
      <v-card>
        <v-card-title class="headline">{{ isEditMode ? $t('headlineUpdate') : $t('headlineCreate')}}</v-card-title>
        <v-card-text class="content">
          <v-container>
            <v-layout wrap>
              <v-flex xs12>
                <v-radio-group class="type-marker" v-model="typeMarker">
                  <v-radio :label="$t('labelFind')" :value="'find'" color="primary"></v-radio>
                  <v-radio :label="$t('labelLost')" :value="'lost'" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="petTypes"
                  v-model="petType"
                  :label="$t('labelPetType')"
                  required
                  :rules="petTypeRules"
                  @change="onChangePetType"
                ></v-select>
              </v-flex>
              <v-flex xs12 v-show="petType">
                <v-select
                  :items="petBreeds"
                  v-model="petBreed"
                  :label="$t('labelPetBreed')"
                  required
                  :rules="petBreedRules"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-text-field required :rules="petAgeRules" :mask="maskPetAge" v-model="petAge" :label="$t('labelPetAge')" :suffix="$t('labelPetAgeSuffix')"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="petColors"
                  v-model="petColor"
                  :label="$t('labelPetColor')"
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
                  :label="$t('labelPetColoring')"
                  required
                  :rules="petColoringRules"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field required :rows="3" :rules="contactInfoRules" v-model="contactInfo" :label="$t('labelContactInfo')" textarea no-resize></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field required :rules="photoUrlRules" v-model="photoUrl" :label="$t('labelPhotoUrl')"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions class="form-buttons">
          <v-layout justify-center v-if="!isEditMode">
              <v-btn color="info" depressed @click="createMarker">{{ $t('buttonCreateMarker') }}</v-btn>
              <v-btn color="error" depressed @click="hidePopup">{{ $t('buttonCancelCreateMarker') }}</v-btn>
          </v-layout>
          <v-layout justify-center v-else>
              <v-btn color="info" depressed @click="onUpdateAdvertInfo">{{ $t('buttonUpdateAdvert') }}</v-btn>
              <v-btn color="error" depressed @click="onCancelEdit">{{ $t('buttonCancelUpdateAdvert') }}</v-btn>
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
        this.petType = dataEditAdvert.id_pet_type;
        this.petBreed = dataEditAdvert.id_pet_breed;
        this.petColor = dataEditAdvert.id_pet_color;
        this.petColoring = dataEditAdvert.id_pet_coloring;
        this.typeMarker = dataEditAdvert.typeMarker;
        this.photoUrl = dataEditAdvert.photoUrl;
        this.contactInfo = dataEditAdvert.contactInfo;
        this.petAge = dataEditAdvert.petAge;
        this.editAdvertId = dataEditAdvert.id;
        this.loadedPetBreeds(this.petType);
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
      petAgeRules: [v => !!v || this.$t('petAgeRules')],
      contactInfoRules: [v => !!v || this.$t('contactInfoRules')],
      photoUrlRules: [v => !!v || this.$t('photoUrlRules')],
      petTypeRules: [v => !!v || this.$t('petTypeRules')],
      petBreedRules: [v => !!v || this.$t('petBreedRules')],
      petColorRules: [v => v.length > 0 || this.$t('petColorRules')],
      petColoringRules: [v => !!v || this.$t('petColoringRules')],
    };
  },
  computed: {
    active() {
      return this.$store.state.visibleMarkerPopup;
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
          id_pet_type: this.petType,
          id_pet_breed: this.petBreed,
          petAge: String(Number(this.petAge)),
          id_pet_color: this.petColor,
          id_pet_coloring: this.petColoring,
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
    loadedPetBreeds(petType) {
      this.petBreeds = this.$store.getters.dataPetBreedsForSelect(petType);
    },
    onChangePetType(value) {
      if (value !== this.petType) {
        this.petBreed = null;
        this.loadedPetBreeds(value);
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
