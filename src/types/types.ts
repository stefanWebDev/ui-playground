export interface FormDataUser {
  surname?: string;
  name?: string;
  city?: string;
  address?: string;
  email: string;
  password: string;
}

export type FormDataKeys = (keyof FormDataUser)[];

export type AuthButtonType = "signup" | "signin" | "logout";

export type DropdownOptions = { value: string; label: string }[];
