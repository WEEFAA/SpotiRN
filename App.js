import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

const SpotiRNApp = () => {
    return (
        <View style={styles.container}>
            <Text>SpotiRN App! 🎉</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
})

export default SpotiRNApp
