import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";

import Modal from "react-native-modal";

import Moment from "moment";

import { NavigationEvents } from "react-navigation";

var lastUserInfo = {};

export default class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfileModal: false,
      firstName: "Andrei",
      lastName: "Pata",
      blacklistCount: 1,
      phoneNumber: "0722663355",
      mail: "adresaDeMail@mail.com",
      dateOfBirth: "10-02-1992",
      appointmentsCanceled: 0,
      appointmentsCompleted: 10,
      user: { appointmentsCanceled: 0, appointmentsCompleted: 10 },
      isLoading: true,
      data: [
        {
          index: 1,
          title: "LOG OUT",
        },
      ],
    };
  }

  render() {
    const width = this.state.animation_login;
    return (
      <ImageBackground
        source={require("../assets/purpleBackground.png")}
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.replace("LogIn")}
        >
          <View style={styles.header}>
            <Image
              source={require("../assets/VanityFont.png")}
              style={{ resizeMode: "contain", width: wp(40) }}
            />
          </View>
        </TouchableOpacity>
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
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
  },
  headerText: {
    flex: 2,
    backgroundColor: "#f2f2f2",
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  dateField: {
    flex: 1,
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
    // justifyContent: "center",
    // alignItems: "center",
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
  },
  textInput: {
    flex: 1,
    paddingBottom: hp(1),
    fontSize: 18,
    borderBottomWidth: 1,
    letterSpacing: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "black",
    paddingBottom: 1,
  },
  containerLogOut: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    width: wp(75),
    height: hp(2),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    // letterSpacing: widthPercentageToDP(0.5),
    letterSpacing: 1.5,
  },
});
