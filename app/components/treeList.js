import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Tree from './tree';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const TreeList = ({ itemList}) => (
    <View style={styles.container}>
        
        <FlatList
                data={itemList}
                renderItem={({ item }) => <Tree
                    name={item.name}
                    album={item.album}
                    artist={item.artist} 
                    
                    
                />}
            />

    </View>
);

export default TreeList;