import { Input, Icon, Button } from "@rneui/themed";
import React from "react";
import { Alert, View, StyleSheet, Image } from "react-native";
import { LoginUserDto } from "../entities/LoginUserDTO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { login, ClientState } from "../store/clientSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
const logo = require("../assets/logo.png");


type Props = {
  setIsLogged: (isLogged: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const LoginScreen: React.FC<Props> = ({ setIsLogged, setIsAdmin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  // const error = useSelector((state: ClientState) => state.client?.error);
  const error = useSelector((state: any) => state.client?.error);
  const client = useSelector((state: any) => state?.client);

  React.useEffect(() => {
    if (error && email !== "" && password !== "") {
      setEmail("");
      setPassword("");
      Alert.alert("Error", "Invalid credentials, try again.");
      console.log("error effect", error);
    }
  }, [error]);

  async function handleLogin() {
    // Handle login logic here
    console.log(email, password);
    const loginData: LoginUserDto = {
      email: email,
      password: password,
    };
    await dispatch(login(loginData));
    if (!error) {
      // Update the login state in the App component
      
      setIsLogged(true);
      if(client.role === 'admin') {
        setIsAdmin(true)
      }
    }
    // navigation.navigate("main-navigation")
  }
  return (
    <View style={styles.container}>
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
        label="Email"
        labelStyle={styles.labelStyle}
        labelProps={{}}
        leftIcon={<Icon name="person" size={20} />}
        leftIconContainerStyle={styles.iconContainer}
        rightIconContainerStyle={styles.iconContainer}
        placeholder="Add email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
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
        onChangeText={(value) => setPassword(value)}
        value={password}
        autoCapitalize="none"
      />
      <Button
        title="Login"
        size="lg"
        onPress={handleLogin}
        disabled={!password && !email}
        disabledStyle={{ backgroundColor: "grey" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    // alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
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
});

export default LoginScreen;
