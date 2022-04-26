import React, {Component} from "react";
import {View, 
        Text, 
        ImageBackground, 
        Image, 
        StyleSheet, 
        TouchableOpacity, 
        TextInput, 
        ScrollView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as sp from "../shared/sp";

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
  function get(url, parameters) {
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
  
      xhttp.open("GET", url + "?" + queryString, true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send(queryString);
    });
  }

export default class Cart extends Component{
    constructor(props){
        super(props);
            this.state={
                info:[],
                checkoutData:[],
               /* AmountP: [{"ActualP":1}],*/
                Count: 1,
                ProductName: "",
                ActualPrice: "",
                Price: "",
                Quantity: 1,
            }
    }

    deletedata = async() =>{
        
        let url = "http://192.168.1.2/DataBoisAPI/resetdatadb.php";
        let response=await post (url,{});
        alert("Data has been reset");
    }

    increments = async() =>{
        
        var Plus = this.state.Count;
        var Kyle = Plus + 1;
        var Count = Kyle;
        this.setState({Count});
        

    }
    decrements = async() =>{
        var Minus = this.state.Count;
        if (Minus > 0){
            var res = Minus - 1;
        }else if (Minus == 0) {
            var res = Minus;
        }
        var Count = res;
        this.setState({Count});
      /*  var Minus = this.state.info.map((something)=>{
            let item = something.Quantity;
            var Count = item - 1;
            this.setState({Count});
            var info = [{"Quantity": Count}];
            this.setState({info});
            console.log(something);
        });*/ 

    }

    try = async() => {
        console.log(this.state.Count);
        /*
        var test = this.state.info.map((something)=>{
            let item = something.Quantity;
            console.log(item);
        })
        */ 

    }
    
    componentDidMount = async()=>{
        this.refresh=this.props.navigation.addListener("focus", async()=>{
        let url="http://192.168.1.2/DataBoisAPI/displaydata.php";
        let response=await get (url,{});
        let decoded_object= JSON.parse(response);
        this.setState({
          info:decoded_object
        });

        var test = this.state.info.map((something)=>{
            let ProductName = something.ProductName;
            let ActualPrice = something.ActualPrice;
            let Price = something.Price;
            let Quantity = something.Quantity;

            this.setState({ProductName});
            this.setState({ActualPrice});
            this.setState({Price});
            this.setState({Quantity});
        })

    });
      }

    componentWillUnmount = async() =>{
        this.refresh();
    }

    checkOut = async() =>{
        await AsyncStorage.setItem("ProductName", this.state.ProductName);
        await AsyncStorage.setItem("ActualPrice", this.state.ActualPrice);
        await AsyncStorage.setItem("Price", this.state.Price);
        await AsyncStorage.setItem("Count", this.state.Count);
        this.props.navigation.navigate("CheckOut");
    }

     
    render(){

        let display = this.state.info.map((db_info)=>{
            return <Item content={db_info} that={this.decrements} then={this.increments} those={this.state.Count} />
        })

        return(
            <View style={styles.container}>
                
                    <View style={styles.barStyle}>
                    
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Home")}} style={{height: 30, width: 30,}}>
                            <Image source={require("../assets/arrow-back-white.png")} style={{height: 30, width: 30,}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.deletedata} style={{height: 30, width: 30,}}>
                            <Image source={require("../assets/trash.png")} style={{height: 30, width: 30,}}/>
                        </TouchableOpacity>
                    
                    </View>

                    <View style={styles.header}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black"}}>
                                    My Cart
                                </Text>
                                <sp.SizedBox height={20}/>
                                <View style={{height:520}}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {display}
                                    </ScrollView>
                                </View>
                        </View>                    
                        <View style={{height: 50, position: "absolute", bottom: 0, width: "100%", alignItems:"center", justifyContent:"center", padding:30, marginBottom: 20}}>
                            <LinearGradient colors={["#C8A2C8", "#9e729e"]} style={styles.wishListBtn}>
                                <TouchableOpacity onPress={this.checkOut} style={styles.wishListBtn}>
                                    <Text style={{color: "white", letterSpacing: 1, fontWeight:"700"}}>CHECKOUT</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>

            </View>
            
        );
    }
}

const Item = (props)=>{
    let content = props.content;
    let ProductName = content.ProductName;
    let ActualPrice = content.ActualPrice;
    let Price = content.Price;

    let those = props.those;
    let Count = those;
    
    return(
        <View style={{ padding: 20 , borderWidth: 1, borderRadius: 10, marginBottom: 20, backgroundColor:"white"}}>
            <Text style={styles.productHead}>{ProductName}</Text>
            <Text style={styles.productHeadCount}>{Price}</Text>
            <Text style={{ color: "white", fontSize: 5 }}>{ActualPrice}</Text>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={props.that}>
                        <Image source={require("../assets/minus.png")} style={{height: 30, width: 30}}/>
                </TouchableOpacity>
                    <sp.SizedBox width={20}/>
                    <Text>{Count}</Text>
                    
                    <sp.SizedBox width={20}/>
                <TouchableOpacity onPress={props.then}>
                        <Image source={require("../assets/plus.png")} style={{height: 30, width: 30}}/>
                </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ebebeb",
    },
    barStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-between",
        backgroundColor: "#C8A2C8",
        padding: 16,
    },
    productHead:{
        fontSize: 18,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    productHeadCount:{
        fontSize: 16,
        color: "#1c1c1c",
        fontWeight: "400",
        marginLeft: 10
    },
    productList:{
        fontSize: 10,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    header:{
        padding: 10,
        height: 50,
        
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