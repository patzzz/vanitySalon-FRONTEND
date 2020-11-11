import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default class HourIntevalsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    this.props.closeModal();
  };

  selectInterval = (item) => {
    this.props.selectInterval(item);
    this.closeModal();
  };

  renderRow = ({ item, index }) => {
    return (
      <View>
        {item == "NULL" ? (
          <View></View>
        ) : (
          <View style={styles.interval}>
            <TouchableOpacity onPress={() => this.selectInterval(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.item.length == 0 ? (
          <Text style={styles.text}>INDISPONIBIL</Text>
        ) : (
          <FlatList
            data={this.props.item}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderRow}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    width: 200,
    alignItems: "center",
    padding: 10,
  },
  interval: {
    padding: 5,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 162,
    height: 37,
    borderWidth: 1.5,
    borderColor: "gray",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
