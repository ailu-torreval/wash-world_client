import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator,   StyleSheet} from 'react-native';
import { RootStackParamList } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Extra } from '../entities/Extra';
import { updateInvoiceDto } from '../store/invoiceSlice';
import ExtraCard from '../components/ExtraCard';
import { useGetExtras } from '../queries/extras.hooks';
import { Button } from '@rneui/themed';

type Props = NativeStackScreenProps<RootStackParamList, "chooseExtras">;


const ExtrasScreen:React.FC<Props> = ({ navigation }) => {
    const { data: extras, isLoading, isError } = useGetExtras();
    const dispatch = useDispatch<AppDispatch>();
    const [selected, setSelected] = useState<Extra[]>([])

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0CEF78" />;
      
    }

    function handleSelection(extra: Extra) {
        setSelected(prevSelected => {
            if (prevSelected.find(e => e.id === extra.id)) {
                // If the extra is already selected, remove it
                return prevSelected.filter(e => e.id !== extra.id);
            } else {
                // If the extra is not selected, add it
                return [...prevSelected, extra];
            }
        });

    }
    
    
      function updateInvoice() {
        console.log("extras", selected)
        if(selected.length !== 0) {
            dispatch(updateInvoiceDto({extras_ids: selected}));
        }
        navigation.navigate('checkout')
    
      }
    
    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={extras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ExtraCard extra={item} action={()=> handleSelection(item)}
            selected={!!selected.find(e => e.id === item.id)} />}
          />
                <View style={styles.footer}>
        <Button
          title="Next"
          size="lg"
          onPress={updateInvoice}
        />
      </View>
      </SafeAreaView>
    );
};

export default ExtrasScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 16,
      textTransform: "capitalize",
    },
  
    card: {
      backgroundColor: "#303030",
      borderBottomColor: "#fff",
      borderBottomWidth: 5,
    },
    title: { color: "#fff", fontWeight: "bold", fontSize: 30 },
    footer: { justifyContent: "flex-end", padding: 4 },
  });
