import React, {Component} from "react";
import {View, 
        Text, 
        ImageBackground, 
        Image, 
        StyleSheet, 
        TouchableOpacity, 
        TextInput, 
        ScrollView,
        Picker} from "react-native";
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
                userData:[],
                checkoutData:[],
                FullName:"",
                Username:"",
                Address:"",
                ContactNumber:"",
                ProductName:"",
                ActualPrice:0,
                Price:"",
                Count:"",
                TotalPrice:1,
                Discount:"UNO-GRADE",
                vouchCODE:"DB-42069",
                Voucher:"",
                ModePayment:"",
            }
    }

    init=async()=>{
        try {
          this.setState({
            userData: JSON.parse(await AsyncStorage.getItem("userData")),
          },()=>{
            this.setState({FullName:this.state.userData.FullName,Address:this.state.userData.Address,ContactNumber:this.state.userData.ContactNumber,Username:this.state.userData.Username})
          });
          this.setState({ProductName: await AsyncStorage.getItem("ProductName")});
          this.setState({ActualPrice: await AsyncStorage.getItem("ActualPrice")});
          this.setState({Price: await AsyncStorage.getItem("Price")});
          this.setState({Count: await AsyncStorage.getItem("Count")});
          var something = this.state.ActualPrice;
          var denum = this.state.Count;
          var result = denum * something;
          this.setState({TotalPrice:result});
          console.log(this.state.Username);
          /*
          this.setState({
            checkoutData: JSON.parse(await AsyncStorage.getItem("checkoutData")),
          },()=>{
            this.setState({ProductName:this.state.checkoutData.ProductName,Price:this.state.checkoutData.Price,ActualPrice:this.state.checkoutData.ActualPrice})
          });*/

          console.log(this.state.userData.FullName);
          
        } catch (e) {
          console.log(e)
        }
      }
      componentDidMount=async()=>{
        this.subscribe=this.props.navigation.addListener("focus", ()=>{
          this.init()
        })
        
      }
      componentWillUnmount=()=>{
        this.subscribe();
      }
    try = async ()=>{
        var Voucher = this.state.Voucher;
        var vouchCODE = this.state.vouchCODE;
        var Discount = this.state.Discount;
          if (Voucher==Discount){
              let something = this.state.TotalPrice;
              let result = something * 0.5;
              this.setState({TotalPrice:result});
          }
          else if (Voucher==vouchCODE){
            let something = this.state.TotalPrice;
            let result = something * 0.90;
            this.setState({TotalPrice:result});
              
          }
    }

    submit = async()=>{
        var Username = this.state.Username;
        var Product = this.state.ProductName;
        var TotalPrice = this.state.TotalPrice;
        var ModePayment = this.state.ModePayment;
        if (Username.length==0 || Product.length==0 || TotalPrice.length==0 || ModePayment.length==0){
            alert("Error: 420 blaze it!");
        }
        else {
            var InsertAPI = "http://192.168.1.2/DataBoisAPI/placeorderdb.php";
            var Data ={
                Username: Username,
                Product: Product,
                TotalPrice: TotalPrice,
                ModePayment: ModePayment,
            }
            let Response = await post(InsertAPI, Data);
            alert("Your order was placed successfully.");
            this.props.navigation.navigate("Home");
        }
    }


    render(){

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Home")}}>
                    <View style={{ height: 100, width: "100%", flexDirection:'row', alignItems: 'center' }}>
                        <Image source={require("../assets/logo_1.png")} style={{height:50, width:90}} />
                        <Image source={require("../assets/Name.png")} style={{height:50, width: 100}} />
                    </View>
                </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Cart")}} style={{height: 30, width: 70,justifyContent:"center", alignItems:"center",}}>
                        <Text style={styles.headCancel}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 500, padding:20,}}>
                    
                    <View style={{backgroundColor:"white",borderWidth: 1, height:100, paddingLeft: 20, paddingRight:20, justifyContent:"center", borderRadius:10}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image source={require("../assets/location-icon.png")} style={{height:15, width:15}}/>
                            <sp.SizedBox width={5}/>
                            <Text style={{letterSpacing:1, color:"#59007f", fontSize: 14}}>Delivery Address</Text>
                        </View>
                        
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={styles.nameStyle}>{this.state.FullName}</Text>
                            <Text style={styles.addressStyle}>{this.state.Address}</Text>
                        </View>
                        <Text style={styles.contactStyle}>{this.state.ContactNumber}</Text>
                    </View>
                    <sp.SizedBox height={10}/>
                    <View style={{flex:1, borderWidth:1,padding:20, backgroundColor:"white"}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <Text style={{fontSize: 14,color: "black",fontWeight: "500",letterSpacing: 1,fontWeight:"bold"}}>Product</Text>
                                <Text style={{fontSize: 14,color: "black",fontWeight: "500",letterSpacing: 1,fontWeight:"bold"}}>Quantity</Text>
                            </View>
                            <sp.SizedBox height={20}/>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <Text style={{width:"60%",fontSize: 14,color: "black",fontWeight: "500",letterSpacing: 1,}}>{this.state.ProductName}</Text>
                                <Text>x{this.state.Count}</Text>
                            </View>
                            <sp.SizedBox height={100}/>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <Image source={require("../assets/voucher-icon.png")} style={{height:20, width:20}}/>
                                <sp.SizedBox width={10}/>
                                <Text style={{letterSpacing:1, color:"#59007f", fontSize: 14}}>Voucher</Text>
                                <sp.SizedBox width={10}/>
                                <TextInput onChangeText={(Voucher)=>{this.setState({Voucher})}} style={{borderWidth:1, width:"100%", fontSize:10,padding:10,borderRadius:10}}/>
                                <TouchableOpacity style={{position:"absolute", right:0, paddingRight:10}} onPress={this.try}>
                                    <Image source={require("../assets/verify-icon.png")} style={{height:20, width:20}}/>
                                </TouchableOpacity>
                            </View>
                            <sp.SizedBox height={30}/>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <Text style={{letterSpacing:1, color:"#59007f", fontSize: 14, fontWeight:"bold"}}>Payment Option:</Text>
                                <View>
                                    <Picker style={{ height: 30, width: 200 }} onValueChange={(ModePayment)=>{this.setState({ModePayment})}} selectedValue={this.state.ModePayment}>
                                        <Picker.Item label="-Select Payment Method-" value="-Select Payment Method-" />
                                        <Picker.Item label="CARD" value="CARD" />
                                        <Picker.Item label="GCASH" value="GCASH" />
                                        <Picker.Item label="COD" value="COD" />
                                    </Picker>
                                </View>
                            </View>

                        </ScrollView>

                    </View>
                </View>
                <Text style={{color:"black", fontSize:18, fontWeight:"bold", letterSpacing:1, paddingLeft:20}}>Total: ₱ {this.state.TotalPrice}</Text>
                <View style={styles.btn}>
                            <LinearGradient colors={["#C8A2C8", "#9e729e"]} style={styles.checkOutBtn}>
                                <TouchableOpacity onPress={this.submit} style={styles.checkOutBtn}>
                                    <Text style={{color: "white", letterSpacing: 1, fontWeight:"700"}}>PLACE ORDER</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                </View>

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ebebeb",
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#C8A2C8",
        alignItems:"center",
        
    },
    headCancel:{
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    checkOutBtn: {
        width:"100%",
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        alignSelf:"center",
    },
    btn: {
        height: 50, 
        position: "absolute", 
        bottom: 0, 
        width: "100%",
        alignItems:"center", 
        justifyContent:"center",  
        marginBottom: 20, 
        paddingLeft: 30,
        paddingRight:30,
    },
    nameStyle:{
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    contactStyle:{
        fontSize: 14,
        color: "black",
        fontWeight: "500",
        letterSpacing: 1,
    },
    addressStyle:{
        fontSize: 15,
        color: "#1c1c1c",
        fontWeight: "400",
    },
    
});