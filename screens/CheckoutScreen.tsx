import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Extra } from "../entities/Extra";
import { Button, Icon, Input } from "@rneui/themed";
import { createInvoice, updateInvoiceDto } from "../store/invoiceSlice";
import { InvoiceDto } from "../entities/InvoiceDTO";
import { Venue } from "../entities/Venue";
import { WashType } from "../entities/WashType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type CardDetails = {
  cardNr: string;
  expiration: string;
  cardName: string;
  cvv: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "checkout">;

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const invoice = useSelector((state: RootState) => state.invoice.invoiceDto);
  const client = useSelector((state: RootState) => state.client.client);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(20);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNr: "12345",
    expiration: "10/28",
    cardName: "ailin",
    cvv: "123",
  });

  useEffect(() => {
    calculateDiscount();
    calculateTotal();
  }, []);

  useEffect(() => {
    console.log("invoice updated", invoice);
  }, [invoice]);

  useEffect(() => {
    if (
      cardDetails.cardNr !== "" &&
      cardDetails.expiration !== "" &&
      cardDetails.cardName !== "" &&
      cardDetails.cvv !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [cardDetails]);

  const toggleDiscount = () =>
    setDiscountApplied((previousState) => !previousState);

  function calculateDiscount(): number {
    console.log("line27 checkout");
    let savings = 0;

    if (Array.isArray(invoice.extras_ids) && client !== null) {
      const sortedExtras = invoice.extras_ids
        .filter((extra): extra is Extra => typeof extra !== "number")
        .sort((a, b) => a.points_price - b.points_price);
      let remainingPoints = client.reward_points_balance || 0;

      console.log("73", sortedExtras);
      for (const extra of sortedExtras) {
        console.log("80", extra.name, extra.points_price);
        if (extra.points_price <= remainingPoints) {
          remainingPoints -= extra.points_price;
          savings += extra.price;
        } else {
          break;
        }
      }
      const usedPoints = client?.reward_points_balance - remainingPoints;
      setPointsToRedeem(usedPoints);
    }
    console.log("SAV 89", savings);
    setDiscount(savings);

    return savings;
  }

  function calculateTotal() {
    if (invoice !== null) {
      let total = 0;

      if (typeof invoice.washType_id !== "number" && invoice.washType_id) {
        total += invoice.washType_id.price;
      }

      if (Array.isArray(invoice.extras_ids)) {
        invoice.extras_ids.forEach((extra) => {
          if (typeof extra !== "number" && extra.price) {
            total += extra.price;
          }
        });
      }

      setTotalAmount(total);
    }
  }

  async function handlePayment() {
    console.log("pay");
    if (client !== null) {
      let partialInvoice: Partial<InvoiceDto> = {
        client_id: client.id,
        total_amount: discountApplied ? totalAmount - discount : totalAmount,
        points_redeemed: discountApplied ? pointsToRedeem : 0,
      };

      if (
        invoice.venue_id &&
        typeof invoice.venue_id === "object" &&
        "id" in invoice.venue_id
      ) {
        partialInvoice.venue_id = invoice.venue_id.id;
      }
      if (
        invoice.washType_id &&
        typeof invoice.washType_id === "object" &&
        "id" in invoice.washType_id
      ) {
        partialInvoice.points_earned = invoice.washType_id.points_reward;
        partialInvoice.washType_id = invoice.washType_id.id;
      }
      if (invoice.extras_ids && Array.isArray(invoice.extras_ids)) {
        partialInvoice.extras_ids = invoice.extras_ids.map(
          (extra: Extra | number) => {
            if (typeof extra === "object" && "id" in extra) {
              return extra.id;
            } else {
              return 0;
            }
          }
        );
        console.log("Mapped extras_ids:", partialInvoice.extras_ids);
      } else if (invoice.extras_ids === undefined) {
        partialInvoice.extras_ids = [];
      }
      console.log("invoice before updating", partialInvoice);

      try {
        await dispatch(updateInvoiceDto(partialInvoice));
        await dispatch(createInvoice());
        Alert.alert(
          "Payment Accepted!",
          "Just relax now and we will take it from here.",
          [
            {
              text: "Back to Home",
              onPress: () => navigation.navigate("homescreen"),
            },
          ]
        );
      } catch (error) {
        Alert.alert("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {invoice !== null && invoice !== undefined && (
            <View>
              <Text style={styles.title}>Summary</Text>
              <View style={styles.content}>
                {invoice.venue_id && typeof invoice.venue_id !== "number" && (
                  <View style={styles.row}>
                    <Text style={styles.name}>Venue:</Text>
                    <Text style={styles.price}>{invoice.venue_id.name}</Text>
                  </View>
                )}
                {invoice.washType_id &&
                  typeof invoice.washType_id !== "number" && (
                    <View style={styles.row}>
                      <Text style={styles.name}>
                        {invoice.washType_id.name} Wash
                      </Text>
                      <Text style={styles.price}>
                        {invoice.washType_id.price} kr.
                      </Text>
                    </View>
                  )}
                {Array.isArray(invoice.extras_ids) && (
                  <View>
                    {invoice.extras_ids.map(
                      (extra) =>
                        extra &&
                        typeof extra !== "number" && (
                          <View key={extra.id} style={styles.row}>
                            <Text style={styles.name}>{extra.name} </Text>
                            <Text style={styles.price}>
                              {" "}
                              + {extra.price} kr.
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                )}
                <View style={styles.row}>
                  <Text style={[styles.name, styles.subtotal]}>Total</Text>
                  <Text style={[styles.price, styles.subtotalValue]}>
                    {" "}
                    {totalAmount} kr.
                  </Text>
                </View>
                {client !== null && discount > 0 && (
                  <View>
                    <Text style={styles.rewardTitle}>Reward points</Text>
                    <Text style={styles.rewardSubtitle}>
                      If you redeem {pointsToRedeem} points you can save{" "}
                      {discount} kr.
                    </Text>

                    <View style={styles.row}>
                      <Text style={styles.name}>Redeem points</Text>
                      <Switch
                        trackColor={{ false: "#666666", true: "#11804B" }}
                        thumbColor={discountApplied ? "#0CEF78" : "#939393"}
                        ios_backgroundColor="#11804B"
                        onValueChange={toggleDiscount}
                        value={discountApplied}
                      />
                    </View>
                    {discountApplied && (
                      <View>
                        <View style={styles.row}>
                          <Text style={[styles.name]}>Discount</Text>
                          <Text style={[styles.price]}>- {discount} kr.</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={[styles.name, styles.total]}>Total</Text>
                          <Text style={[styles.price, styles.totalValue]}>
                            {" "}
                            {totalAmount - discount} kr.
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
              <Text style={styles.title}>Payment Details</Text>
              <View style={styles.content}>
                <Input
                  containerStyle={styles.inputContainer}
                  disabledInputStyle={{ backgroundColor: "#ddd" }}
                  inputContainerStyle={styles.inputContainer}
                  label="Card Number"
                  labelStyle={styles.labelStyle}
                  labelProps={{}}
                  leftIcon={<Icon name="credit-card" size={20} />}
                  leftIconContainerStyle={styles.iconContainer}
                  rightIconContainerStyle={styles.iconContainer}
                  placeholder="Add card number"
                  onChangeText={(value) =>
                    setCardDetails((prevState) => ({
                      ...prevState,
                      cardNr: value,
                    }))
                  }
                  value={cardDetails?.cardNr}
                  keyboardType="numeric"
                />
                <Input
                  containerStyle={styles.inputContainer}
                  disabledInputStyle={{ backgroundColor: "#ddd" }}
                  inputContainerStyle={styles.inputContainer}
                  label="Card Holder Name"
                  labelStyle={styles.labelStyle}
                  labelProps={{}}
                  leftIcon={<Icon name="person" size={20} />}
                  leftIconContainerStyle={styles.iconContainer}
                  placeholder="Add card holder name"
                  onChangeText={(value) =>
                    setCardDetails((prevState) => ({
                      ...prevState,
                      cardName: value,
                    }))
                  }
                  value={cardDetails?.cardName}
                />
                <View style={styles.row}>
                  <Input
                    containerStyle={[styles.inputContainer, styles.divide]}
                    disabledInputStyle={{ backgroundColor: "#ddd" }}
                    inputContainerStyle={styles.inputContainer}
                    label="Expires on"
                    labelStyle={styles.labelStyle}
                    labelProps={{}}
                    leftIcon={<Icon name="calendar-today" size={20} />}
                    leftIconContainerStyle={styles.iconContainer}
                    onChangeText={(value) =>
                      setCardDetails((prevState) => ({
                        ...prevState,
                        expiration: value,
                      }))
                    }
                    value={cardDetails?.expiration}
                    keyboardType="numbers-and-punctuation"
                  />
                  <Input
                    containerStyle={[styles.inputContainer, styles.divide]}
                    disabledInputStyle={{ backgroundColor: "#ddd" }}
                    inputContainerStyle={styles.inputContainer}
                    label="cvv"
                    labelStyle={styles.labelStyle}
                    labelProps={{}}
                    leftIcon={<Icon name="key" size={20} />}
                    leftIconContainerStyle={styles.iconContainer}
                    onChangeText={(value) =>
                      setCardDetails((prevState) => ({
                        ...prevState,
                        cvv: value,
                      }))
                    }
                    value={cardDetails?.cvv}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Pay"
          size="lg"
          onPress={handlePayment}
          disabled={!isFormValid}
          disabledStyle={{ backgroundColor: "grey" }}
        />
      </View>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#0CEF78",
    fontWeight: "600",
    fontSize: 22,
    paddingVertical: 10,
    marginTop: 15,
  },
  content: {
    // flexDirection: "column",
    backgroundColor: "#303030",
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: 350,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    textAlign: "right",
    color: "#fff",
  },
  price: {
    textAlign: "left",
    color: "#fff",
    fontStyle: "italic",
  },
  rewardTitle: {
    color: "#0CEF78",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  rewardSubtitle: { color: "#fff", fontSize: 12, marginTop: 5 },
  subtotal: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  subtotalValue: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  total: { color: "#0CEF78", fontWeight: "bold", fontSize: 20 },
  totalValue: { color: "#0CEF78", fontWeight: "bold", fontSize: 20 },
  inputContainer: {},
  labelStyle: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginRight: 10,
  },
  divide: {
    flex: 1,
  },
  footer: { justifyContent: "flex-end", padding: 4 },
});
