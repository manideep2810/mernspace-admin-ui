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

export type Tenant = {
    id: number;
    name: string;
    address: string;
};