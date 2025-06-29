import { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        // Guardar datos completos del usuario
        const userToStore = {
            ...userData,
            lastLogin: new Date().toISOString(),
            postulaciones: JSON.parse(localStorage.getItem('postulaciones') || '[]')
        }
        setUser(userToStore)
        localStorage.setItem('user', JSON.stringify(userToStore))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('postulaciones')
    }

    const updateUserProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            updateUserProfile,
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)