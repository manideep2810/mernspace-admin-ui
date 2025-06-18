import type { CreateRestaurentData, CreateUserData, userData } from "../types";
import { api } from "./client";


// Auth service
export const login = (userData : userData)=> api.post( '/auth/login', { email : userData.email , password : userData.password } );
export const self = ()=> api.get( '/auth/self' );
export const logout = ()=> api.post( '/auth/logout' );
export const getUsers = (queryString : string)=> api.get(`/users?${queryString}`)
export const getTenants = (queryString : string)=> api.get(`/tenants?${queryString}`)
export const createUser = (userData : CreateUserData)=> api.post('/users',userData)
export const createTenant = (RestaurentData : CreateRestaurentData)=> api.post('/tenants',RestaurentData)
export const updateUser = (user : CreateUserData , id : string) => {
    console.log('hitting request');
    return api.patch(`/users/${id}`,user)
};