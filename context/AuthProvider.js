import React from 'react'
import AuthConfig from './../config'
import { authorize, revoke, refresh } from 'react-native-app-auth'
import { Alert } from 'react-native'

const AuthContext = React.createContext({
    accessToken: '',
    idToken: '',
    authenticated: false,
})

export const AuthProvider = props => {
    const [authState, setAuthState] = React.useState({})
    const [authenticated, toggleAuthenticated] = React.useState(false)

    const login = React.useCallback(async () => {
        try {
            const authState = await authorize(AuthConfig)
            setAuthState(authState)
            toggleAuthenticated(true)
        } catch (e) {
            toggleAuthenticated(false)
            Alert.alert("Signing in", "Problem signing in, please try again")
        }
    }, [])

    const logout = React.useCallback(async () => {
        try {
            await revoke(AuthConfig, {
                tokenToRevoke: authState.refreshToken,
            })
            toggleAuthenticated(false)
        } catch (e) {
            // something went wrong
            Alert.alert("Logging out", "Problem loggin out, please try again")
        }
    }, [authState])
    
    const refreshState = React.useCallback(async () => {
        try {
            const refreshedState = await refresh(AuthConfig, {
                refreshToken: authState.refreshToken
            })
            setAuthState(refreshedState)
            Alert.alert("Success", "Token refreshed...")
        } catch (e) {
            // something went wrong
            Alert.alert("Re-authenticating", "Problem refreshing state, please try again")
        }
    }, [authState])

    const state = React.useMemo(
        () => ({
            authState,
            authenticated,
            login,
            logout,
            refreshState
        }),
        [authState, authenticated, login, logout, refreshState],
    )

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
