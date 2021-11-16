import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function UserListItem({ user, letter = "", navigation }) {
  let {name, dates} = user;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("UserScreen", { user: user });
      }}
    >
      <Text style={styles.letter}>{letter}</Text>
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  letter: {
    width: "15%",
    textAlign: "center",
    fontSize: 22,
    color: "#E18B8B",
  },
  name: {
    fontSize: 22,
  },
  container: {
    paddingVertical: 5,
    flexDirection: "row-reverse",
  },
});
