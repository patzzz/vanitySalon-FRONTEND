import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class SignUpScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_username: false,
      typing_password: false,
      typing_confirmPassword: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
      firstName: null,
      lastName: null,
      dateOfBirth: "Data nasterii",
      otpModal: false,
      wrongOtpModal: false,
      phoneNumber: null,
      isPickerVisible: false,
    };

    this.receivedUser = this.props.navigation.getParam("receivedUser");
  }

  togglePicker = () => {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
  };

  handleDate = (date) => {
    this.setState({ dateOfBirth: date });
    this.togglePicker();
  };

  updateUser = async () => {
    console.log("first name: " + this.state.firstName);
    console.log("last name: " + this.state.lastName);
    console.log("date of birth: " + this.state.dateOfBirth);

    this.receivedUser.firstName = this.state.firstName;
    this.receivedUser.lastName = this.state.lastName;
    this.receivedUser.firstName = this.state.lastName;
    this.receivedUser.dateOfBirth = this.state.dateOfBirth;
    this.receivedUser.phoneNumber = this.state.phoneNumber;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(this.receivedUser),
      redirect: "follow",
    };

    console.log(JSON.stringify(this.receivedUser));

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/user",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // this.props.navigation.replace("LogIn");
      })
      .catch((error) => console.log("error", error));
  };

  selectDate = async (dateOfBirth) => {
    console.log(dateOfBirth);
    this.setState({ dateOfBirth: dateOfBirth });
  };

  nextStep = async () => {
    this.updateUser();
    this.props.navigation.navigate("SignUp3", {
      receivedUser: this.receivedUser,
    });
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
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                letterSpacing: 2,
                marginBottom: hp(8),
              }}
            >
              INREGISTREAZA-TE
            </Text>
            <View style={{ width: wp(65), justifyContent: "space-between" }}>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nume"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  onChangeText={(lastName) => this.setState({ lastName })}
                />
                {this.state.typing_username ? this._typing() : null}
              </View>
              <View style={styles.action}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Numar de telefon"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.togglePicker()}
                style={styles.action}
              >
                {this.state.dateOfBirth == "Data nasterii" ? (
                  <View style={styles.textInput}>
                    <Text style={styles.text}>{this.state.dateOfBirth}</Text>
                  </View>
                ) : (
                  <View style={styles.textInput}>
                    <Text style={styles.text}>
                      {Moment(this.state.dateOfBirth).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {this.state.lastName != null && this.state.phoneNumber != null ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.nextStep()}>
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
        <DateTimePickerModal
          isVisible={this.state.isPickerVisible}
          mode="date"
          onConfirm={this.handleDate}
          onCancel={this.togglePicker}
        />
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
    marginTop: hp(4),
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
  text: {
    marginTop: hp(1),
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "black",
    paddingBottom: 1,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(1),
  },
  button: {
    marginTop: hp(5),
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
