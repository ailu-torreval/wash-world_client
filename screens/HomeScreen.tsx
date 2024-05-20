import { useTheme } from '@rneui/themed';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={{...styles.text, color: theme.colors.primary}}>Welcome to the Home Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});

export default HomeScreen;