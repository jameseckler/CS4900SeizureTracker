# Pet Seizure Tracking Mobile Application

The Pet Seizure Tracking mobile application will be a convenient and powerful tool for pet owners and their veterinarians to communicate, log, and diagnose medical events such as seizure episodes, medication usage, food consumption, sleep, and other symptoms the pet may display.
The application will motivate owners to actively keep up with tracking their pet’s activity using a simple and efficient interface to submit new logged events through a streamlined form system. The data sent by the pet owners will then be compiled and packaged into a digestible and statistic-oriented package that can be accessed by their veterinarians either directly through the app or externally.

## Getting Started

This application may be ran by

### Prerequisites

- iOS 9.0 and Android 4.1 (API 16) or newer. 
- Internet connection
- Access to email address for registration

### Installing

The source code and all related directories can be cloned from the Git repository. IDE is up to personal choice, Visual Studio Code is free and useful for React Native development as there are extensions specifically for React Native syntax.

For OSX users, XCode is free to download from the App Store and comes with an iOS simulator. For an Android emulator, you can create one using Android Studio.

In order to develop in React Native and Expo, you must first install a package installer such as yarn or npm.

Optionally, if you want to run the application directly on your phone using Expo, it will need to be downloaded from Apple’s App Store or Google Play. Emulators can also be used.

React version: 16.5.0 (Can be viewed from `package.json` file)
	Can be upgraded using `react-native upgrade` command

Node.js (Includes npm): https://nodejs.org/en/download/

Git Repository: https://github.com/jameseckler/CS4900SeizureTracker

Visual Studio Code: https://code.visualstudio.com/

Android Studio (Includes Android emulator): https://developer.android.com/studio

Installing React Native/Expo: https://facebook.github.io/react-native/docs/getting-started


## Running the tests

TBA

Refer to test plan.pdf for final testing specifications

### Unit tests

What:
	React Native has a built-in unit testing framework called Jest: https://jestjs.io/docs/en/tutorial-react-native Jest allows the creation of mock objects for testing and snapshots to compare how a certain component renders.

Who:
	The team

When:
	Tests should be written in the `__test__` directory as soon as a component is created and all tests run using the `npm test` command, or a specific test using `npm test [testname]`

Result:
	Unfortunately we could not write unit tests for components that require access to Firestore; even simple actions such as signing in were unresponsive with Jest. A basic test that should ensure that the app renders properly displayed an error insinuating that this was an error with React itself. For any component we wrote that didn’t require database queries such as buttons or text boxes, we wrote tests that ensured they rendered properly and matched with previous snapshots.


### Usability tests
What:
	Using Expo, open the application on a user’s phone and give them an instruction for what they should do (i.e. register an account, create a log, add a pet).

Who:
	Someone not on the team (Preferably isn’t too used to using the application)

When:
	After completion of major features

Result:
	User feedback helped us refine features in a way that made the app more usable.


### System tests

What:
	Expo is a set of libraries that allows builds to be easily created and run on emulators or directly on physical devices through the Expo app: https://expo.io 

Who:
	The team

When:
	While writing the program - updates can be seen as changes are made

Result:
	Expo gave us an easy way to ensure that the application would work on multiple devices for both iOS and Android. One drawback is that upon reloading the application after any change is made, you are placed back at the login screen and need to log back in. As well as being slightly tedious, logging in to the system uses reads from our Firestore quota. This has not proven to be a problem for the most part, barring a bug that was fixed that would cause many reads as long as a certain element was in view.


## Deployment

Will be deployed to the Google PlayStore and Apple Store in the future.

## Built With

* [React Native](https://facebook.github.io/react-native/) - JavaScript Framework
* [Expo](https://expo.io/) - React Native Tool
* [Firebase](https://firebase.google.com/) - Backend, database, authentication, testing, and analytics


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Joshua Peterson** - *Developer* - [outcoldi](https://github.com/outcoldi)
* **James Eckler** - *Developer* - [jameseckler](https://github.com/jameseckler)

