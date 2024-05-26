import { Header, useTheme, Icon, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ClientState } from '../store/clientSlice';

type Props = {
    screen: string
}

const CustomHeader: React.FC<Props> = ({screen}) => {
    const { theme } = useTheme();
    const client = useSelector((state:any)=> state?.client)
    console.log("from header!",client)

    return (
        <>
        {screen === 'home' ?
        <Header
            leftComponent={
                <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize', width: "130%"}}>Hi {client !== null && client.client.firstname}!</Text>}
            rightComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 18 }}>{client !== null && client.client.reward_points_balance}</Text>
                    <Icon name='star' color={theme.colors.primary} />
                </View>
            }
            containerStyle={{
                backgroundColor: "#303030",
                justifyContent: 'space-around',
                paddingTop:35,
                paddingBottom:15,
                borderBottomColor: theme.colors.primary
            }}
        /> :         <Header
        leftComponent={
            <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize'  }}>Others</Text>}
        rightComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 18 }}>{client !== null && client.client.reward_points_balance}</Text>
                <Icon name='star' color={theme.colors.primary} />
            </View>
        }
        containerStyle={{
            backgroundColor: "#303030",
            justifyContent: 'space-around',
            paddingTop:35,
            paddingBottom:15,
            borderBottomColor: theme.colors.primary
        }}
    />

        
    }
        </>
    );
};

export default CustomHeader;