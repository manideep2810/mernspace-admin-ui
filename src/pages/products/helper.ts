import type { CreateProductData, ImageField } from '../../types';

export const makeFormData = (data: CreateProductData) => {
    const formData = new FormData();
    // console.log('Hi from makeForm')
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
            console.log('value', value);
            formData.append(key, (value as ImageField).file);
        } else if (key === 'priceConfiguration' || key === 'attributes') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value as string);
        }
    });
    return formData;
};