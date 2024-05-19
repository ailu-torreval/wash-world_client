import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

const AdminNavigation: React.FC = () => {
    const { theme } = useTheme();

    return (
        <NavigationContainer 
        theme={{
            colors: {
                primary: theme.colors.primary,
                background: theme.colors.background,
                card: theme.colors.white,
                text: theme.colors.black,
                border: "",
                notification: ""
            },
            dark: theme.mode === 'dark',
          }}>
        <View>
            <Text> ADMIN Navigation Component</Text>
        </View>
        </NavigationContainer>
    );
};

export default AdminNavigation;