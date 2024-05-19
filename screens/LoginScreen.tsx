import { useThemeMode, Input, Icon, Button } from "@rneui/themed";
import React, { useEffect } from "react";
import { View } from "react-native";
import { LoginUserDto } from "../entities/LoginUserDTO";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { login } from "../store/clientSlice";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    // Handle login logic here
    console.log(email, password);
    const loginData: LoginUserDto = {
        email: email,
        password: password,
        };

        dispatch(login(loginData));


  };

  return (
    <View>
      <Input
        containerStyle={{}}
        disabledInputStyle={{ backgroundColor: "#ddd" }}
        inputContainerStyle={{}}
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label="Email"
        labelStyle={{}}
        labelProps={{}}
        leftIcon={<Icon name="person" size={20} />}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        placeholder="Add email"
        onChangeText={(value) =>
            setEmail(value)
        }
        autoCapitalize="none"
      />
      <Input
        secureTextEntry={true}
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label="Password"
        labelStyle={{}}
        labelProps={{}}
        leftIcon={<Icon name="vpn-key" size={20} />}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        onChangeText={(value) =>
            setPassword(value)
        }
        autoCapitalize="none"

      />
            <Button
        title="Login"
        size="lg"
        onPress={handleLogin}
      />

    </View>
  );
};

export default LoginScreen;
