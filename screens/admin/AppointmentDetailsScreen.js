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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EditAppointment from "../../components/EditAppointment";

export default class AppointmentDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editAppointmentModal: false,
    };

    this.appointment = this.props.navigation.getParam("appointment");
  }

  toggleEditAppointmentModal = () => {
    this.setState({ editAppointmentModal: !this.state.editAppointmentModal });
  };

  confirmAppointment = async () => {
    console.log("Confirm programarea " + this.appointment.id);

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        this.appointment.id +
        "&statusID=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.props.navigation.replace("DashboardAdmin");
      })
      .catch((error) => console.log("error", error));
  };

  accomplishedAppointment = async () => {
    console.log("Efectuat programarea " + this.appointment.id);

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        this.appointment.id +
        "&statusID=2",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.props.navigation.replace("DashboardAdmin");
      })
      .catch((error) => console.log("error", error));
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
        this.props.navigation.replace("DashboardAdmin");
      })
      .catch((error) => console.log("error", error));
  };

  editClientFile = async (file) => {
    console.log("Fila noua client: " + file);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/editClientFile?appointmentID=" +
        this.appointment.id +
        "&clientFile=" +
        file,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => this.props.navigation.replace("DashboardAdmin"))
      .catch((error) => console.log("error", error));
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
              fontSize: 32,
            }}
          >
            Detalii despre programare
          </Text>
          {/* </ImageBackground> */}
        </View>
        <View style={styles.footer}>
          <View style={styles.appointmentDetails}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.firstLine}>
                {Moment(this.appointment.appointmentDate).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.firstLine}>
                {this.appointment.appointmentInterval}
              </Text>
              {this.appointment.service === "tuns_barbat" ? (
                <Text style={styles.firstLine}>Tuns barbat</Text>
              ) : null}
              {this.appointment.service === "tuns_femeie" ? (
                <Text style={styles.firstLine}>Tuns femeie</Text>
              ) : null}
              {this.appointment.service === "tuns_copil" ? (
                <Text style={styles.firstLine}>Tuns copil</Text>
              ) : null}
              {this.appointment.service === "spalat_barbat" ? (
                <Text style={styles.firstLine}>Spalat barbat</Text>
              ) : null}
              {this.appointment.service === "spalat_femeie" ? (
                <Text style={styles.firstLine}>Spalat femeie</Text>
              ) : null}
              {this.appointment.service === "coafat" ? (
                <Text style={styles.firstLine}>Coafat</Text>
              ) : null}
              {this.appointment.service === "vopsit_radacina" ? (
                <Text style={styles.firstLine}>Vopsit radacini</Text>
              ) : null}
              {this.appointment.service === "vopsit_uniform" ? (
                <Text style={styles.firstLine}>Vopsit uniform</Text>
              ) : null}
              {this.appointment.service === "balayage" ? (
                <Text style={styles.firstLine}>Balayage</Text>
              ) : null}
              {this.appointment.service === "corectare_culoare" ? (
                <Text style={styles.firstLine}>Corectare culoare</Text>
              ) : null}
              {this.appointment.service === "schimbare_culoare" ? (
                <Text style={styles.firstLine}>Schimbare culoare</Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.secondLine}>Client: </Text>
                <TouchableOpacity onPress={() => this.toggleClientDetails()}>
                  <Text style={styles.secondLine}>
                    {this.appointment.client.firstName}{" "}
                    {this.appointment.client.lastName}{" "}
                  </Text>
                </TouchableOpacity>
                {this.appointment.client.blacklistCount > 0 ? (
                  <Text style={styles.blacklistCount}>
                    ({this.appointment.client.blacklistCount}/3)
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                {this.appointment.status === "Confirmata" ? (
                  <Text style={styles.confirmed}>
                    {this.appointment.status}
                  </Text>
                ) : (
                  <Text></Text>
                )}
                {this.appointment.status === "Anulata" ? (
                  <Text style={styles.cancelled}>
                    {this.appointment.status}
                  </Text>
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

            {this.appointment.clientMessage.length == 0 ? (
              <View></View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                }}
              >
                <Text style={styles.secondLine}>Mesaj: </Text>
                <Text style={styles.secondLine}>
                  {this.appointment.clientMessage}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <Text style={styles.secondLine}>Fisa client: </Text>
              <Text style={styles.clientFlile}>
                {this.appointment.clientFile}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.toggleEditAppointmentModal()}>
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
              <Text style={styles.textLogin}>Editeaza programarea</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.editAppointmentModal}
          onBackdropPress={this.toggleEditAppointmentModal}
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
          <EditAppointment
            closeModal={this.toggleEditAppointmentModal}
            confirmAppointment={this.confirmAppointment}
            accomplishedAppointment={this.accomplishedAppointment}
            cancelAppointment={this.cancelAppointment}
            editClientFile={this.editClientFile}
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
