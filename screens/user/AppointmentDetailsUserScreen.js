import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";

import Modal from "react-native-modal";
import Moment from "moment";

import CancelAppointment from "../../components/CancelAppointment";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class AppointmentDetailsUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelAppointmentModal: false,
    };
    this.appointment = this.props.navigation.getParam("appointment");
  }

  toggleCancelAppointmentModal = () => {
    this.setState({
      cancelAppointmentModal: !this.state.cancelAppointmentModal,
    });
  };

  cancelAppointment = async () => {
    console.log("Anulez programarea " + this.appointment.id);

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        this.appointment.id +
        "&statusID=3",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.toggleCancelAppointmentModal();
        this.props.navigation.replace("DashboardUser");
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const width = this.state.animation_login;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Detalii despre programare
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.appointmentDetails}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                // backgroundColor: "black",
              }}
            >
              <Text style={styles.firstLine}>
                Serviciul: {this.appointment.service}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text style={styles.firstLine}>
                Data:{" "}
                {Moment(this.appointment.appointmentDate).format("DD-MM-YYYY")}
              </Text>
              <Text style={styles.firstLine}>
                Ora: {this.appointment.appointmentInterval}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.secondLine}>Mesaj: </Text>
              <Text style={styles.messageText}>
                {this.appointment.clientMessage}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.secondLine}>Stare: </Text>
              {this.appointment.status === "Confirmata" ? (
                <Text style={styles.confirmed}>{this.appointment.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.appointment.status === "Anulata" ? (
                <Text style={styles.cancelled}>{this.appointment.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.appointment.status === "Astept confirmare" ? (
                <Text style={styles.pending}>{this.appointment.status}</Text>
              ) : (
                <Text></Text>
              )}
              {this.appointment.status === "Efectuata" ? (
                <Text style={styles.done}>{this.appointment.status}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.toggleCancelAppointmentModal()}>
          <View style={styles.button_container}>
            <Animated.View
              style={[
                styles.animation,
                {
                  width: "90%",
                  marginBottom: 20,
                },
              ]}
            >
              <Text style={styles.textLogin}>Anuleaza programarea</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.cancelAppointmentModal}
          onBackdropPress={this.toggleCancelAppointmentModal}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={styles.modalStyle}
        >
          <CancelAppointment
            closeModal={this.toggleCancelAppointmentModal}
            cancelAppointment={this.cancelAppointment}
          />
        </Modal>
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
  appointmentDetails: {
    flex: 1,
    // backgroundColor: "#eee6fa",
    borderRadius: 5,
    // alignItems: "center",
    padding: 10,
    marginBottom: 8,
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
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  clientFlile: {
    width: "80%",
    color: "black",
  },
  confirmed: {
    color: "green",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelled: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },
  pending: {
    color: "#882b90",
    fontSize: 15,
    fontWeight: "bold",
  },
  done: {
    color: "#4618ed",
    fontSize: 15,
    fontWeight: "bold",
  },
  firstLine: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  textInput: {
    flex: 1,
    // marginTop: 5,
    paddingBottom: 5,
    color: "gray",
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  secondLine: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  messageText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    width: "85%",
  },
  blacklistCount: {
    fontWeight: "bold",
    color: "red",
    fontSize: 15,
  },
  button_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  animation: {
    backgroundColor: "#ae03ff",
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStyle: {
    alignItems: "center",
  },
});
