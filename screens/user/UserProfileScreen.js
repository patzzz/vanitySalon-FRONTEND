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
import EditProfile from "../../components/EditProfile";

import Moment from "moment";

import ServicesPreview from "../../components/ServicesPreview";
import { NavigationEvents } from "react-navigation";

import ChangePaswordModal from "../../components/ChangePaswordModal";

var lastUserInfo = {};

export default class UserProfileScreen extends React.Component {
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
      resetPasswordModal: false,
    };
  }

  componentDidMount = async () => {
    this.onPageFocus();
  };

  toggleResetPasswordModal = () => {
    this.setState({ resetPasswordModal: !this.state.resetPasswordModal });
  };

  toggleEditProfile = () => {
    this.setState({ editProfileModal: !this.state.editProfileModal });
  };

  changePassword = async (password) => {
    console.log(">>>>PASS", password);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/changePassword?password=" +
        password +
        "&username=" +
        lastUserInfo.username,
      requestOptions
    ).catch((error) => console.log("error", error));
  };

  onPageFocus = async () => {
    var userAsString = await AsyncStorage.getItem("@UserStore:userInfo");
    lastUserInfo = JSON.parse(userAsString);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/getUser?username=" +
        lastUserInfo.username,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ user: result, isLoading: false });
      })
      .catch((error) => console.log("error", error));
  };

  logOut = () => {
    AsyncStorage.clear();
    this.props.navigation.replace("LogIn");
  };

  changePhoneNumber = async (phoneNumber) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "text/plain");

    var raw = lastUserInfo;
    delete raw.token;

    raw.phoneNumber = phoneNumber;

    console.log(raw);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/user",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.setState({ user: result, isLoading: false }))
      .catch((error) => console.log("error", error));
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
          <Image
            source={require("../../assets/VanityFont.png")}
            style={{ resizeMode: "contain", width: wp(40) }}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.dataContainer}>
            <Text style={styles.coloredText}>NUME</Text>
            <Text style={styles.text}>{lastUserInfo.firstName}</Text>
            <Text style={styles.coloredText}>NUMAR DE TELEFON</Text>
            <Text style={styles.text}>{lastUserInfo.phoneNumber}</Text>
            <Text style={styles.coloredText}>ADRESA DE E-MAIL</Text>
            <Text style={styles.text}>{lastUserInfo.username}</Text>
            <Text style={styles.coloredText}>DATA NASTERII</Text>
            <Text style={styles.text}>
              {Moment(lastUserInfo.dateOfBirth).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.toggleResetPasswordModal()}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.buttonText}>SCHIMBA PAROLA</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.logOut()}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.buttonText}>LOG OUT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          isVisible={this.state.resetPasswordModal}
          onBackdropPress={this.toggleResetPasswordModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{ alignItems: "center" }}
        >
          <ChangePaswordModal
            closeModal={this.toggleResetPasswordModal}
            changePassword={this.changePassword}
          />
        </Modal>
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
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    width: wp(100),
    borderTopLeftRadius: hp(7),
    borderTopRightRadius: hp(7),
    alignItems: "center",
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
  containerLogOut: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
    width: wp(75),
    height: hp(5),
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

    textTransform: "uppercase",
  },
  button: {
    marginBottom: hp(5),
    width: wp(75),
    height: hp(7),
    backgroundColor: "#FFCC00",
    borderRadius: hp(50),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  buttonContainer: {
    marginTop: hp(17),
    width: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
  coloredText: {
    color: "#AE0EFF",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: hp(2),
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
