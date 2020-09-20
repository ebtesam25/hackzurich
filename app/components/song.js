import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Item from '../assets/item.png';
export default function Song({ route,name,album, artist}) {
    const navigation = useNavigation();
    return (
    <View style={styles.container}>
         <Image source={Item} style={styles.photo} />
        <View style={styles.fishdeets}>  
        <Text style={styles.name}>{name}</Text>
       
            <Text style={styles.description}>
                {artist}
            </Text>
         
        </View>
       
        
    </View>
)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
       flexDirection:'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation:1,
        alignSelf:'center',
        justifyContent:'center',
        width:'90%',
        
    },
    name: {
        fontSize: 20,
        color: '#000',
        fontFamily:'FuturaH',
        marginTop: '-5%',
        textAlignVertical:'center',
    },
     photo: {
        height: 50,
        width: 50,
        justifyContent:'center',
        paddingHorizontal:'10%',
        borderRadius:30,
        marginTop:'2%',
        resizeMode:'contain'
        
    },
    fishdeets: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginTop:20,
        marginRight: 30,
        justifyContent: 'center',
        
    },

    description: {
        fontSize: 18,
        fontFamily:'FuturaL',
        color:'#95C623'
    },
   deets:{
       borderRadius:30,
       fontFamily:'FuturaH',
       elevation:2,
       backgroundColor:'#379DA6',
       color:'#FFF',
       fontSize:15,
       padding:'5%',
       textAlign:'center',
       width:'50%',
       left:'22.5%',
       marginTop:'5%',
       marginBottom:'7.5%',
   }
});