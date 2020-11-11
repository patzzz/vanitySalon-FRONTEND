import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import UserPreview from "../../components/UserPreview";

import { NavigationEvents } from "react-navigation";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class UserListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
      users: [],
    };
  }

  componentDidMount = async () => {
    this.onPageFocus();
  };

  onPageFocus = async () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/getAllUsers",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ users: result });
      })
      .catch((error) => console.log("error", error));
  };
  navigateToClientDetails = (item) => {
    this.props.navigation.navigate("ClientDetails", { client: item });
  };

  renderRow = ({ item, index }) => {
    if (item.admin == true) {
      return null;
    } else {
      return (
        <UserPreview
          item={item}
          navigateToClient={this.navigateToClientDetails}
        />
      );
    }
  };

  selectDate = async (desiredDate) => {
    console.log(desiredDate);
    this.setState({ desiredDate: desiredDate });
  };

  searchUser = async (name) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/searchUser?name=" +
        name,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ users: result });
      })
      .catch((error) => console.log("error", error));
    console.log("USER CAUTAT: " + name);
  };

  render() {
    const width = this.state.animation_login;
    return (
      <ImageBackground
        source={require("../../assets/purpleBackground.png")}
        style={styles.container}
      >
        <NavigationEvents onDidFocus={() => this.onPageFocus()} />
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTextStyle}>LISTA UTILIZATORI</Text>
          </View>
        </View>
        <View style={styles.dateField}>
          <View style={styles.action}>
            <TextInput
              placeholder="Cauta utilizator"
              placeholderTextColor="black"
              style={styles.textInput}
              // onChangeText={(name) => this.searchUser(name)}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ marginTop: hp(2), width: wp(90), height: hp(84) }}>
            <FlatList
              data={this.state.users}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderRow}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
  },
  headerText: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  dateField: {
    flex: 0.3,
    backgroundColor: "#FFCC00",
    height: hp(2),
    width: wp(100),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 4,
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  headerTextStyle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  action: {
    flexDirection: "row",
    borderBottomColor: "black",
    width: wp(50),
    justifyContent: "center",
    marginBottom: hp(1),
  },
  textInput: {
    flex: 1,
    paddingBottom: hp(1),
    fontSize: 18,
    borderBottomWidth: 1,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "black",
    paddingBottom: 1,
  },
});
