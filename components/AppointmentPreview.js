import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import Moment from "moment";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class AppointmentPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  selectInterval = (item) => {
    this.props.goToAppointmentDetails(item);
  };

  render() {
    if (this.props.item.status === "Anulata") {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.coloredText}>SERVICIUL</Text>
            {this.props.item.service === "tuns_barbat" ? (
              <Text style={styles.text}>TUNS BARBAT</Text>
            ) : null}
            {this.props.item.service === "tuns_femeie" ? (
              <Text style={styles.text}>TUNS FEMEIE</Text>
            ) : null}
            {this.props.item.service === "tuns_copil" ? (
              <Text style={styles.text}>TUNS COPIL</Text>
            ) : null}
            {this.props.item.service === "spalat_barbat" ? (
              <Text style={styles.text}>SPALAT BARBAT</Text>
            ) : null}
            {this.props.item.service === "spalat_femeie" ? (
              <Text style={styles.text}>SPALAT FEMEIE</Text>
            ) : null}
            {this.props.item.service === "coafat" ? (
              <Text style={styles.text}>COAFAT</Text>
            ) : null}
            {this.props.item.service === "vopsit_radacina" ? (
              <Text style={styles.text}>VOPSIT RADACINI</Text>
            ) : null}
            {this.props.item.service === "vopsit_uniform" ? (
              <Text style={styles.text}>VOPSIT UNIFORM</Text>
            ) : null}
            {this.props.item.service === "balayage" ? (
              <Text style={styles.text}>BALAYAGE</Text>
            ) : null}
            {this.props.item.service === "corectare_culoare" ? (
              <Text style={styles.text}>CORECTARE CULOARE</Text>
            ) : null}
            {this.props.item.service === "schimbare_culoare" ? (
              <Text style={styles.text}>SCHIMBARE CULOARE</Text>
            ) : null}
            <Text style={styles.coloredText}>CLIENTUL</Text>
            <Text style={styles.text}>{this.props.item.client.firstName}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.coloredText}>DATA</Text>
                <Text style={styles.dateText}>
                  {Moment(this.props.item.appointmentDate).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View>
                <Text style={styles.coloredText}>INTERVAL ORAR</Text>
                <Text style={styles.dateText}>
                  {this.props.item.appointmentInterval}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.status}>
            <Text style={styles.coloredText}>STATUS: </Text>
            {this.props.item.status === "Confirmata" ? (
              <Text style={styles.statusText}>CONFIRMATA</Text>
            ) : (
              <Text></Text>
            )}
            {this.props.item.status === "Anulata" ? (
              <Text style={styles.statusText}>ANULATA</Text>
            ) : (
              <Text></Text>
            )}
            {this.props.item.status === "Astept confirmare" ? (
              <Text style={styles.statusText}>IN ASTEPTARE</Text>
            ) : (
              <Text></Text>
            )}
            {this.props.item.status === "Efectuata" ? (
              <Text style={styles.statusText}>EFECTUATA</Text>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
      );
    } else {
      if (this.state.isExpanded) {
        return (
          <TouchableOpacity onPress={() => this.toggleExpanded()}>
            <View style={styles.containerExpanded}>
              <View style={styles.content}>
                <Text style={styles.coloredText}>SERVICIUL</Text>
                {this.props.item.service === "tuns_barbat" ? (
                  <Text style={styles.text}>TUNS BARBAT</Text>
                ) : null}
                {this.props.item.service === "tuns_femeie" ? (
                  <Text style={styles.text}>TUNS FEMEIE</Text>
                ) : null}
                {this.props.item.service === "tuns_copil" ? (
                  <Text style={styles.text}>TUNS COPIL</Text>
                ) : null}
                {this.props.item.service === "spalat_barbat" ? (
                  <Text style={styles.text}>SPALAT BARBAT</Text>
                ) : null}
                {this.props.item.service === "spalat_femeie" ? (
                  <Text style={styles.text}>SPALAT FEMEIE</Text>
                ) : null}
                {this.props.item.service === "coafat" ? (
                  <Text style={styles.text}>COAFAT</Text>
                ) : null}
                {this.props.item.service === "vopsit_radacina" ? (
                  <Text style={styles.text}>VOPSIT RADACINI</Text>
                ) : null}
                {this.props.item.service === "vopsit_uniform" ? (
                  <Text style={styles.text}>VOPSIT UNIFORM</Text>
                ) : null}
                {this.props.item.service === "balayage" ? (
                  <Text style={styles.text}>BALAYAGE</Text>
                ) : null}
                {this.props.item.service === "corectare_culoare" ? (
                  <Text style={styles.text}>CORECTARE CULOARE</Text>
                ) : null}
                {this.props.item.service === "schimbare_culoare" ? (
                  <Text style={styles.text}>SCHIMBARE CULOARE</Text>
                ) : null}
                <Text style={styles.coloredText}>CLIENTUL</Text>
                <Text style={styles.text}>
                  {this.props.item.client.firstName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.coloredText}>DATA</Text>
                    <Text style={styles.dateText}>
                      {Moment(this.props.item.appointmentDate).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.coloredText}>INTERVAL ORAR</Text>
                    <Text style={styles.dateText}>
                      {this.props.item.appointmentInterval}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.cancelAppointment(this.props.item)
                    }
                  >
                    <Image
                      source={require("../assets/cancelButton.png")}
                      style={{ resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.toggleExpanded();
                      this.props.confirmAppointment(this.props.item);
                    }}
                  >
                    <Image
                      source={require("../assets/confirmButton.png")}
                      style={{ resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.statusExpanded}>
                <Text style={styles.coloredText}>STATUS: </Text>
                {this.props.item.status === "Confirmata" ? (
                  <Text style={styles.statusText}>CONFIRMATA</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Anulata" ? (
                  <Text style={styles.statusText}>ANULATA</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Astept confirmare" ? (
                  <Text style={styles.statusText}>IN ASTEPTARE</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Efectuata" ? (
                  <Text style={styles.statusText}>EFECTUATA</Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        if (this.props.item.status === "Efectuata") {
          return (
            <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.coloredText}>SERVICIUL</Text>
                {this.props.item.service === "tuns_barbat" ? (
                  <Text style={styles.text}>TUNS BARBAT</Text>
                ) : null}
                {this.props.item.service === "tuns_femeie" ? (
                  <Text style={styles.text}>TUNS FEMEIE</Text>
                ) : null}
                {this.props.item.service === "tuns_copil" ? (
                  <Text style={styles.text}>TUNS COPIL</Text>
                ) : null}
                {this.props.item.service === "spalat_barbat" ? (
                  <Text style={styles.text}>SPALAT BARBAT</Text>
                ) : null}
                {this.props.item.service === "spalat_femeie" ? (
                  <Text style={styles.text}>SPALAT FEMEIE</Text>
                ) : null}
                {this.props.item.service === "coafat" ? (
                  <Text style={styles.text}>COAFAT</Text>
                ) : null}
                {this.props.item.service === "vopsit_radacina" ? (
                  <Text style={styles.text}>VOPSIT RADACINI</Text>
                ) : null}
                {this.props.item.service === "vopsit_uniform" ? (
                  <Text style={styles.text}>VOPSIT UNIFORM</Text>
                ) : null}
                {this.props.item.service === "balayage" ? (
                  <Text style={styles.text}>BALAYAGE</Text>
                ) : null}
                {this.props.item.service === "corectare_culoare" ? (
                  <Text style={styles.text}>CORECTARE CULOARE</Text>
                ) : null}
                {this.props.item.service === "schimbare_culoare" ? (
                  <Text style={styles.text}>SCHIMBARE CULOARE</Text>
                ) : null}
                <Text style={styles.coloredText}>CLIENTUL</Text>
                <Text style={styles.text}>
                  {this.props.item.client.firstName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.coloredText}>DATA</Text>
                    <Text style={styles.dateText}>
                      {Moment(this.props.item.appointmentDate).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.coloredText}>INTERVAL ORAR</Text>
                    <Text style={styles.dateText}>
                      {this.props.item.appointmentInterval}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.status}>
                <Text style={styles.coloredText}>STATUS: </Text>
                {this.props.item.status === "Confirmata" ? (
                  <Text style={styles.statusText}>CONFIRMATA</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Anulata" ? (
                  <Text style={styles.statusText}>ANULATA</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Astept confirmare" ? (
                  <Text style={styles.statusText}>IN ASTEPTARE</Text>
                ) : (
                  <Text></Text>
                )}
                {this.props.item.status === "Efectuata" ? (
                  <Text style={styles.statusText}>EFECTUATA</Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          );
        } else {
          return (
            <TouchableOpacity onPress={() => this.toggleExpanded()}>
              <View style={styles.container}>
                <View style={styles.content}>
                  <Text style={styles.coloredText}>SERVICIUL</Text>
                  {this.props.item.service === "tuns_barbat" ? (
                    <Text style={styles.text}>TUNS BARBAT</Text>
                  ) : null}
                  {this.props.item.service === "tuns_femeie" ? (
                    <Text style={styles.text}>TUNS FEMEIE</Text>
                  ) : null}
                  {this.props.item.service === "tuns_copil" ? (
                    <Text style={styles.text}>TUNS COPIL</Text>
                  ) : null}
                  {this.props.item.service === "spalat_barbat" ? (
                    <Text style={styles.text}>SPALAT BARBAT</Text>
                  ) : null}
                  {this.props.item.service === "spalat_femeie" ? (
                    <Text style={styles.text}>SPALAT FEMEIE</Text>
                  ) : null}
                  {this.props.item.service === "coafat" ? (
                    <Text style={styles.text}>COAFAT</Text>
                  ) : null}
                  {this.props.item.service === "vopsit_radacina" ? (
                    <Text style={styles.text}>VOPSIT RADACINI</Text>
                  ) : null}
                  {this.props.item.service === "vopsit_uniform" ? (
                    <Text style={styles.text}>VOPSIT UNIFORM</Text>
                  ) : null}
                  {this.props.item.service === "balayage" ? (
                    <Text style={styles.text}>BALAYAGE</Text>
                  ) : null}
                  {this.props.item.service === "corectare_culoare" ? (
                    <Text style={styles.text}>CORECTARE CULOARE</Text>
                  ) : null}
                  {this.props.item.service === "schimbare_culoare" ? (
                    <Text style={styles.text}>SCHIMBARE CULOARE</Text>
                  ) : null}
                  <Text style={styles.coloredText}>CLIENTUL</Text>
                  <Text style={styles.text}>
                    {this.props.item.client.firstName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={styles.coloredText}>DATA</Text>
                      <Text style={styles.dateText}>
                        {Moment(this.props.item.appointmentDate).format(
                          "DD/MM/YYYY"
                        )}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.coloredText}>INTERVAL ORAR</Text>
                      <Text style={styles.dateText}>
                        {this.props.item.appointmentInterval}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.status}>
                  <Text style={styles.coloredText}>STATUS: </Text>
                  {this.props.item.status === "Confirmata" ? (
                    <Text style={styles.statusText}>CONFIRMATA</Text>
                  ) : (
                    <Text></Text>
                  )}
                  {this.props.item.status === "Anulata" ? (
                    <Text style={styles.statusText}>ANULATA</Text>
                  ) : (
                    <Text></Text>
                  )}
                  {this.props.item.status === "Astept confirmare" ? (
                    <Text style={styles.statusText}>IN ASTEPTARE</Text>
                  ) : (
                    <Text></Text>
                  )}
                  {this.props.item.status === "Efectuata" ? (
                    <Text style={styles.statusText}>EFECTUATA</Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(30),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  buttonContainer: {
    marginTop: hp(2),
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerExpanded: {
    marginTop: hp(3),
    width: wp(90),
    height: hp(36),
    backgroundColor: "#f2f2f2",
    borderRadius: hp(5),
  },
  content: {
    flex: 3,
    padding: hp(3),
  },
  status: {
    flex: 1,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  statusExpanded: {
    flex: 0.7,
    backgroundColor: "#FFCC00",
    borderBottomLeftRadius: hp(5),
    borderBottomRightRadius: hp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  coloredText: {
    color: "#AE0EFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: hp(1),
    textTransform: "uppercase",
  },
  statusText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  dateText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: hp(1),
  },
});
