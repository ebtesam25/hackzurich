import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';

let customFonts  = {
    'FuturaH': require('../assets/fonts/futurah.ttf'),
    'FuturaL': require('../assets/fonts/futural.ttf'),
  };

export default class Login extends React.Component  {
  state = {
    fontsLoaded: false,
  };

  getSongs(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/autoplaygeneral', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"action": "login", "email":"e@mail.com", "password" : "somepasswordhere"})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson.reviews);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>

      <Text style={{position:'relative',fontSize:60,marginTop:'20%', textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Login</Text>
     
      <TextInput placeholder='Email' style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'25%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      <TextInput placeholder='Password' secureTextEntry={true} style={{position:'relative',fontSize:20,margin:'auto', paddingLeft:'5%', color:'#798497', fontFamily:'FuturaL', marginTop:'5%', backgroundColor:'#EAEAEA',padding:'2.5%', width:'80%', borderRadius:5,alignSelf:'center'}}></TextInput>
      
   
      
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'15%', backgroundColor:'#95C623', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>this.props.navigation.navigate('Home')}>LOGIN</Text>
      <Text style={{position:'relative',fontSize:15,margin:'auto', textAlign:'center', color:'#2D3748', fontFamily:'FuturaL', marginTop:'5%',alignSelf:'center'}} onPress={()=>this.props.navigation.navigate('Reg')}>Don't have an account? Sign up</Text>
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