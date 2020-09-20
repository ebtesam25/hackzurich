import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { RNS3 } from 'react-native-upload-aws-s3';

import SongList from "../components/songList";
import RestaurantList from "../components/restraurantList";
import Footer from "../components/footer";
import SegmentedControlTab from "react-native-segmented-control-tab";
let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};
var imgdata=null;
var url=null;
var cUrl=null;
//var base64Img =null;

export default class Food extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    selectedIndex: 0,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    ref: null,
    res:'',
    recommendations:false,
    restaurant:"Checkin at an eco-friendly restaurant to earn points",
    rest:true,
    cart: false,
    score:20,

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

  async componentDidMount() {
    this._loadFontsAsync();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

  }
  async uploadToS3(){
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: url,
      name: "image.jpg",
      type: "image/jpg"
    }
   
    const options = {
      bucket: "carbocount-images",
      region: "us-east-1",
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY,
      successActionStatus: 201
    }
   
    try{
      const response = await RNS3.put(file, options)
      if (response.status === 201){
        console.log("Success: ", response.body)
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      } else {
        console.log("Failed to upload image to S3: ", response)
      }
    } catch(error){
      console.log(error)
    }
  }

  
  getData() {
    return  [
    {
      
    name:"Tofu",
   
    artist:"-20% carbon emission",
  },
  {
    
    name:"Apple",
    
    artist:"-20% carbon emission",
  },
  
  ]
  }

  render(){

    const { hasCameraPermission } = this.state;
    const {ref} = this.state;
    let { image } = this.state;
    const takePicture = async () => {
   
            const options = {quality: 1, base64: true};
            imgdata = await this.camera.takePictureAsync(options);
            url=imgdata.uri;
            console.log('Image Captured');
            this.uploadToS3();
            
            let base64Img = `data:image/jpg;base64,${imgdata.base64}`
      
            
            let cloudinary = 'https://api.cloudinary.com/v1_1/diywehkap/image/upload';
        
            let data = {
              "file": base64Img,
              "upload_preset": "hm4fkyir",
            }
            fetch(cloudinary, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              cUrl=data.secure_url;
              this.setState({recommendations:true});
              if(this.state.selectedIndex==1){
                  this.setState({cart:true});
              }
              console.log(cUrl);
              return cUrl
          }).catch(err=>console.log(err))

        }
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
     <SegmentedControlTab
          values={["Item", "Cart", "Restaurant"]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          
        />
    
      <View style={styles.playing}>
          {this.state.hasCameraPermission==null &&
          <View>
            <Text style={{position:'relative',fontSize:20,marginTop:'20%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Need access to camera :(</Text>
            <Image source={require('../assets/404.png')} style={styles.middle}></Image>
          </View>
    }
    {this.state.hasCameraPermission && this.state.selectedIndex==0 &&
          <View style={{flex:1, position:'absolute', zIndex:1, alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Scan an item</Text>
            <Camera style={{position:'relative',marginTop:20, height:200, width:250 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                backgroundColor: '#95C623',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        
            <View style={{marginTop:'5%', alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:15, textAlign:'center', textAlignVertical:'center',color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F',paddingHorizontal:'10%', width:'40%',height:30,borderRadius:10}} onPress={()=>takePicture()}>Capture</Text>
            </View>
          </View>
    }
    {this.state.hasCameraPermission && this.state.selectedIndex==1 && !this.state.cart &&
          <View style={{flex:1, position:'absolute', zIndex:1, alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Scan your cart</Text>
            <Camera style={{position:'relative',marginTop:20, height:200, width:250 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                backgroundColor: '#95C623',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
         
            <View style={{marginTop:'5%', alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:15, textAlign:'center', textAlignVertical:'center',color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F',paddingHorizontal:'10%', width:'40%',height:30,borderRadius:10}} onPress={()=>takePicture()}>Capture</Text>
            </View>
          </View>
    }
      {this.state.recommendations && this.state.cart &&
      <View style={{alignContent:'center'}}>
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Points</Text>
      <Text style={{position:'relative',fontSize:50,marginTop:'5%',textAlign:'center', color:'#8ab661', fontFamily:'FuturaH'}}>{this.state.score}</Text>
      
      <View style={{marginTop:'25%', alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:15, textAlign:'center', textAlignVertical:'center',color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F',paddingHorizontal:'10%', width:'40%',height:30,borderRadius:10}} onPress={()=>{}}>Collect Points</Text>
            <Text style={{position:'relative',fontSize:15, textAlign:'center', textAlignVertical:'center',color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F',paddingHorizontal:'10%', width:'40%',height:30,borderRadius:10, marginTop:'10%', alignSelf:'center'}} onPress={()=>{}}>Re-capture</Text>
            </View>
    </View>
    }
    {this.state.selectedIndex==2 &&
          <View style={{alignContent:'center'}}>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Zurich, CH</Text>
            <Image source={require('../assets/dining.png')} style={styles.album}></Image>
            
            <Text style={{position:'relative',fontSize:15,marginTop:'10%',textAlign:'center',marginLeft:'15%', color:'#364f6b', fontFamily:'FuturaH', width:'70%'}}>{this.state.restaurant}</Text>
          </View>
    }
      </View>
      {this.state.selectedIndex==2 &&
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}}>Ecofriendly restaurants</Text>}
       {this.state.selectedIndex!=2 &&
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}}>Ecofriendly recommendations</Text>}

      {!this.state.recommendations && this.state.selectedIndex!=2 &&
     <Text style={{fontFamily:'FuturaL', textAlign:'center', fontSize:20, marginTop:10}}>Scan an item to get recommendations</Text>
      
    }
    {this.state.recommendations && this.selectedIndex!=2 &&
      <ScrollView style={styles.scrollcontainer}>
      <SongList itemList={this.getData()}/>
      </ScrollView>
    }
     {this.state.rest && this.state.selectedIndex==2 &&
      <ScrollView style={styles.scrollcontainer}>
      <RestaurantList itemList={this.getData()}/>
      </ScrollView>
    }
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
  album:{
    height:'50%',
    width:'70%',
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