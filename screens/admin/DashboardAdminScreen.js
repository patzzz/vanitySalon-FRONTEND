import React from "react";
import {
  View,
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
import LogoutAdmin from "../../components/LogoutAdmin";

import Modal from "react-native-modal";

export default class DashboardAdminScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          index: 1,
          title: "PROGRAMARI",
        },
        {
          index: 6,
          title: "LISTA UTILIZATORI",
        },
        {
          index: 7,
          title: "ZILE LIBERE",
        },
        {
          index: 0,
          title: "LOG OUT",
        },
      ],
      logoutModal: false,
    };
  }

  toggleLogoutModal = () => {
    AsyncStorage.clear();
    this.setState({ logoutModal: !this.state.logoutModal });
  };

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.replace("LogIn");
  };

  navigateOn = (item) => {
    if (item.index == 1) {
      this.props.navigation.navigate("AppointmentButtons");
    } else if (item.index == 2) {
      this.props.navigation.navigate("ConfirmedAppointments");
    } else if (item.index == 3) {
      this.props.navigation.navigate("PendingAppointments");
    } else if (item.index == 4) {
      this.props.navigation.navigate("CancelledAppointments");
    } else if (item.index == 7) {
      this.props.navigation.navigate("DaysOff");
    } else if (item.index == 6) {
      this.props.navigation.navigate("UserList");
    } else if (item.index == 0) {
      this.logout();
    }
  };

  renderRow = ({ item, index }) => {
    return <ServicesPreview item={item} navigateOn={this.navigateOn} />;
  };

  render() {
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
        <Modal
          isVisible={this.state.logoutModal}
          onBackdropPress={this.toggleLogoutModal}
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
          <LogoutAdmin
            closeModal={this.toggleLogoutModal}
            logoutAdmin={this.logout}
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
