import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import DayOffPreview from "../../components/DayOffPreview";

import { NavigationEvents } from "react-navigation";
import ModifyDayOff from "../../components/ModifyDayOff";

import Moment from "moment";

var lastUserInfo = {};

export default class DaysOff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_username: false,
      typing_password: false,
      animation_login: new Animated.Value(width - widthPercentageToDP(80)),
      enable: true,
      desiredDate: null,
      daysOff: [],
      isLoading: true,
      page: 0,
      isModalVisible: false,
      isDatePickerVisible: false,
      desiredDate: "Selecteaza data",
    };
  }

  componentDidMount = async () => {
    this.onPageFocus();
  };

  onPageFocus = async () => {
    var userAsString = await AsyncStorage.getItem("@UserStore:userInfo");
    lastUserInfo = JSON.parse(userAsString);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/getDaysOff?page=" +
        this.state.page +
        "&size=200",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ daysOff: result.content, isLoading: false });
      })
      .catch((error) => console.log("error", error));
  };

  sendDayOff = async () => {
    this.setState({ desiredDate: "Selecteaza data" });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        appointmentDate: this.state.desiredDate,
        appointmentInterval: "10:00 - 18:00",
        service: "DAY OFF",
      }),
      redirect: "follow",
    };

    console.log("BODY>>>", requestOptions.body);

    await fetch(
      "http://185.247.118.91:8082/appointmentPlatform/api/appointment/registerAppointment?userID=" +
        lastUserInfo.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // this.props.navigation.replace("DashboardUser");
      })
      .catch((error) => console.log("error", error));

    this.onPageFocus();
  };

  modifyDayOff = async (item) => {
    console.log("REUNTN>>>>>>", item);

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
        //   this.props.navigation.replace("DashboardAdmin");
      })
      .catch((error) => console.log("error", error));
    this.onPageFocus();
  };

  renderRow = ({ item, index }) => {
    return <DayOffPreview item={item} modifyDayOff={this.modifyDayOff} />;
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  editStatus = () => {
    this.toggleModal();
  };

  toggleDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
  };

  handleDate = (date) => {
    this.setState({ desiredDate: date });
    this.toggleDatePicker();
  };

  render() {
    return (
      <ImageBackground
        source={require("../../assets/purpleBackground.png")}
        style={styles.container}
      >
        <NavigationEvents onDidFocus={() => this.onPageFocus()} />
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTextStyle}>ZILE LIBERE</Text>
          </View>
          <View style={styles.dateField}>
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

            <TouchableOpacity
              onPress={() => this.sendDayOff()}
              style={{ marginLeft: wp(2) }}
            >
              <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ width: wp(90), height: hp(78) }}>
            <FlatList
              data={this.state.daysOff}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderRow}
              style={{ marginTop: heightPercentageToDP(3) }}
            />
          </View>
        </View>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleDate}
          onCancel={this.toggleDatePicker}
        />
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
    flex: 0.8,
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
    flexDirection: "row",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    letterSpacing: 2,
  },
  action: {
    flexDirection: "row",
    borderBottomColor: "black",
    width: wp(40),
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
