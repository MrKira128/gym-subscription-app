import AsyncStorage from "@react-native-async-storage/async-storage";

//get one user
const getUser = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem(id);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("\x1b[31m", "ERROR: Can't read user....");
  }
};

//creates or update user
const storeUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(user.id, jsonValue);
  } catch (e) {
    console.log("\x1b[31m", "ERROR: Can't write user....");
  }
};

//delete a user
const removeUser = async (id) => {
  try {
    return await AsyncStorage.removeItem(id);
  } catch (e) {
    console.log("\x1b[31m", "ERROR: Can't delete user....");
  }
};

//get all users
const getAllUsers = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    let res = await AsyncStorage.multiGet(keys);

    let users = [];
    res.forEach((e) => {
      users.push(JSON.parse(e[1]));
    });

    let usersDictionary = [];
    res.forEach((e) => {
      usersDictionary[e[0]] = e[1];
    });
    return { usersDictionary, users };
  } catch (e) {
    console.log("\x1b[31m", "ERROR: Can't get all users....", e);
  }
};

export { getAllUsers, getUser, storeUser, removeUser };
