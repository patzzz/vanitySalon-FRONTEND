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

export default class BlacklistScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUser: "",
      users: [],
    };
  }

  componentDidMount = async () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/user/getAllBlacklistUsers",
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
    return (
      <UserPreview
        item={item}
        navigateToClient={this.navigateToClientDetails}
      />
    );
  };

  selectDate = async (desiredDate) => {
    console.log(desiredDate);
    this.setState({ desiredDate: desiredDate });
  };

  render() {
    const width = this.state.animation_login;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          {/* <ImageBackground
            source={require("../../assets/header.png")}
            style={styles.imageBackground}
          > */}
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Blacklist
          </Text>
          <View style={styles.textInputStyle}>
            <TextInput
              placeholder="Cauta client.."
              placeholderTextColor="black"
              style={styles.textInput}
              onChangeText={(searchUser) => this.setState({ searchUser })}
            />
          </View>
          {/* </ImageBackground> */}
        </View>
        <View style={styles.footer}>
          <FlatList
            data={this.state.users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderRow}
          />
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
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: hp(15),
    backgroundColor: "#ae03ff",
    marginBottom: hp(3),
    // resizeMode: "contain",
  },
  footer: {
    flex: 2,
    paddingHorizontal: 15,
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
    width: 200,
    height: 37,
    borderWidth: 1.5,
    borderColor: "white",
  },
  textInput: {
    alignItems: "center",
    // flex: 1,
    color: "white",
  },
});
