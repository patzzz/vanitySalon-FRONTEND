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
  AsyncStorage,
} from "react-native";

import AppointmentPreviewToCancel from "../../components/AppointmentPreviewToCancel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

var lastUserInfo = {};

export default class CancelAppointmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      page: 0,
      size: 200,
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    var userAsString = await AsyncStorage.getItem("@UserStore:userInfo");
    lastUserInfo = JSON.parse(userAsString);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/getAllAppointmentsOfUserWithStatus?&statusID=0,1&userID=" +
        lastUserInfo.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          appointments: result,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));

    console.log(this.state.appointments);
  };

  componentWillUnmount = () => {
    this.setState({
      appointments: null,
    });
  };

  goToDetails = (item) => {
    this.props.navigation.navigate("AppointmentDetailsUser", {
      appointment: item,
    });
  };

  cancelAppointment = async (item) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/updateAppointmentStatus?appointmentID=" +
        item.id +
        "&statusID=3",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.props.navigation.replace("AllAppointments");
      })
      .catch((error) => console.log("error", error));
  };

  renderRow = ({ item, index }) => {
    console.log("X");
    return (
      <AppointmentPreviewToCancel
        item={item}
        goToAppointmentDetails={this.goToDetails}
        cancelAppointment={this.cancelAppointment}
      />
    );
  };

  render() {
    const width = this.state.animation_login;
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Anuleaza o programare
            </Text>
           
          </View> */}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Anuleaza o programare
            </Text>
            <Text
              style={{
                color: "yellow",
              }}
            >
              Selecteaza programarea pe care doresti sa o anulezi.
            </Text>
          </View>
          <View style={styles.footer}>
            {this.state.appointments.length == 0 ? (
              <View style={{ alignSelf: "center" }}>
                <Text style={{ color: "#93278f", fontWeight: "bold" }}>
                  Pentru moment nu exista nicio programare in aceasta data.
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.appointments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderRow}
              />
            )}
          </View>
        </View>
      );
    }
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
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  title: {
    color: "black",
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
  animation: {
    backgroundColor: "#ae03ff",
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
