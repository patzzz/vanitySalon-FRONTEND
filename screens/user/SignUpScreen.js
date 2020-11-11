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
  KeyboardAvoidingView,
  CheckBox,
  Image,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class SignUpScren extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation_login: new Animated.Value(width - 40),
      enable: true,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordOk: true,
      credentialsOk: true,
      receivedUser: {},
      isPolicySelected: false,
      isTermsSelected: false,
    };
  }

  next = async () => {
    console.log("DSMDMSD");
    if (this.state.passwordOk) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: this.state.username,
          mail: this.state.username,
          password: this.state.password,
        }),
        redirect: "follow",
      };

      await fetch(
        "http://185.247.118.91:8082/appointmentPlatform/api/user/registerUser",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.id != null) {
            console.log("REGISTERED");
            this.props.navigation.replace("SignUp2", { receivedUser: result });
          }
          if (result.error === "USED CREDENTIALS") {
            this.setState({ credentialsOk: false });
          }
          console.log(result.error);
        })
        .catch((error) => console.log("error", error));

      // this.props.navigation.replace("SignUp2");
    }
  };

  changePolicy = () => {
    this.setState({
      isPolicySelected: !this.state.isPolicySelected,
    });
  };

  changeTerms = () => {
    this.setState({
      isTermsSelected: !this.state.isTermsSelected,
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
                // marginBottom: hp(6),
              }}
            >
              INREGISTREAZA-TE
            </Text>
            <View style={{ width: wp(65), justifyContent: "space-between" }}>
              <View style={styles.action}>
                <TextInput
                  placeholder="Mail"
                  placeholderTextColor="black"
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
              <View style={styles.action}>
                <TextInput
                  secureTextEntry
                  placeholderTextColor="black"
                  placeholder="Confirmare parola"
                  style={styles.textInput}
                  onChangeText={(confirmPassword) =>
                    this.setState({ confirmPassword })
                  }
                />
              </View>
              <View style={{ marginTop: hp(4) }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    value={this.state.isPolicySelected}
                    onValueChange={() => this.changePolicy()}
                  />
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Accept{" "}
                    <Text style={{ textDecorationLine: "underline" }}>
                      politica de prelucrare a datelor
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    value={this.state.isTermsSelected}
                    onValueChange={() => this.changeTerms()}
                  />
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Accept{" "}
                    <Text style={{ textDecorationLine: "underline" }}>
                      termeni si conditii
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            {this.state.password.length > 1 &&
            this.state.password === this.state.confirmPassword &&
            this.state.isPolicySelected == true &&
            this.state.isTermsSelected == true ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.next()}>
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
    marginTop: hp(5),
    width: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
});
