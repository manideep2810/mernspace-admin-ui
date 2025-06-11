import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface tenant {
    id : number,
    name : string,
    address : string        
}

export interface User {
    id : number,
    firstName : string,
    lastName : string,
    email : string,
    role : string,
    tenant : tenant
} 

export interface AuthState{
    user : null | User
    setUser : (user : User) => void
    logout : () => void
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user : null,
        setUser : (user) => set({user : user}),
        logout : () => set({user : null})
    }))
) 