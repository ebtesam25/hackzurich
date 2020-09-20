import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import MapView, { Marker } from 'react-native-maps'


import TreeList from "../components/treeList";
import Footer from "../components/footer";

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Trees extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    selectedIndex: 0,
    markers: [{"latlng":{
        "latitude": 25.76684817404011,
        "longitude": -80.19163068383932,
      }}],

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
      
    name:"John Doe",
    album:"https://pbs.twimg.com/media/EaCl5AtVcAA7R20.jpg", 
    artist:"Forestry Worker, CH",
  },
  {
    
    name:"HackZurich",
    album:"https://m.media-amazon.com/images/I/81CDLsfElHL._SS500_.jpg", 
    artist:"Agency, CH",
  },
  {
    
    name:"Jane Doe",
    album:"https://m.media-amazon.com/images/I/81mowVGtHdL._SS500_.jpg", 
    artist:"Farmer, CH",
  },
  {
    
    name:"TeamZero",
    album:"https://upload.wikimedia.org/wikipedia/en/1/14/Jax_Jones_-_Snacks_%28Supersize%29.png", 
    artist:"Agency, CH",
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
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Planted Trees</Text>
          
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.7664362,
          longitude: -80.1915964,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} 
        onLongPress={this.ShowHideComponent}
        onPress={(e) => this.setState({ markers: [{ latlng: e.nativeEvent.coordinate }] })}>
          {
              this.state.markers.map((marker, i) => (
                  <MapView.Marker key={i} coordinate={marker.latlng} >
                   {console.log(marker.latlng)}
                </MapView.Marker>
                
                  
              ))}
              
      </MapView>
    
     
            
          </View>
    }
      </View>
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}}>Plant a tree</Text>
    
      <ScrollView style={styles.scrollcontainer}>
      <TreeList itemList={this.getData()}/>
      </ScrollView>
    <View style={{position:'absolute', bottom:'2%', zIndex:5, width:'100%'}}><Footer></Footer></View> 
   

      
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
    marginTop:'5%'
  },
  scrollcontainer:{
    marginBottom:'17%'
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
  map:{
      position:'relative',
      height:'80%',
      width:'90%',
      alignSelf:'center',

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
      height:'40%',
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