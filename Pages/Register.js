import React, {Component} from "react";
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from "react-native";
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

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            FullName:"",
            Username:"",
            ContactNumber:"",
            Address:"",
            Email:"",
            Password:"",
            CardNumber:"",
            CVV:"",
            ExpirationDate:"",
            GCash:"",
        }
    }

    insertRecord = async() =>{
        var FullName = this.state.FullName;
        var Username = this.state.Username;
        var ContactNumber = this.state.ContactNumber;
        var Address = this.state.Address;
        var Email = this.state.Email;
        var Password = this.state.Password;
        var CardNumber = this.state.CardNumber;
        var CVV = this.state.CVV;
        var ExpirationDate = this.state.ExpirationDate;
        var GCash = this.state.GCash;
        if (FullName.length==0 || Username.length==0 || ContactNumber.length==0 || Address.length==0 || Email.length==0 ||
            Password.length==0 || CardNumber.length==0 || CVV.length==0 || ExpirationDate.length==0 || GCash.length==0){
            alert("Required Field is Missing!");
        }
        else {
            var InsertAPI = "http://192.168.1.2/DataBoisAPI/registertodatadb.php";
            var Data ={
                FullName: FullName,
                Username: Username,
                ContactNumber: ContactNumber,
                Address: Address,
                Email: Email,
                Password: Password,
                CardNumber: CardNumber,
                CVV: CVV,
                ExpirationDate: ExpirationDate,
                GCash: GCash,
            }
            let Response = await post(InsertAPI, Data);
            alert("Registered Successfully");
            this.props.navigation.navigate("Login");
        }
    }



    render(){
        return(
            <ImageBackground source={require("../assets/splash1.png")}>
                <sp.SizedBox height={40}/>

                <View style={styles.barStyle}>
                            <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Login")}}>
                                <Image source={require("../assets/arrow-back-white.png")} style={{height: 30, width: 30}}/>
                            </TouchableOpacity>
                </View>

                <View style={styles.container}>
                <View style={{width:"100%",padding:30,justifyContent:"center",alignItems:"center"}}>
                    <View style={{backgroundColor:"white",alignItems:"center",justifyContent:"center", borderRadius:10,width:"100%",padding:30, height: 600}}>
                        <ScrollView>
                        <Text style={{color:"#525252",fontSize:20,fontWeight:"700", alignSelf:"center"}}>Sign Up</Text>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"center"}}>It's quick and easy</Text>
                        <sp.SizedBox height={30}/>
                        <Text style={{color:"#525252",fontSize:20,fontWeight:"700", alignSelf:"flex-start"}}>Personal Details</Text>
                        <View style={{borderWidth: 1, width:"100%", height: 5, backgroundColor:"black"}}></View>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>FullName</Text>
                        <TextInput onChangeText={(FullName)=>{this.setState({FullName})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"ex. Juan D. Piece"}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Username</Text>
                        <TextInput onChangeText={(Username)=>{this.setState({Username})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"ex. Juan23"}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Contact Number</Text>
                        <TextInput onChangeText={(ContactNumber)=>{this.setState({ContactNumber})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"ex. 09123456789"}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Address</Text>
                        <TextInput onChangeText={(Address)=>{this.setState({Address})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"Lot No., Barangay, City, Province"}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Email</Text>
                        <TextInput onChangeText={(Email)=>{this.setState({Email})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"ex. juan.23@hotmail.com"}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Password</Text>
                        <TextInput secureTextEntry={true} onChangeText={(Password)=>{this.setState({Password})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"Password.."}/>
                        <sp.SizedBox height={20}/>
                        <Text style={{color:"#525252",fontSize:20,fontWeight:"700", alignSelf:"flex-start"}}>Bank Details</Text>
                        <View style={{borderWidth: 1, width:"100%", height: 5, backgroundColor:"black"}}></View>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Card Number</Text>
                        <TextInput onChangeText={(CardNumber)=>{this.setState({CardNumber})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={""}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>CVV</Text>
                        <TextInput onChangeText={(CVV)=>{this.setState({CVV})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={""}/>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Expiration Date</Text>
                        <TextInput onChangeText={(ExpirationDate)=>{this.setState({ExpirationDate})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={""}/>
                        <sp.SizedBox height={20}/>
                        <Text style={{color:"#525252",fontSize:20,fontWeight:"700", alignSelf:"flex-start"}}>GCash</Text>
                        <View style={{borderWidth: 1, width:"100%", height: 5, backgroundColor:"black"}}></View>
                        <sp.SizedBox height={10}/>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700", alignSelf:"flex-start"}}>Gcash Number</Text>
                        <TextInput onChangeText={(GCash)=>{this.setState({GCash})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={""}/>
                        <sp.SizedBox height={30}/>
                        <LinearGradient colors={["#9B59B6", "#3498DB"]} style={styles.scanButton}>
                            <TouchableOpacity onPress={this.insertRecord} style={styles.scanButton}>
                                <Text style={{fontSize:16, fontWeight:"700", color:"white"}}>Sign Up</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        </ScrollView>
                    </View>
                </View>
                </View>

                <sp.SizedBox height={80}/>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
    },
    scanButton: {
        height: 50,
        width:"80%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 10,
        alignSelf:"center"
    },
    box: {
        height: 100,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },

    barStyle: {
      alignItems:"center",
      justifyContent:"center",
      width: 50,
      height: 50,
      backgroundColor: "#C8A2C8",
      borderRadius: 5,
      padding: 5,
      marginLeft: 15,
  },

});