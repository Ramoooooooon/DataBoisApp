import React, {Component} from "react";
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as sp from "../shared/sp";

export default class Home extends Component{
    constructor(props){
        super(props);
       
    }

    render(){
        return(
    <View style={styles.barStyle}>
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome to</Text>
                    <Text style={{ fontSize: 35, fontWeight: "bold", color: "#C8A2C8" }}>
                        DataBois
                    </Text>
                </View>

            <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Cart")}} style={{height: 30, width: 30,}}>
                <Image source={require("../assets/shopping-cart.png")} style={{height: 30, width: 30,}}/>
            </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30, flexDirection: "row" }}>
                <View style={styles.searchContainer}>
                    <Image source={require("../assets/search-icon.png")} style={{ marginLeft: 15, height: 30, width: 30, position: "absolute" }} />
                    <TextInput placeholder="Search" style={styles.input} />
                </View>
                <TouchableOpacity>
                    <View style={styles.sortBtn}>
                        <Image source={require("../assets/sort-btn.png")} style={{ height: 30, width: 30}} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            
            <sp.SizedBox height={16} />
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={styles.productHead}>Products</Text>
                            <Text style={styles.productHeadCount}>41</Text>
                        </View>
                        <Text style={{fontSize:14, color: "#1688a6", fontWeight: "400"}}>SeeAll</Text>
                    </View>

                    <sp.SizedBox height={16} />
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Headphone1")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/Headphone1.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>WH-XB900N Wireless Noise Canceling Headphones</Text>
                            <Text style={styles.productHeadCount}>₱ 7,499</Text>
                        </TouchableOpacity>
                        <sp.SizedBox width={10}/>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Headphone2")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/Headphone2.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>Cat Ear Headphones VZV23/ VIV23M Wireless Headphone</Text>
                            <Text style={styles.productHeadCount}>₱ 699</Text>
                        </TouchableOpacity>
                    </View>
                    <sp.SizedBox height={20}/>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Earphone")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/Earphone.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>Nokia Essential True Wireless Earphones E3500|Headphones|</Text>
                            <Text style={styles.productHeadCount}>₱ 1,999</Text>
                        </TouchableOpacity>
                        <sp.SizedBox width={10}/>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Mouse")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/Mouse.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>G604 LIGHTSPEED WIRELESS GAMING MOUSE</Text>
                            <Text style={styles.productHeadCount}>₱ 4999</Text>
                        </TouchableOpacity>
                    </View>

                    <sp.SizedBox height={16} />
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={styles.productHead}>Hardware</Text>
                            <Text style={styles.productHeadCount}>20</Text>
                        </View>
                        <Text style={{fontSize:14, color: "#1688a6", fontWeight: "400"}}>SeeAll</Text>
                    </View>

                    <sp.SizedBox height={16} />
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("ArduinoUno")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/Arduino.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>Arduino UNO r3</Text>
                            <Text style={styles.productHeadCount}>₱ 500</Text>
                        </TouchableOpacity>
                        <sp.SizedBox width={10}/>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("ArduinoNano")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/ArduinoNano.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>Arduino Nano Atmega320 Soldered</Text>
                            <Text style={styles.productHeadCount}>₱ 280</Text>
                        </TouchableOpacity>
                    </View>

                    <sp.SizedBox height={16} />
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("L298n")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/DriverMotor.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>L298n Motor Driver</Text>
                            <Text style={styles.productHeadCount}>₱ 80</Text>
                        </TouchableOpacity>
                        <sp.SizedBox width={10}/>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("SN74HC08")}} style={{height: 180, width: 185,}}>
                            <Image source={require("../assets/Product/74HC08.png")} style={{height: 130,width:"100%",borderRadius: 5}}/>
                            <Text style={styles.productList}>10PCS SN74HC08N DIP14 SN74HC08</Text>
                            <Text style={styles.productHeadCount}>₱ 155</Text>
                        </TouchableOpacity>
                    </View>

        </ScrollView>
    </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      container:{
        flex: 1,
        backgroundColor: "white",
    },
    barStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-between",
        padding: 16,
    },
    productHead:{
        fontSize: 18,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    productHeadCount:{
        fontSize: 14,
        color: "black",
        fontWeight: "400",
        opacity: 0.5,
        marginLeft: 10
    },
    productList:{
        fontSize: 10,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    searchContainer: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      input: {
        fontSize: 18,
        borderWidth: 1,
        padding: 10,
        width: "100%",
        borderRadius: 10,
        paddingLeft: 55,
      },
      sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        backgroundColor: "#C8A2C8",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      },
});