import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Splash extends React.Component  {
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

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Image source={require('../assets/welcome.png')} style={styles.header}></Image>
      <Text style={{position:'relative',fontSize:30,marginTop:'20%', textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Welcome to Carbocount</Text>
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#95C623', fontFamily:'FuturaL', marginTop:'2.5%', width:'80%',alignSelf:'center'}}>Sustainable dishes for sustainable Living </Text>
      
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#FFF', fontFamily:'FuturaH', marginTop:'25%', backgroundColor:'#95C623', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>this.props.navigation.navigate('Login')}>LOGIN</Text>
      <Text style={{position:'relative',fontSize:20,margin:'auto', textAlign:'center', color:'#364f6b', fontFamily:'FuturaH', marginTop:'5%', backgroundColor:'#fff', padding:'5%', width:'70%', borderRadius:10, alignSelf:'center', elevation:1}} onPress={()=>this.props.navigation.navigate('Reg')}>REGISTER</Text>
      
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
    backgroundColor:'#f5f5f5'
  },
  header:{
    height:'30%',
    width:'70%',
    marginTop:'20%',
    resizeMode:'contain',
    alignSelf:'center'
  },
  
});