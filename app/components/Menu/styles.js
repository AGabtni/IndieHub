import { StyleSheet } from "react-native";
import theme from '../../styles/theme.style.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  viewContainer: {

    justifyContent: "center",
    alignItems: "center",
    marginBottom : 10

  },
  headerContainer:{
    height : "20%",
    backgroundColor: theme.HEADER_COLOR,

  },

  headerView:{

    flex: 1,
    flexDirection: 'row',
    alignItems: "center",


  },
  userImage: {
    borderColor: "black",
    borderRadius: 85,
    borderWidth: 3,
    height: 70,
    width: 70,
    margin: 20

  },
  icon: {
    marginRight: 40,
    width: 24
  },
  button: {
    //backgroundColor: "",
    width : 200,
    height : 40,
    borderRadius: 85,
    borderWidth: 1,
    alignItems: "center"
  },
  title: {
    color: "black",
    //margin: 16,
    fontSize: 16,
    fontWeight: "500"
  }
});

export default styles;
