import getPetList from "../Functions/getPetList";

test ("Retrieved list of pets from single ID", () => {

    getPetList("C9lE9n3cQ5aiMfLLne6w4voa4bI3");

});

test ("Retrieved list of pets from array of IDs", () => {

    var IDs = ["C9lE9n3cQ5aiMfLLne6w4voa4bI3", "FyfHyE1duxWUCCKhwdxGgYaBvbA2"];

    getPetList(IDs);

});