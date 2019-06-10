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
    padding: 20,

  },
  buttonContainer:{
    flexDirection:'column',


  },
  forgottenPasswordButtonContainer: {
    width: 200
  },
  forgottenPasswordTitle: {
    color: "white"
  },
  loginButtonContainer: {
    width:  200,
    marginTop: 10,
  },

  loginButtonTitle: {
    color: "white"
  },
  disabled: {
    backgroundColor: primaryBlue,
    opacity: 0.3
  },

  rightIcon:{

    marginRight: 20
  }
});

export default styles;
