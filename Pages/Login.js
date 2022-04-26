import React, {Component} from "react";
import {View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as sp from "../shared/sp";
import { setStatusBarHidden } from "expo-status-bar";

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

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            Username:"",
            Password:"",
            userData: [],
        }
    }
    saveData= async ()=>{
    
      await AsyncStorage.setItem("userData", JSON.stringify(this.state.userData));
      this.props.navigation.navigate("Home");
  }

    login = async () => {
        let Username = this.state.Username;
        let Password = this.state.Password;
        if (Username.length == 0 || Password.length == 0) {
          alert("required field missing");
        } else {
          var url = "http://192.168.1.2/DataBoisAPI/logintodatadb.php";
          let data = {
            Username: Username,
            Password: Password,
          };
    
          let response = await post(url, data);
          let result = JSON.parse(response);
    
          if (result.confirm == "Success") {
            this.setState({userData:result});
            console.log(this.state.userData);
            this.saveData();
          } else if (result.confirm == "Unsuccessful") {
            alert("The data you entered is incorrect. Please try again.");
          }
        }
      };

    render(){
        return(
            <ImageBackground source={require("../assets/splash1.png")} style={styles.container}>
                <sp.SizedBox height={80}/>
                <View style={{ height: 100, width: "100%", flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../assets/logo_1.png")} style={{height:50, width:90}} />
                <Image source={require("../assets/Name.png")} style={{height:50, width: 100}} />
                </View>
                <sp.SizedBox height={100}/>
                <View style={{width:"100%",padding:30,justifyContent:"center",alignItems:"center"}}>
                    <View style={{backgroundColor:"white",alignItems:"center",justifyContent:"center", borderRadius:10,alignSelf:"stretch",width:"100%",padding:30,}}>
                        <Text style={{color:"#525252",fontSize:20,fontWeight:"700"}}>Login</Text>
                        <Text style={{color:"#525252",fontSize:16,fontWeight:"700"}}>Enter Username & password</Text>
                        <sp.SizedBox height={30}/>
                        <TextInput onChangeText={(Username)=>{this.setState({Username})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"Username.."}/>
                        <sp.SizedBox height={10}/>
                        <TextInput secureTextEntry={true} onChangeText={(Password)=>{this.setState({Password})}} style={{borderWidth:1, width:"100%", fontSize:20,padding:10,borderRadius:10}} placeholder={"Password.."}/>
                        <sp.SizedBox height={30}/>
                        <LinearGradient colors={["#9B59B6", "#3498DB"]} style={styles.scanButton}>
                            <TouchableOpacity onPress={()=> {this.login()}} style={styles.scanButton}>
                                <Text style={{fontSize:16, fontWeight:"700", color:"white"}}>Login</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <sp.SizedBox height={10}/>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate("Register")}}>
                            <Text style={{color:"#525252",fontSize:16,fontWeight:"700"}}>Create a New Account</Text>
                        </TouchableOpacity>

                    </View>
                
                </View>
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
    },

});