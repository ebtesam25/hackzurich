import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Song from './song';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const RestaurantList = ({ itemList}) => (
    <View style={styles.container}>
        
        <FlatList
                data={itemList}
                renderItem={({ item }) => <Song
                    name={item.name}
                    album={item.album}
                    artist={item.artist} 
                    
                    
                />}
            />

    </View>
);

export default RestaurantList;