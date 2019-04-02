import firebase from "firebase";
import { Alert } from "react-native";

class Firebase {

  userLogin = (email, password) => {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Invalid Email', 'Invalid email address format.');
              break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              Alert.alert('Invalid Credentials', 'Invalid email address or password');
              break;
            default:
              Alert.alert('Error', 'Check your internet connection');
          }
          resolve(null);
        }).then(user => {
        if (user) {
          resolve(user);
        }
      });
    })
  };

  createFirebaseAccount = (firstName, lastName, email, password, isVet) => {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Invalid Email', 'This email address is already taken');
            break;
          case 'auth/invalid-email':
            Alert.alert('Invalid Email', 'Invalid e-mail address format');
            break;
          case 'auth/weak-password':
            Alert.alert('Invalid password', 'Password is too weak');
            break;
          default:
            Alert.alert('Error', 'Check your internet connection');
        }
        resolve(false);
      }).then(info => {
        if (info) {
          firebase.auth().currentUser.updateProfile({
            displayName: firstName
          });
          resolve(true);
          const fbRootRefFS = firebase.firestore();
          const userID = info.user.uid;
          const linkID = userID.slice(-9);
          const userRef = fbRootRefFS.collection('users').doc(userID);
          userRef.set({
            email,
            firstName,
            lastName,
            isVet,
            linkID,
          });
        }
      });
    });
  };

  sendEmailWithPassword = (email) => {
    return new Promise(resolve => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Recovery Email Sent', 'Email with new password has been sent');
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              Alert.alert('Invalid email address format');
              break;
            case 'auth/user-not-found':
              Alert.alert('User with this email does not exist');
              break;
            default:
              Alert.alert('Check your internet connection');
          }
          resolve(false);
        });
    })
  };

}

export default new Firebase();
