import type { CreateRestaurentData, CreateUserData, userData } from "../types";
import { api } from "./client";

const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog"
// Auth service
export const login = (userData : userData)=> api.post(`${AUTH_SERVICE}/auth/login`, { email : userData.email , password : userData.password } );
export const self = ()=> api.get(`${AUTH_SERVICE}/auth/self` );
export const logout = ()=> api.post(`${AUTH_SERVICE}/auth/logout` );
export const getUsers = (queryString : string)=> api.get(`${AUTH_SERVICE}/users?${queryString}`)
export const getTenants = (queryString : string)=> api.get(`${AUTH_SERVICE}/tenants?${queryString}`)
export const createUser = (userData : CreateUserData)=> api.post(`${AUTH_SERVICE}/users`,userData)
export const createTenant = (RestaurentData : CreateRestaurentData)=> api.post(`${AUTH_SERVICE}/tenants`,RestaurentData)
export const updateUser = (user : CreateUserData , id : string) => {
    return api.patch(`${AUTH_SERVICE}/users/${id}`,user)
};

// Catalog Service
export const getCategories = () => api.get(`${CATALOG_SERVICE}/categories`);
export const getProducts = (queryParam: string) => api.get(`${CATALOG_SERVICE}/products?${queryParam}`);
export const createProduct = (product: FormData) =>
api.post(`${CATALOG_SERVICE}/products`, product, {
    headers: { 'Content-Type': 'multipart/form-data' },
});