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
    tenant : Tenant
}

export type CreateUserData = {
    firstName : string
    lastName : string
    email : string
    role : string
    tenantId : number
}

export type CreateRestaurentData = {
    name : string,
    address : string
}

export type Tenant = {
    id: number;
    name: string;
    address: string;
};

export type FeildData = {
    name : string[],
    value? : string
}

export type Category = {
    _id: string;
    name: string
};

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: Category;
    isPublish: boolean;
    createdAt: string;
};