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
} from "react-native";

import UserPreview from "../../components/UserPreview";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class SendMessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  sendMessage = () => {
    // send message
  };

  render() {
    const width = this.state.animation_login;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require("../../assets/header.png")}
            style={styles.imageBackground}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Trimite mesaj
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <View style={styles.textInputStyle}>
            <TextInput
              placeholder="Scrie un mesaj.."
              placeholderTextColor="black"
              style={styles.textInput}
              onChangeText={(message) => this.setState({ message })}
            />
          </View>
          <TouchableOpacity onPress={() => this.sendMessage()}>
            <View style={(styles.button_container, { marginTop: hp(-3) })}>
              <Animated.View style={[styles.animation]}>
                <Text style={styles.textLogin}>Trimite</Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    paddingHorizontal: 15,
    marginTop: hp(-6),
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  textInputStyle: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    borderWidth: 1.5,
    borderColor: "#93278f",
  },
  textInput: {
    alignItems: "center",
    // flex: 1,
    color: "white",
  },
  animation: {
    backgroundColor: "#ae03ff",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: wp("80%"),
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
