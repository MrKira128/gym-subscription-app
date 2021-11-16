import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { theme, colorScheme } from "./../config/Theme";

export function Header({
  title,
  showSearch = false,
  rerenderParent = null,
  backButton = false,
  navigation = null,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    //update list of users
  }, [query]);

  return (
    <LinearGradient
      style={styles.container}
      colors={colorScheme.gradientColors}
      locations={colorScheme.gradientLocations}
      start={[1, 1]}
    >
      <View
        style={{
          ...styles.header,
          justifyContent: backButton || showSearch ? "space-between" : "center",
        }}
      >
        {showSearch ? (
          <Searchbar
            style={styles.searchBar}
            placeholder="البحث"
            selectionColor="white"
            onChangeText={(text) => {
              setQuery(text);
              rerenderParent(text);
            }}
          />
        ) : (
          <View style={{ display: "none" }}></View>
        )}

        {backButton ? (
          <IconButton
            icon="chevron-left"
            color="white"
            style={styles.addButton}
            onPress={() => {
              navigation.goBack();
            }}
            size={40}
          />
        ) : (
          <View style={{ display: "none" }}></View>
        )}

        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "transparent",
  },
  container: {
    height: 70,
  },
  searchBar: {
    flex: 3,
    backgroundColor: "transparent",
    // elevation: 0,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 100,
    margin: 10,
    height: "55%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  title: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 15,
    fontSize: 20,
    textAlignVertical: "center",
  },
});
