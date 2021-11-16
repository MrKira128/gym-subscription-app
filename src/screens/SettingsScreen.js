import React, { useState, useCallback } from "react";
import { Button, Modal, Portal } from "react-native-paper";
import { View, Text, SafeAreaView, StyleSheet, Alert, Linking } from "react-native";
import SafeViewAndroid from "./../modules/SafeViewAndroid";
import { Header } from "./../components/Header";

const OpenURLButton = ({ url, text }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}\n Try installing the requested app.`);
    }
  }, [url]);

  return <Button onPress={handlePress} style={styles.button} mode="contained" > {text} </Button>;
};


export function SettingsScreen() {
  const [visible, setVisible] = useState(false); //add user overlay

  const showModal = () => setVisible(true); //add user overlay
  const hideModal = () => setVisible(false);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Header title={"الاعدادات"} />
      <View style={styles.container}>
        <Button mode="contained" style={styles.button} onPress={showModal}>
          تواصل معنا
        </Button>
        <Text>إهداء الى الكابتن محمد الحسيني </Text>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.overlay}
          >
            <Text
              style={{ fontSize: 24, textAlign: "center", paddingBottom: 15 }}
            >
              تواصل معنا
            </Text>
            <OpenURLButton text="Facebook" url="https://facebook.com/nour.gaser" />
            <OpenURLButton text="Instagram" url="https://www.instagram.com/nourgaser1/" />
            <OpenURLButton text="Whatsapp" url="https://wa.me/+201023973866" />
            <OpenURLButton text="GitHub" url="https://github.com/nourgaser" />
            <Text style={{textAlign: "center", marginVertical: 20}}>{"Author: Nour El-Din Gaser"}</Text>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: "70%",
    marginVertical: 10,
    alignSelf: "center",
    elevation: 0
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
