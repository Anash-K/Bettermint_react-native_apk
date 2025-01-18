import { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";


const BackButton = memo(() =>{
    return(
        <Pressable>
            <Text style={styles.backButton}>Back</Text>
        </Pressable>
    )
});

const styles = StyleSheet.create({
    backButton: {
        
    }
})