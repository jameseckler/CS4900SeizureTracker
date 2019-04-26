import firebase from "firebase";

/*
  Contains methods that work with the Firebase API to log users in and create accounts.
  Also contains password recovery method.
*/
class Firebase {

  /*
    Calls firebase API function to sign in with passed email and password.
    Checks for errors in syntax and verifies with Firebase authentication
    params: email passed by user, encrypted password inputted by user
  */
  userLogin = (email, password) => {
    // Makes promise for resolving a user or null error
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        // Error checking codes
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.warn('Invalid email address format.');
              break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              console.warn('Invalid email address or password');
              break;
            default:
              console.warn('Check your internet connection');
          }
          resolve(null);
        }).then(user => {
        if (user) {
          resolve(user);
        }
      });
    })
  };

  /*
    Creates Firebase account by being passed parameters inputted by user
    at the Login screen in FirebaseLogin/screens/Login/ . Updates Firestore
    with supplied fields under the users new unique user 
    alongside authenticating a new user.
    params: first name, last name, email of user, encrypted password, and account type
  */
  createFirebaseAccount = (firstName, lastName, email, password, isVet) => {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        // Error checking for duplicate accounts, weak passwords,
        // and syntax errors in input
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.warn('This email address is already taken');
            break;
          case 'auth/invalid-email':
            console.warn('Invalid e-mail address format');
            break;
          case 'auth/weak-password':
            console.warn('Password is too weak');
            break;
          default:
            console.warn('Check your internet connection');
        }
        resolve(false);
      }).then(info => {
        if (info) {
          // Updates current active user display name
          firebase.auth().currentUser.updateProfile({
            displayName: firstName
          });
          resolve(true);
          // Calls Firestore and sets fields for the new user via the parameters
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
          console.warn('Email with new password has been sent');
          resolve(true);
        }).catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.warn('Invalid email address format');
              break;
            case 'auth/user-not-found':
              console.warn('User with this email does not exist');
              break;
            default:
              console.warn('Check your internet connection');
          }
          resolve(false);
        });
    })
  };

}

export default new Firebase();
