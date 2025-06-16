import type { CreateUserData, userData } from "../types";
import { api } from "./client";


// Auth service
export const login = (userData : userData)=> api.post( '/auth/login', { email : userData.email , password : userData.password } );
export const self = ()=> api.get( '/auth/self' );
export const logout = ()=> api.post( '/auth/logout' );
export const getUsers = (queryString : string)=> api.get(`/users?${queryString}`)
export const getTenants = ()=> api.get('/tenants')
export const createUser = (userData : CreateUserData)=> api.post('/users',userData)