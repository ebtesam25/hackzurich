import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Leader from './leader';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const LeaderList = ({ itemList}) => (
    <View style={styles.container}>
        
        <FlatList
                data={itemList}
                renderItem={({ item }) => <Leader
                    name={item.name}
                    album={item.album}
                    artist={item.artist} 
                    
                    
                />}
            />

    </View>
);

export default LeaderList;