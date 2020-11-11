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
} from "react-native";

import AppointmentPreview from "../../components/AppointmentPreview";

import { NavigationEvents } from "react-navigation";

import ConfirmCancelAppointment from "../../components/ConfirmCancelAppointment";

import Modal from "react-native-modal";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class TodaysAppointmentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      page: 0,
      size: 20,

      isModalVisible: false,
      appointmentToCancel: null,
    };
  }

  componentDidMount = async () => {
    this.onPageFocus();
  };

  componentWillUnmount = async () => {
    this.setState({ appointments: null });
  };

  goToDetails = async (item) => {
    console.log(item.id);
    this.props.navigation.navigate("AppointmentDetails", { appointment: item });
  };

  onPageFocus = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/getTodaysAppointments?page=0&size=20",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.content);
        this.setState({ appointments: result.content });
      })
      .catch((error) => console.log("error", error));
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  cancelAppointment = (appointment) => {
    this.setState({ appointmentToCancel: appointment });
    this.toggleModal();
  };

  cancelAppointmentModal = async () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        this.state.appointmentToCancel.id +
        "&statusID=3",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.onPageFocus();
      })
      .catch((error) => console.log("error", error));
  };

  confirmAppointment = async (appointment) => {
    console.log(appointment.id);
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        appointment.id +
        "&statusID=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.onPageFocus();
      })
      .catch((error) => console.log("error", error));
  };

  renderRow = ({ item, index }) => {
    if (item.service == "DAY OFF") {
      return null;
    } else {
      return (
        <AppointmentPreview
          item={item}
          cancelAppointment={this.cancelAppointment}
          confirmAppointment={this.confirmAppointment}
        />
      );
    }
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
          <View style={styles.headerText}>
            <Text style={styles.headerTextStyle}>ASTAZI</Text>
          </View>
        </View>
        <View style={styles.footer}>
          {this.state.appointments.length == 0 ? (
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  color: "#f2f2f2",
                  fontWeight: "bold",
                  marginTop: hp(5),
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Pentru moment nu exista nicio programare in aceasta data.
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: hp(2), width: wp(90), height: hp(84) }}>
              <FlatList
                style={{
                  height: hp(84),
                  width: wp(100),
                }}
                data={this.state.appointments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderRow}
              />
            </View>
          )}
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.toggleModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ConfirmCancelAppointment
            closeModal={this.toggleModal}
            cancelAppointmentModal={this.cancelAppointmentModal}
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
    flex: 0.5,
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
});
