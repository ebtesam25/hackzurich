import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import LeaderList from "../components/leaderList";
import Footer from "../components/footer";
import SegmentedControlTab from "react-native-segmented-control-tab";
let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Home extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    selectedIndex: 0,
    score: 20,
    trees: 2,

  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  componentDidMount() {
    this._loadFontsAsync();


  }

  getLoc(){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/autoplaygeneral', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"action": "location", "lat" : 2.2222, "lon": 45.225, "email":"e@mail.com"})
})
    .then((response) => response.json())
    .then((responseJson) => {
console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  
  getData() {
    return  [
    {
      
    name:"Raymond Holt",
    artist:"9000",
  },
  {
      
    name:"John Doe",
    artist:"9000",
  },
  {
      
    name:"Jane Doe",
    artist:"8000",
  },{
      
    name:"Jake Peralta",
    artist:"7000",
  },{
      
    name:"John Doe",
    artist:"6000",
  },
  ]
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
    
    
      <View style={styles.playing}>
          {this.state.playing &&
          <View>
            <Text style={{position:'relative',fontSize:20,marginTop:'20%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Currently not playing</Text>
            <Image source={require('../assets/404.png')} style={styles.middle}></Image>
          </View>
    }
    {!this.state.playing &&
          <View>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Your Score</Text>
            <Text style={{position:'relative',fontSize:50,marginTop:'5%',textAlign:'center', color:'#8ab661', fontFamily:'FuturaH'}}>{this.state.score}</Text>
            <Text style={{position:'relative',fontSize:15,marginTop:'5%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>You need to plant</Text>
            <Text style={{position:'relative',fontSize:40,marginTop:'4%',textAlign:'center', color:'#8ab661', fontFamily:'FuturaH', marginLeft:'5%'}}>x{this.state.trees}</Text>
            <Image source={require('../assets/tree.png')} style={styles.tree}></Image>
          </View>
    }
      </View>
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}}>Leaderboard</Text>
    
      <ScrollView style={styles.scrollcontainer}>
      <LeaderList itemList={this.getData()}/>
      </ScrollView>
    <View style={{position:'absolute', bottom:'5%', zIndex:5, width:'100%'}}><Footer></Footer></View> 
   

      
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
    backgroundColor:'#f5f5f5',
    marginTop:'10%'
  },
  scrollcontainer:{
    height:'75%',
    position:'relative',
  },
  left:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    left:'5%',
    position:'absolute',
  },
  right:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    right:'5%',
    position:'absolute'
  },
  middle:{
    height:'60%',
    width:'60%',
    marginTop:'5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
  },
  tree:{
    height:'20%',
    width:'20%',
    marginTop:'-15%',
    marginLeft:'30%',
    marginRight:'2%',
    resizeMode:'contain',
    zIndex:4,
   
  },
  album:{
    height:'40%',
    width:'50%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    borderRadius:10,
  },
  spotify:{
    height:'100%',
    width:'8%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    marginLeft:'2%',
  },
  playing:{
      width:'70%',
      height:'30%',
      elevation:1,
      backgroundColor:'#FFF',
      alignSelf:'center',
      marginTop:'15%',
      borderRadius:20
  },
  tabsContainerStyle:{
    width:'90%',
    alignSelf:'center',
  },
  tabStyle:{
    borderColor:'#95C623',
    color:'#95C623',
    backgroundColor:'transparent',
  },
  tabTextStyle:{
    color:'#95C623'
  },
  activeTabStyle:{
    backgroundColor:'#95C623',
  },
  activeTabTextStyle:{
    color:'#FFF'
  }
  
});