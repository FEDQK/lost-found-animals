import * as firebase from 'firebase/app';
import config from '../config/firebaseConfig';

class AuthService {
  constructor() {
    this.firebase = firebase.initializeApp(config);
  }
  signOut() {
    this.firebase.auth().signOut();
  }
}

export default new AuthService();
