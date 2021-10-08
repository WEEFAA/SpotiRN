import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AuthContext, { AuthProvider } from './context/AuthProvider'

const Authentication = () => {
    const state = React.useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Text style={styles.text('white', 24)}>SpotiRN App! 🎉</Text>
            <Text>
                {state.authenticated ? 'Enjoy our services!' : 'Authorize us now!'}
            </Text>
            {state.authenticated ? (
				<View>
					<TouchableOpacity style={styles.login("maroon")} onPress={state.logout}>
						<Text style={styles.text('white')}>Sign out</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.login("white")} onPress={state.refreshState}>
						<Text style={styles.text('black')}>Refresh Token</Text>
					</TouchableOpacity>
				</View>
            ) : (
                <TouchableOpacity style={styles.login("teal")} onPress={state.login}>
                    <Text style={styles.text('white')}>Sign in with @Google</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const SpotiRNApp = () => {
    return (
        <AuthProvider>
            <Authentication />
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    login: (bgColor) => ({
        marginVertical: 5,
        backgroundColor: bgColor,
        borderColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 10,
		alignItems: 'center'
    }),
    text: (color, size = 18) => ({
        color: color,
		fontSize: size
    }),
})

export default SpotiRNApp
