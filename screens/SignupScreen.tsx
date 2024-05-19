
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
  };

  return (
    <View>
      <Text>
        SIGNUP
      </Text>
    </View>
  );
};

export default SignupScreen;