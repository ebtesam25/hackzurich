import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';

let customFonts  = {
    'FuturaH': require('../assets/fonts/futurah.ttf'),
    'FuturaL': require('../assets/fonts/futural.ttf'),
  };

export default class Reg extends React.Component  {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    
  }

  registerUser(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/autoplaygeneral', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"action": "register", "lat" : 2.2222, "lon": 45.225, "email":"e@mail.com", "password" : "somepasswordhere", "spotify": "2222222"})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
     
      <Text style={{position:'relative',fontSize:60,marginTop:'20%', textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Sign Up</Text>
     
      <TextInput placeholder='Spotify User ID' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'30%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      <TextInput placeholder='Email' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      <TextInput placeholder='Password' secureTextEntry={true} style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      
   
      
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'15%', backgroundColor:'#95C623', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>{this.registerUser();this.props.navigation.navigate('Login');}}>REGISTER</Text>
      <Text style={{position:'relative',fontSize:15,margin:'auto', textAlign:'center', color:'#2D3748', fontFamily:'FuturaL', marginTop:'5%',alignSelf:'center'}} onPress={()=>this.props.navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
    );
    }
    else {
    return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
    
  },
  header:{
    height:'30%',
    width:'70%',
    marginTop:'20%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  
});