import { Platform, StyleSheet } from "react-native";

const primaryBlue = Platform.select({
  ios: "#007aff", // rgb(0, 122, 255)
  android: "#2196f3" // rgb(33, 150, 243)
});

const imageWidth = "60%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',

    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop:40

  },
  buttonContainer:{
    flexDirection:'column',
    flex : 0.5


  },
  forgottenPasswordButtonContainer: {
    width: imageWidth
  },
  forgottenPasswordTitle: {
    color: "white"
  },
  loginButtonContainer: {
    width:  imageWidth
  },
  loginButton: {
    backgroundColor: primaryBlue
  },
  loginButtonTitle: {
    color: "white"
  },
  disabled: {
    backgroundColor: primaryBlue,
    opacity: 0.3
  }
});

export default styles;
