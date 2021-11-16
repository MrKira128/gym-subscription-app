import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import { Button, IconButton, Modal, Portal, TextInput } from "react-native-paper";
import { Header } from "./../components/Header";
import SafeViewAndroid from "./../modules/SafeViewAndroid";
import { theme, colorScheme } from "./../config/Theme";
import { UserListItem } from "./../components/UserListItem";
import { storeData, getData, getAllUsers, storeUser } from "./../data";
import { byProperty } from "./../modules/sortByProperty";

export function MainScreen({ navigation }) {
  const [data, setData] = useState([]); //user data

  const [visible, setVisible] = useState(false); //add user overlay
  const [overlayText, setOverlayText] = useState("");

  const fetchData = async () => {
    console.log("fetching data");
    setData((await getAllUsers()).users);
  };
  const showModal = () => setVisible(true); //add user overlay
  const hideModal = () => setVisible(false);

  //user data
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  //sort and give ids to data
  data.sort(byProperty("name"));

  var temp;

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Header
        title="المشتركون"
        showSearch={true}
        rerenderParent={async (text) => {
          if (text.length == 0) {
            return await fetchData();
          }
          let newData = [];
          let allUsers = (await getAllUsers()).users;
          allUsers.forEach((e) => {
            console.log(e.name);
            if (e.name.includes(text)) {
              newData.push(e);
            }
          });
          setData(newData);
        }}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.overlay}
        >
          <Text
            style={{ fontSize: 24, textAlign: "center", paddingBottom: 15 }}
          >
            اضافة مشترك جديد
          </Text>
          <TextInput
            label="اسم المشترك الجديد"
            style={{ textAlign: "right" }}
            value={overlayText}
            onChangeText={(text) => setOverlayText(text)}
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
              if (overlayText.length === 0) return;
              await addNewUser(overlayText);
              await fetchData();
              setOverlayText("");
              hideModal();
            }}
          >
            اضافة
          </Button>
        </Modal>
      </Portal>
      <IconButton
        icon="plus"
        color="white"
        style={styles.addButton}
        onPress={showModal}
        size={40}
      />
      <ScrollView>
        {data.map((e) => {
          let ltr = e.name[0] != temp ? e.name[0] : "";
          temp = e.name[0];
          return (
            <UserListItem
              key={e.id}
              user={e}
              letter={ltr}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

var addNewUser = async function (name) {
  await storeUser({ id: uuid.v4(), name: name, dates: [] });
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colorScheme.primary,
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 10,
    elevation: 0,
  },
  overlay: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 20,
  },
});
