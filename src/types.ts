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

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: Category;
    isPublish: boolean;
    createdAt: string;
};

export interface PriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export type ImageField = { file: File }
export type CreateProductData = Product & { image: ImageField };
