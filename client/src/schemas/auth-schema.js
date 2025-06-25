import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password is required!" })
  .max(16, { message: "You have excceded the limit!" });

// login schema
export const loginValidSchemas = z.object({
  email: z.string().email({ message: "Email is required!" }).min(1).max(255),
  password: passwordSchema,
});

// register schema
export const registerValidSchemas = loginValidSchemas
  .extend({
    fullName: z.string().min(1, { message: "Please provide your full name!" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please provide confirm password!" }),
    signupAs: z.string().min(1),
    acceptTerm: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!!",
    path: ["confirmPassword"],
  });
