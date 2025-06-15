export interface userData  {
    email : string,
    password : string
}

export type User  = {
    id : string
    firstName : string
    lastName : string
    email : string
    createdAt : string
}

export type CreateUserData = {
    firstName : string
    lastName : string
    email : string
    role : string
    tenantId : number
}

export type Tenant = {
    id: number;
    name: string;
    address: string;
};