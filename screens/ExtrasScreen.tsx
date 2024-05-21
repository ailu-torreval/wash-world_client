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

type Props = NativeStackScreenProps<RootStackParamList, "chooseExtras">;


const ExtrasScreen:React.FC<Props> = ({ navigation }) => {
    const { data: extras, isLoading, isError } = useGetExtras();
    const dispatch = useDispatch<AppDispatch>();
    const currentInvoice = useSelector((state: RootState)=> state.invoice.invoiceDto);
    const [selected, setSelected] = useState<Extra[]>([])

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0CEF78" />;
      
    }
    
    
      function updateInvoice(extra: Extra) {
        console.log("extra")
        // dispatch(updateInvoiceDto({extras_id: washType}));
        console.log("WASH", currentInvoice)
        navigation.navigate('chooseExtras')
    
      }
    
    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={extras}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ExtraCard extra={item} action={()=> updateInvoice(item)} />}
          />
        {/* <WashCard /> */}
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
  });
