import React from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Tree from '../assets/trees.png';
import Leaderboard from '../assets/leaderboard.png';
import Home from '../assets/home.png';
import Food from '../assets/food.png';
import Plant from '../assets/plant.png';
import Profile from '../assets/profile.png';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#FFF',
        width:'100%',
        height:50,
        elevation:13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.98,
        shadowRadius: 20.62,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
});


export default function Footer  ({ route}) {
    const navigation = useNavigation();
    return(
    
    <View style={styles.container}>
       
        <Image source={Home} style={{position:'relative', height:'50%', width:'10%',resizeMode:'contain', marginVertical:'2.5%', paddingHorizontal:'10%'}}></Image>
       <Text style={{position:'absolute', fontSize:30,zIndex:10,color:'transparent', left:'7%'}} onPress={()=>navigation.navigate('Home')}>H</Text>
       <Image source={Food} style={{position:'relative',height:'50%',width:'10%', resizeMode:'contain', marginVertical:'2.5%', paddingHorizontal:'10%'}}></Image>
       <Text style={{position:'absolute', fontSize:30,zIndex:10,color:'transparent', left:'27%'}} onPress={()=>navigation.navigate('Food')}>D</Text>
       <Image source={Plant} style={{position:'relative',  height:'50%',width:'10%',  resizeMode:'contain', marginVertical:'2.5%', paddingHorizontal:'10%'}}></Image>
       <Text style={{position:'absolute', fontSize:30,zIndex:10,color:'transparent', left:'47%'}} onPress={()=>navigation.navigate('Trees')}>T</Text>
        <Image source={Tree} style={{position:'relative',  height:'50%', width:'10%', resizeMode:'contain', marginVertical:'2.5%', paddingHorizontal:'10%'}}></Image>
        <Text style={{position:'absolute', fontSize:30,zIndex:10,color:'transparent', left:'67%'}} onPress={()=>navigation.navigate('Art')}>L</Text>
        <Image source={Profile} style={{position:'relative',  height:'50%', width:'10%', resizeMode:'contain', marginVertical:'2.5%', paddingHorizontal:'10%'}}></Image>   
        <Text style={{position:'absolute', fontSize:30,zIndex:10,color:'transparent', left:'87%'}} onPress={()=>navigation.navigate('Planter')}>P</Text>

    </View>
);
}

