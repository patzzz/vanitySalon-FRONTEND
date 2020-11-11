import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  Picker,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import Modal from "react-native-modal";

import Moment from "moment";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

var lastUserInfo = {};

import { SwipeablePanel } from "rn-swipeable-panel";
import Services from "../../components/Services";
import Intervals from "../../components/Intervals";

export default class NewAppointmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_username: false,
      typing_password: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
      username: "",
      password: "",
      isVisible: false,
      serviceType: "Selecteaza serviciul",
      desiredDate: "Selecteaza data",
      intervalModal: false,
      selectedInterval: "Selecteaza intervalul",
      message: "",
      intervals: [],
      isDatePickerVisible: false,
      isServicePickerVisible: false,
      serviceToSend: null,
      isIntervalPickerVisible: false,
    };
  }

  async componentDidMount() {
    var userAsString = await AsyncStorage.getItem("@UserStore:userInfo");
    lastUserInfo = JSON.parse(userAsString);
  }

  toggleDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
  };

  handleDate = (date) => {
    this.setState({ desiredDate: date });
    this.toggleDatePicker();
    this.sendDate();
  };

  toggleServicePicker = () => {
    this.setState({
      isServicePickerVisible: !this.state.isServicePickerVisible,
    });
  };

  toggleIntervalPicker = () => {
    this.setState({
      isIntervalPickerVisible: !this.state.isIntervalPickerVisible,
    });
  };

  sendDate = async () => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/checkAvailability?desiredDateString=" +
        Moment(this.state.desiredDate).format("YYYY-MM-DD") +
        "&desiredService=" +
        this.state.serviceToSend,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ intervals: result });
      })
      .catch((error) => console.log("error", error));
  };

  toggleIntervalModal = () => {
    this.setState({
      isIntervalPickerVisible: !this.state.isIntervalPickerVisible,
    });
  };

  selectInterval = (interval) => {
    this.setState({
      selectedInterval: interval,
      isIntervalPickerVisible: false,
    });
  };

  sendAppointment = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        appointmentDate: this.state.desiredDate,
        appointmentInterval: this.state.selectedInterval,
        service: this.state.serviceToSend,
        clientMessage: this.state.message,
      }),
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/registerAppointment?userID=" +
        lastUserInfo.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.props.navigation.replace("AllAppointments");
      })
      .catch((error) => console.log("error", error));
  };

  selectService = (item) => {
    this.setState({
      serviceType: item.serviceText,
      serviceToSend: item.serviceToSend,
      isServicePickerVisible: false,
      desiredDate: "Selecteaza data",
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
            <View
              style={{
                marginBottom: hp(13),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  // marginBottom: hp(2),
                  marginTop: hp(5),
                }}
              >
                PROGRAMEAZA-TE
              </Text>
            </View>

            <View
              style={{
                width: wp(65),
                justifyContent: "space-between",
                marginBottom: hp(10),
              }}
            >
              <TouchableOpacity
                onPress={() => this.toggleServicePicker()}
                style={styles.action}
              >
                <View style={styles.textInput}>
                  <Text style={styles.text}>{this.state.serviceType}</Text>
                </View>
              </TouchableOpacity>
              {this.state.serviceType == "Selecteaza serviciul" ? (
                <TouchableOpacity style={styles.action}>
                  {this.state.desiredDate == "Selecteaza data" ? (
                    <View style={styles.textInput}>
                      <Text style={styles.text}>{this.state.desiredDate}</Text>
                    </View>
                  ) : (
                    <View style={styles.textInput}>
                      <Text style={styles.text}>
                        {Moment(this.state.desiredDate).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.toggleDatePicker()}
                  style={styles.action}
                >
                  {this.state.desiredDate == "Selecteaza data" ? (
                    <View style={styles.textInput}>
                      <Text style={styles.text}>{this.state.desiredDate}</Text>
                    </View>
                  ) : (
                    <View style={styles.textInput}>
                      <Text style={styles.text}>
                        {Moment(this.state.desiredDate).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}

              {this.state.desiredDate == "Selecteaza data" ? (
                <TouchableOpacity style={styles.action}>
                  <View style={styles.textInput}>
                    <Text style={styles.text}>
                      {this.state.selectedInterval}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.toggleIntervalModal()}
                  style={styles.action}
                >
                  <View style={styles.textInput}>
                    <Text style={styles.text}>
                      {this.state.selectedInterval}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {this.state.desiredDate == "Selecteaza data" &&
            this.state.selectedInterval == "Selecteaza intervalul" &&
            this.state.serviceType == "Selecteaza serviciul" ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>CONFIRMA</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.sendAppointment()}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>CONFIRMA</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleDate}
          onCancel={this.toggleDatePicker}
        />
        <SwipeablePanel
          fullWidth
          isActive={this.state.isServicePickerVisible}
          onClose={() => this.setState({ isServicePickerVisible: false })}
          onlyLarge={true}
          closeOnTouchOutside={true}
          noBackgroundOpacity={true}
          style={{
            backgroundColor: "#f2f2f2",
            borderTopLeftRadius: hp(7),
            borderTopRightRadius: hp(7),
          }}
          barStyle={{ backgroundColor: "#f2f2f2" }}
        >
          <Services selectService={this.selectService} />
        </SwipeablePanel>
        <SwipeablePanel
          fullWidth
          isActive={this.state.isIntervalPickerVisible}
          onClose={() => this.setState({ isIntervalPickerVisible: false })}
          onlyLarge={true}
          closeOnTouchOutside={true}
          noBackgroundOpacity={true}
          style={{
            backgroundColor: "#f2f2f2",
            borderTopLeftRadius: hp(7),
            borderTopRightRadius: hp(7),
          }}
          barStyle={{ backgroundColor: "#f2f2f2" }}
        >
          <Intervals
            intervals={this.state.intervals}
            selectInterval={this.selectInterval}
          />
        </SwipeablePanel>
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
    width: wp(60),
    justifyContent: "center",
    alignItems: "center",
  },
});
