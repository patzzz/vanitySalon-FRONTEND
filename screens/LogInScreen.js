import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import WrongCredentials from "../components/WrongCredentials";
import Modal from "react-native-modal";

import ResetPasswordModal from "../components/ResetPasswordModal";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

var lastUserInfo = {};

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_username: false,
      typing_password: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
      username: "",
      password: "",
      credentialsModal: false,
      resetPasswordModal: false,
    };
    this.checkUserSignedIn();
  }

  checkUserSignedIn = async () => {
    try {
      let value = await AsyncStorage.getItem("@UserStore:userInfo");
      var valueJSON = JSON.parse(value);
      if (valueJSON != null) {
        this.getUserData();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserData = async () => {
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
      .then((r) => {
        // console.log("AM PRIMIT", r);
        if (r.id != null && r.admin === true) {
          // console.log(">>>>>>ISADMIN");
          this.props.navigation.replace("DashboardAdmin");
        } else if (r.id != null && r.admin === false) {
          // console.log(">>>>>>ISUSER");
          this.props.navigation.replace("DashboardUser");
        } else {
          // console.log("NU MERGE");
        }
      })
      .catch((error) => console.log("error", error));
  };

  toggleCredentialsModal = () => {
    this.setState({ credentialsModal: !this.state.credentialsModal });
  };

  toggleResetPasswordModal = () => {
    // console.log("CEV");
    this.setState({ resetPasswordModal: !this.state.resetPasswordModal });
  };

  signIn = async () => {
    console.log("FA CEVA");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (
          result.error === "WRONG CREDENTIALS" ||
          result.error === "USER NOT FOUND"
        ) {
          this.toggleCredentialsModal();
        } else {
          if (result.text == "USER WAS NOT VERIFIED") {
            console.log("UNVERIFIED");
          } else {
            try {
              AsyncStorage.setItem(
                "@UserStore:userInfo",
                JSON.stringify(result)
              );
            } catch (error) {
              console.log(error);
            }
            if (result.admin) {
              console.log("LOGIN ADMIN");
              this.props.navigation.navigate("DashboardAdmin");
            } else if (!result.admin) {
              console.log("LOGIN USER");
              this.props.navigation.navigate("DashboardUser");
            }
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  changePassword = async (mail) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/forgotPassword?userMail=" +
        mail,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/purpleBackground.png")}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          enabled={false}
        >
          <View style={styles.header}>
            <Image
              source={require("../assets/VanityFont.png")}
              style={{ resizeMode: "contain", width: wp(40) }}
            />
          </View>
          <View style={styles.footer}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                letterSpacing: 2,
                marginBottom: hp(6),
              }}
            >
              LOGHEAZA-TE
            </Text>
            <View style={{ width: wp(65), justifyContent: "space-between" }}>
              <View style={styles.action}>
                <TextInput
                  placeholderTextColor="black"
                  placeholder="Mail"
                  style={styles.textInput}
                  onChangeText={(username) => this.setState({ username })}
                />
                {this.state.typing_username ? this._typing() : null}
              </View>

              <View style={styles.action}>
                <TextInput
                  secureTextEntry
                  placeholderTextColor="black"
                  placeholder="Parola"
                  style={styles.textInput}
                  onChangeText={(password) => this.setState({ password })}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => this.signIn()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>LOG IN</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.signUp}>
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Ai uitat parola?
                </Text>
                <TouchableOpacity
                  onPress={() => this.toggleResetPasswordModal()}
                >
                  <Text
                    style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}
                  >
                    {" "}
                    Reseteaza parola.
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUp}>
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Nu ai cont?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Text
                    style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}
                  >
                    {" "}
                    Inregistreaza-te.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            isVisible={this.state.credentialsModal}
            onBackdropPress={this.toggleCredentialsModal}
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
            <WrongCredentials closeModal={this.toggleCredentialsModal} />
          </Modal>

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
            <ResetPasswordModal
              closeModal={this.toggleResetPasswordModal}
              changePassword={this.changePassword}
            />
          </Modal>
        </KeyboardAvoidingView>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: hp(25),
  },
  footer: {
    flex: 3,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    width: wp(100),
    borderTopLeftRadius: hp(7),
    borderTopRightRadius: hp(7),
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  action: {
    flexDirection: "row",
    borderBottomColor: "black",
    marginTop: hp(3),
  },
  textInput: {
    flex: 1,
    marginTop: hp(1),
    paddingBottom: hp(1),
    width: 200,
    fontSize: 18,
    borderBottomWidth: 1,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(1),
  },
  button: {
    marginTop: hp(2),
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
});
