import { z } from "zod";
import { passwordSchema } from "./auth-schema";

// profile schema
export const profileSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    phoneNumber: z.string().min(1).max(16),
    email: z.string().email("Invalid email"),
    notes: z.string().min(10, "This field must be at least 10 characters"),
    resume: z.any().optional(),
    gender: z.enum(["male", "female"]).optional(),
  })
  .superRefine((data, ctx) => {
    // If user is Candidate AND update mode, require resume
    if (data.signupAs === "Candidate" && data.update && !data.resume) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["resume"],
        message: "Resume is required",
      });
    }
  });

export const socialLinksUpdate = z.object({
  portfolio: z.string(),
  website: z.string(),
  linkedIn: z.string(),
  twitter: z.string(),
  telegram: z.string(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please provide confirm password!" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match!!",
    path: ["confirmPassword"],
  });
