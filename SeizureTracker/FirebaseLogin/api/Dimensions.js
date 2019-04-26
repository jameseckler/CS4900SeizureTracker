import {Dimensions} from "react-native";

const { height, width } = Dimensions.get('window');

// Creates consistent sizing parameters for neatly styling components throughout the app
export const w = percent => (width * percent) / 100;
export const h = percent => (height * percent) / 100;
export const totalSize = num => (Math.sqrt((height * height) + (width * width)) * num) / 100;

