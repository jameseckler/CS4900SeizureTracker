import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { firebase } from "firebase";

function getPetList (ownerID) {

    var fb = firebase.firestore();

    var users = fb.collection('users').where('userID', "==", ownerID).get();

    return (
        <List>
            <FlatList
            />
        </List>
    );

}

export default getPetList;
