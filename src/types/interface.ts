
export interface FormDataUser {
    surname?: string;
    name?: string;
    city?: string;
    address?: string;
    email: string;
    password: string;
}
    

export type FormDataKeys = (keyof FormDataUser)[];

