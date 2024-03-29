import React, {Component} from "react";
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as sp from "../../shared/sp";

function post(url, parameters) {
    return new Promise((resolve, reject) => {
      var xhttp = new XMLHttpRequest();
      var queryString = Object.keys(parameters)
        .map((key) => key + "=" + parameters[key])
        .join("&");
  
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.responseText);
        }
      };
  
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(queryString);
    });
  }

export default class SN74HC08 extends Component{
    constructor(props){
        super(props);
        this.state={
            ProductName:"10PCS SN74HC08N DIP14 SN74HC08 DIP 74HC08N 74HC08 DIP-14 new and original IC",
            ActualPrice: 324,
            Price:"P 324",
        }
    }

    insertRecord = async() =>{
        var ProductName = this.state.ProductName;
        var ActualPrice = this.state.ActualPrice;
        var Price = this.state.Price;
    
        if (ProductName.length==0 || ActualPrice.length==0 || Price.length==0){
            alert("Error!");
        }
        else {
            var InsertAPI = "http://192.168.1.2/DataBoisAPI/carttodb.php";
            var Data ={
                ProductName: ProductName,
                ActualPrice: ActualPrice,
                Price: Price,
            }
            let Response = await post(InsertAPI, Data);
            alert("Added to Cart");
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground source={require("../../assets/Product/74HC08.png")} style={{height: 400, width: "100%"}}>
                        <View style={styles.barStyle}>
                            <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Home")}}>
                                <Image source={require("../../assets/arrow-back-white.png")} style={{height: 30, width: 30}}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={{height: 205, width:"100%",padding: 15,}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image source={require("../../assets/item-status.png")} style={{height:30,width:30}}/>
                            <Text style={styles.productHeadCount}>Available</Text>
                        </View>
                        <Text style={styles.productHead}>{this.state.ProductName}</Text>
                        <sp.SizedBox height={20}/>
                        <Text style={styles.productHeadCount}>The 74HC08 is identical in pinout to the LS08. The device inputs are compatible with Standard CMOS outputs; with pullup resistors, they are compatible with LSTTL outputs. Features. • Output Drive Capability: 10 LSTTL Loads. • Outputs Directly Interface to CMOS, NMOS and TTL.</Text>
                    </View>
                </ScrollView>
                <View style={{height: 50, width: "100%",justifyContent:"center", padding:30,}}>
                    <Text style={styles.productHead}>{this.state.Price}</Text>
                    <Text style={styles.productHeadCount}>Tax Rate 2% - P89.95 (P413.95)</Text>
                </View>
                <View style={{height: 50, width: "100%", alignItems:"center",justifyContent:"center", padding:30,}}>
                    <LinearGradient colors={["#C8A2C8", "#9e729e"]} style={styles.wishListBtn}>
                        <TouchableOpacity onPress={this.insertRecord} style={styles.wishListBtn}>
                            <Text style={{color: "white", letterSpacing: 1, fontWeight:"700"}}>ADD TO CART</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <sp.SizedBox height={10}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
    },
    barStyle: {
        alignItems:"center",
        justifyContent:"center",
        width: 50,
        height: 50,
        backgroundColor: "#C8A2C8",
        borderRadius: 5,
        padding: 16,
        marginLeft: 15,
        marginTop: 30,
        position:"absolute"
    
    },
    productHead:{
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    productHeadCount:{
        fontSize: 14,
        color: "black",
        fontWeight: "400",
        letterSpacing: 1,
        opacity: 0.8
    },
    productList:{
        fontSize: 10,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    wishListBtn: {
        width:"100%",
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        alignSelf:"center",

    },

});