import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ServicesPreview from "../../components/ServicesPreview";

var lastUserInfo = {};

export default class DashboardUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          index: 1,
          title: "PROGRAMEAZA-TE",
        },
        {
          index: 2,
          title: "LISTA PROGRAMARI",
        },
        {
          index: 5,
          title: "PROFILUL TAU",
        },
      ],
    };
  }

  async componentDidMount() {
    var userAsString = await AsyncStorage.getItem("@UserStore:userInfo");
    lastUserInfo = JSON.parse(userAsString);
  }

  navigateOn = (item) => {
    if (item.index == 1) {
      this.props.navigation.navigate("NewAppointment");
    } else if (item.index == 3) {
      this.props.navigation.navigate("CancelAppointment");
    } else if (item.index == 2) {
      this.props.navigation.navigate("AllAppointments");
    } else if (item.index == 4) {
      console.log("4");
    } else if (item.index == 5) {
      this.props.navigation.navigate("UserProfile");
    }
  };

  renderRow = ({ item, index }) => {
    return <ServicesPreview item={item} navigateOn={this.navigateOn} />;
  };

  render() {
    if (lastUserInfo.onBlacklist === true) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>BLACKLIST</Text>
        </View>
      );
    } else {
      const width = this.state.animation_login;
      return (
        <ImageBackground
          source={require("../../assets/purpleBackground.png")}
          style={styles.container}
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/VanityFont.png")}
              style={{ resizeMode: "contain", width: wp(40) }}
            />
          </View>

          <View style={styles.footer}>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderRow}
            />
          </View>
        </ImageBackground>
      );
    }
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: hp(25),
    marginBottom: hp(5),
  },
  footer: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: hp(10),
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
});
