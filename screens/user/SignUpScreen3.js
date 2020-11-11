import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Modal from "react-native-modal";

export default class SignUpScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_username: false,
      typing_password: false,
      typing_confirmPassword: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      otpModal: false,
      wrongOtpModal: false,
      phoneNumber: "",
      wrongOTP: false,
      OTP: "",
    };

    this.receivedUser = this.props.navigation.getParam("receivedUser");
    console.log("SignUp2: " + this.receivedUser.id);
  }

  componentDidMount = async () => {
    this.generateOTP();
  };

  generateOTP = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/OTP/generateOTP?emailOrPhone=" +
        this.receivedUser.mail +
        "&usrID=" +
        this.receivedUser.id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result === "OTP was generated") {
          console.log("OTP WAS GENERATED");
        } else {
          console.log("OTP WAS NOT GENERATED");
        }
      })
      .catch((error) => console.log("error", error));
  };

  verifyOTP = async (otp) => {
    console.log(otp);
    this.setState({ wrongOTP: false });
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/OTP/verifyOTP?otp=" +
        otp +
        "&usrID=" +
        this.receivedUser.id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result == "OTP was verified") {
          console.log("OTP WAS VERIFIED");
          this.props.navigation.replace("LogIn");
        } else {
          console.log("OTP WAS NOT VERIFIED");
          this.setState({ wrongOTP: true });
        }
      })
      .catch((error) => console.log("error", error));
  };

  toggleWrongOtpModal = () => {
    this.toggleOTPModal();
    this.setState({ wrongOtpModal: !this.state.wrongOtpModal });
  };

  render() {
    const width = this.state.animation_login;
    return (
      <ImageBackground
        source={require("../../assets/purpleBackground.png")}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          enabled={false}
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/VanityFont.png")}
              style={{ resizeMode: "contain", width: wp(40) }}
            />
          </View>
          <View style={styles.footer}>
            <View
              style={{
                marginBottom: hp(13),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  marginBottom: hp(2),
                }}
              >
                INREGISTREAZA-TE
              </Text>
              <View
                style={{
                  width: wp(60),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: 1,
                    // marginBottom: hp(8),
                  }}
                >
                  Te rugam sa introduci codul de verificare primit prin e-mail
                </Text>
              </View>
            </View>

            <View
              style={{
                width: wp(65),
                justifyContent: "space-between",
                marginBottom: hp(10),
              }}
            >
              <View style={styles.action}>
                <TextInput
                  placeholder="Cod de verificare"
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  onChangeText={(OTP) => this.setState({ OTP })}
                />
              </View>
              {this.state.wrongOTP == true ? (
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  Codul de verificare este incorect
                </Text>
              ) : (
                <View></View>
              )}
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontWeight: "bold", color: "black", fontSize: 16 }}
              >
                Nu ai primit codul?
              </Text>
              <TouchableOpacity onPress={() => this.generateOTP()}>
                <Text
                  style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}
                >
                  {" "}
                  Retrimite.
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.lastName != null && this.state.phoneNumber != null ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.verifyOTP(this.state.OTP)}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>CONFIRMA</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>CONFIRMA</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
    width: wp(10),
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
    marginTop: hp(5),
    width: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
});
