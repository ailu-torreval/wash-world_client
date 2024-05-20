import React, { useState } from "react";
import {
  Alert,
  Image,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { Button, Icon, Input } from "@rneui/themed";
import { SignupUserDto } from "../entities/SignupUserDTO";
import { signup } from "../store/clientSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
const logo = require("../assets/logo.png");


type Props = {
  setIsLogged: (isLogged: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const SignupScreen: React.FC<Props> = ({ setIsLogged, setIsAdmin }) => {
  const [newClient, setNewClient] = React.useState<SignupUserDto>({
    firstname: "",
    email: "",
    lastname: "",
    password: "",
    license_plate: "",
  });
  const [confirmPass, setConfirmPass] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  // const error = useSelector((state: ClientState) => state.client?.error);
  const error = useSelector((state: any) => state.client?.error);
  const client = useSelector((state: any) => state?.client);


  React.useEffect(() => {
    if (
      error &&
      newClient.email !== "" &&
      newClient.password !== "" &&
      newClient.firstname !== "" &&
      newClient.lastname !== "" &&
      newClient.license_plate !== ""
    ) {
      setNewClient({
        firstname: "",
        email: "",
        lastname: "",
        password: "",
        license_plate: "",
      });
      setConfirmPass("");
      Alert.alert("Error", "Invalid credentials, try again.");
    }
  }, [error]);

  React.useEffect(() => {
    if (
      newClient.email.includes("@") &&
      newClient.password !== "" &&
      newClient.password === confirmPass &&
      newClient.firstname !== "" &&
      newClient.lastname !== "" &&
      newClient.license_plate !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    newClient.email,
    newClient.password,
    newClient.firstname,
    newClient.lastname,
    newClient.license_plate,
    confirmPass,
  ]);

  async function handleSignup() {
    await dispatch(signup(newClient));
    if (!error) {
      setIsLogged(true);
      if(client.role === 'admin') {
        setIsAdmin(true)
      }
    }

    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={logo}
          style={{ width: "50%", alignSelf: "center" }}
          resizeMode="contain"
        />
        <Input
          containerStyle={styles.inputContainer}
          disabledInputStyle={{ backgroundColor: "#ddd" }}
          inputContainerStyle={styles.inputContainer}
          errorProps={{}}
          label="First Name"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          placeholder="Add name"
          onChangeText={(value) =>
            setNewClient((prevState) => ({ ...prevState, firstname: value }))
          }
          value={newClient.firstname}
        />
        <Input
          containerStyle={styles.inputContainer}
          disabledInputStyle={{ backgroundColor: "#ddd" }}
          inputContainerStyle={styles.inputContainer}
          errorProps={{}}
          label="Last name"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          placeholder="Add last name"
          onChangeText={(value) =>
            setNewClient((prevState) => ({ ...prevState, lastname: value }))
          }
          value={newClient.lastname}
        />
        <Input
          containerStyle={styles.inputContainer}
          disabledInputStyle={{ backgroundColor: "#ddd" }}
          inputContainerStyle={styles.inputContainer}
          errorProps={{}}
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          placeholder="Add valid email"
          errorStyle={{ color: "red" }}
          errorMessage={
            newClient.email !== "" && !newClient.email.includes("@")
              ? "Invalid email"
              : ""
          }
          onChangeText={(value) =>
            setNewClient((prevState) => ({ ...prevState, email: value }))
          }
          value={newClient.email}
        />
        <Input
          containerStyle={styles.inputContainer}
          disabledInputStyle={{ backgroundColor: "#ddd" }}
          inputContainerStyle={styles.inputContainer}
          errorProps={{}}
          label="License Plate"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          placeholder="Add a valid license plate"
          onChangeText={(value) =>
            setNewClient((prevState) => ({
              ...prevState,
              license_plate: value,
            }))
          }
          value={newClient.license_plate}
        />
        <Input
          secureTextEntry={true}
          errorProps={{}}
          label="Password"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          leftIcon={<Icon name="vpn-key" size={20} />}
          leftIconContainerStyle={styles.iconContainer}
          rightIconContainerStyle={styles.iconContainer}
          autoCapitalize="none"
          placeholder="Add a password"
          onChangeText={(value) =>
            setNewClient((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          value={newClient.password}
        />
        <Input
          secureTextEntry={true}
          errorProps={{}}
          label="Confirm Password"
          labelStyle={styles.labelStyle}
          labelProps={{}}
          leftIcon={<Icon name="vpn-key" size={20} />}
          leftIconContainerStyle={styles.iconContainer}
          rightIconContainerStyle={styles.iconContainer}
          onChangeText={(value) => setConfirmPass(value)}
          errorStyle={{ color: "red" }}
          errorMessage={
            confirmPass !== "" && newClient.password !== confirmPass
              ? "Passwords dont match"
              : ""
          }
          placeholder="Repeat password"
          value={confirmPass}
          autoCapitalize="none"
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Signup"
          size="lg"
          onPress={handleSignup}
          disabled={!isFormValid}
          disabledStyle={{ backgroundColor: "grey" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  labelStyle: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginRight: 10,
  },
  footer: { justifyContent: "flex-end", padding: 4 },
});

export default SignupScreen;
