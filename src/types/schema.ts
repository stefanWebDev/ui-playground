
import { z } from 'zod';

export const FormDataUserSchema = z.object({
    surname: z.string().optional(),
    name: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    email: z.string().trim().pipe(z.email().toLowerCase()),
    password: z.string().min(1, { message: "Password is required" }),
});