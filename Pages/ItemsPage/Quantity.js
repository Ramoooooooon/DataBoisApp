import React, {Component} from "react";
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import * as sp from "../../shared/sp";

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

export default class Quantity extends Component{
    constructor(props){
        super(props);
        this.state={
            Amount: 1,
            AmountP: [{"ActualPrice":1}],
            AmountPosa: [{"ActualPotek":5}],
            Count: 0,
            info:[],
            ProductName: [],
            Price:[],
            ActualPrice:[],
            
            
        }

    }
    
    increment = async() =>{
        var increment = this.state.Amount;
        var Amount = increment + 1;
        this.setState({Amount});
    }
    decrement = async() =>{
        var decrement = this.state.Amount;
        var Amount = decrement - 1;
        this.setState({Amount});
    }
    
    increments = async() =>{
        
        var bullshit = this.state.AmountP.map((something)=>{
            let item = something.ActualPrice;
            var Count = item + 1;
            this.setState({Count});
            console.log(Count);
            var AmountP = [{"ActualPrice": Count}];
            this.setState({AmountP});
            console.log(something);
        });  
    }
    decrements = async() =>{
        var bullshit = this.state.AmountP.map((something)=>{
            let item = something.ActualPrice;
            var Count = item - 1;
            this.setState({Count});
            console.log(Count);
            var AmountP = [{"ActualPrice": Count}];
            this.setState({AmountP});
            console.log(something);
        });
        
    }
    componentDidMount = async()=>{
        this.props.navigation.addListener("focus", async()=>{
        let url="http://192.168.1.2/DataBoisAPI/displaydata.php";
        let response=await get (url,{});
        let decoded_object= JSON.parse(response);
        this.setState({
          info: decoded_object
        });

        var spread = this.state.info.map((something)=>{
            let ProductName = something.ProductName;
            let Price = something.Price;
            let ActualPrice = something.ActualPrice;
            this.setState({ProductName});
            this.setState({Price});
            this.setState({ActualPrice});
            console.log(this.state.Price);
            });
        });
      }

      insertRecord = async() =>{
        var ProductName = this.state.ProductName;
        var Price = this.state.Price;
        var ActualPrice = this.state.ActualPrice;
        if (ProductName.length==0 || Price.length==0 || ActualPrice.length==0){
            alert("Required Field is Missing!");
        }
        else {
            var InsertAPI = "http://192.168.1.2/DataBoisAPI/carttodb.php";
            var Data ={
                ProductName: ProductName,
                Price: Price,
                ActualPrice: ActualPrice,
            }
            let response = await post(InsertAPI, Data);
            alert("Registered Successfully");
        }
    }
    

    render(){
        
        let display = this.state.AmountP.map((db_info)=>{
            
            return <Item content ={db_info} that={this.decrements} then={this.increments} umay={this.state.Count}/>
            
            
          })
        return(
            <View style={styles.container}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <TouchableOpacity onPress={this.decrement}>
                        <Image source={require("../../assets/minus.png")} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>
                    <sp.SizedBox width={20}/>
                    <Text>{this.state.Amount}</Text>
                    <sp.SizedBox width={20}/>
                    <TouchableOpacity onPress={this.increment}>
                        <Image source={require("../../assets/plus.png")} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>
                </View>
                <sp.SizedBox height={50}/>
                <Text>{display}</Text>
                <sp.SizedBox height={50}/>
                <View style={{height: 50, width: "100%", alignItems:"center",justifyContent:"center", padding:30,}}>
                    <LinearGradient colors={["#C8A2C8", "#9e729e"]} style={styles.wishListBtn}>
                        <TouchableOpacity onPress={this.insertRecord} style={styles.wishListBtn}>
                            <Text style={{color: "white", letterSpacing: 1, fontWeight:"700"}}>ADD TO CART</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}

const Item = (props)=> {
    let content=props.content;
    let ActualPrice=content.ActualPrice;
    
    let umay=props.umay;
    let something = umay;
    
    
   
    return(
        <View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={props.that}>
                        <Image source={require("../../assets/minus.png")} style={{height: 30, width: 30}}/>
                </TouchableOpacity>
                    <sp.SizedBox width={20}/>
                    <Text>{ActualPrice}</Text>
                    
                    <sp.SizedBox width={20}/>
                <TouchableOpacity onPress={props.then}>
                        <Image source={require("../../assets/plus.png")} style={{height: 30, width: 30}}/>
                </TouchableOpacity>
        </View>
        <Text>{something}</Text>
        </View>
        
    )
  }
  

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
        alignItems:"center",
        justifyContent:"center"
    },
    barStyle: {
        alignItems:"center",
        justifyContent:"center",
        width: 50,
        height: 50,
        backgroundColor: "white",
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