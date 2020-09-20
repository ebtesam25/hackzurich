import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './screens/splash';
import Login from './screens/login';
import Reg from './screens/reg';
import Home from './screens/home';
import Food from './screens/food';
import Trees from './screens/trees';
import HelloWorldSceneAR from './screens/artree';
import Planter from './screens/planter';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
       <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Reg" 
        component={Reg} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Food" 
        component={Food} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Trees" 
        component={Trees} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Art" 
        component={HelloWorldSceneAR} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Planter" 
        component={Planter} 
        options={{ headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}