import { z } from 'zod';

// Define sub-schemas for reusability
const userNameValidationSchema = z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1).trim(),
  city: z.string().min(1).trim(),
  country: z.string().min(1).trim(),
});

export const ordersValidationSchema = z.object({
  productName: z.string().min(1).trim(),
  price: z.number(),
  quantity: z.number(),
});

// Define the main user schema using the sub-schemas
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  // orders: z.array(ordersValidationSchema),
});

export default userValidationSchema;
