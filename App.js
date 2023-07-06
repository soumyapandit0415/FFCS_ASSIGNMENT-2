import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";

export default function App() {
  const [id, setID] = useState("");
  const [getName, setGetName] = useState("");
  const [name, setName] = useState("");
  const [Employee_Salary, setEmployee_Salary] = useState("");
  const [Age, setAge] = useState("");
  const [Profile_Image, setProfile_Image] = useState("");
  const [showMethod, setShowMethod] = useState(null);

  const fetchUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("Response:", json);
        setGetName(json.data.employee_name);
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const addUser = () => {
    fetch("https://dummy.restapiexample.com/api/v1/create", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        Employee_Salary: Employee_Salary,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.id) {
          ToastAndroid.show(
            "Created object at id: " + json.id,
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Failed to create object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const updateUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        Employee_Salary: Employee_Salary,
        Age: Age,
        Profile_Image: "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.updatedAt) {
          ToastAndroid.show("Updated object", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Failed to update object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  const deleteUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Failed to delete object", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error(error);
        ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      {showMethod === null && <Text style={styles.header}>API</Text>}
      {showMethod === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>GET method!</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id.toString()}
            onChangeText={(text) => setID(parseInt(text))}
          />
          <Button
            title="Fetch"
            style={styles.button}
            onPress={fetchUser}
            color="black"
          />
          <Text>Name: {getName}</Text>
        </View>
      )}
      {showMethod === "POST" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>POST method!</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Employee_Salary"
            style={styles.input}
            value={Employee_Salary}
            onChangeText={setEmployee_Salary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={Age}
            onChangeText={setAge}
          />
          <TextInput
            placeholder="Profile_Image"
            style={styles.input}
            value={Profile_Image}
            onChangeText={setProfile_Image}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={addUser}
            color="black"
          />
        </View>
      )}

      {showMethod === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>PUT method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id.toString()}
            onChangeText={(text) => setID(parseInt(text))}
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Employee_Salary"
            style={styles.input}
            value={Employee_Salary}
            onChangeText={setEmployee_Salary}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={updateUser}
            color="black"
          />
        </View>
      )}
      {showMethod === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>DELETE method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id.toString()}
            onChangeText={(text) => setID(parseInt(text))}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={deleteUser}
            color="black"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setShowMethod("GET")}
          color="black"
        />

        <Button
          title="POST"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setShowMethod("POST")}
          color="black"
        />

        <Button
          title="PUT"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setShowMethod("PUT")}
          color="black"
        />

        <Button
          title="DELETE"
          style={[styles.button, styles.optionsButton]}
          onPress={() => setShowMethod("DELETE")}
          color="black"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#335EA1",
  },
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    height: 40,
    paddingHorizontal: 10,
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: 20,
    padding: 10,
  },

  optionsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 60,
    padding: 20,
  },
  methodContainer: {
    position: "absolute",
    top: 80,
    padding: 20,
  },
});
