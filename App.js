import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";
import Headphone1 from "./Pages/ItemsPage/Headphone1"
import Headphone2 from "./Pages/ItemsPage/Headphone2"
import ArduinoUno from "./Pages/ItemsPage/ArduinoUno"
import ArduinoNano from "./Pages/ItemsPage/ArduinoNano"
import L298n from "./Pages/ItemsPage/L298n"
import SN74HC08 from "./Pages/ItemsPage/SN74HC08"
import Quantity from "./Pages/ItemsPage/Quantity"
import Earphone from "./Pages/ItemsPage/Earphone"
import Mouse from "./Pages/ItemsPage/Mouse"

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Headphone1"
          component={Headphone1}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Headphone2"
          component={Headphone2}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ArduinoUno"
          component={ArduinoUno}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ArduinoNano"
          component={ArduinoNano}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="L298n"
          component={L298n}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SN74HC08"
          component={SN74HC08}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Quantity"
          component={Quantity}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CheckOut"
          component={CheckOut}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Earphone"
          component={Earphone}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Mouse"
          component={Mouse}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
