import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View, Alert, ScrollView } from "react-native";
import uuid from "react-native-uuid";
// import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SwipeRow } from "react-native-swipe-list-view";

import {
  Button,
  IconButton,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";

import { Header } from "./../components/Header";
import SafeViewAndroid from "./../modules/SafeViewAndroid";
import { theme, colorScheme } from "./../config/Theme";
import XDate from "./../modules/xdate";
import { byProperty } from "./../modules/sortByProperty";
import { storeData, getData, getAllUsers, storeUser } from "./../data";
import { removeUser } from "./../data";

export function UserScreen({ navigation, route }) {
  let { user } = route.params;
  let dates = user.dates;
  const [key, setKey] = useState(Math.random());

  //new date modal
  const [newDateModalVisible, setNewDateModalVisible] = useState(false);
  const [newDateModalText, setNewDateModalText] = useState("");
  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const showNewDateModal = () => setNewDateModalVisible(true);
  const hideNewDateModal = () => setNewDateModalVisible(false);

  //date modal
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const showDateModal = () => setDateModalVisible(true);
  const hideDateModal = () => setDateModalVisible(false);

  dates.sort(byProperty("date"));

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Header title={user.name} navigation={navigation} backButton={true} />
      {/* Dates view */}
      <ScrollView key={key}>
        {dates.map((e, i) => {
          return (
            <SwipeRow key={e.id} leftOpenValue={0} rightOpenValue={-75}>
              <View>
                <Button
                  mode="contained"
                  style={styles.removeButton}
                  onPress={async () => {
                    user.dates.splice(i, 1);
                    await storeUser(user);
                    setKey(Math.random());
                  }}
                >
                  {"حذف"}
                </Button>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.text,
                    backgroundColor:
                      i % 2 != 0 ? colorScheme.secondary : "#fff",
                  }}
                >
                  {new XDate(e.date).toString("dd/MM/yyyy") +
                    (e.note ? " - " + e.note : "")}
                </Text>
              </View>
            </SwipeRow>
          );
        })}
      </ScrollView>
      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            showNewDateModal();
          }}
        >
          اضافة اشتراك
        </Button>
        <Button
          mode="contained"
          style={{ ...styles.button, backgroundColor: colorScheme.secondary2 }}
          onPress={async () => {
            Alert.alert(
              "التأكيد",
              "هل انت متأكد؟ سوف تقوم بمسح المستخدم بجيمع اشتراكاته",
              [
                {
                  text: "إلغاء",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "امسح",
                  style: "destructive",
                  onPress: async () => {
                    await removeUser(user.id);
                    navigation.navigate("المشتركون");
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          حذف المشترك
        </Button>
      </View>

      {/* Portals */}
      <Portal>
        <Modal
          visible={newDateModalVisible}
          onDismiss={hideNewDateModal}
          contentContainerStyle={styles.overlay}
        >
          <Text style={{ fontSize: 20 }}>{"التاريخ"}</Text>
          <Button
            mode="contained"
            style={{ alignSelf: "center", marginVertical: 20, elevation: 0 }}
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            {new XDate(date).toString("dd/MM/yyyy")}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type != "dismissed") {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }
              }}
            />
          )}
          <TextInput
            label="التعليق"
            style={{ textAlign: "right" }}
            value={newDateModalText}
            onChangeText={(text) => setNewDateModalText(text)}
            theme={{
              colors: {
                text: "black",
                placeholder: "black",
              },
            }}
          />
          <Button
            style={{ marginTop: 10, elevation: 0 }}
            mode="contained"
            onPress={async () => {
              user.dates.push({
                id: uuid.v4(),
                date: date,
                note: newDateModalText,
              });
              await storeUser(user);
              hideNewDateModal();
            }}
          >
            اضافة
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    paddingVertical: 8,
  },
  buttonContainer: {
    backgroundColor: "rgba(0,0,0, 0)",
    borderTopWidth: 3,
    borderColor: colorScheme.primary,
  },
  button: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },
  overlay: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 20,
  },
  removeButton: {
    alignSelf: "flex-end",
    width: 75,
    height: "100%",
    borderRadius: 0,
    backgroundColor: "#D92727",
    paddingVertical: 8,
  },
});
