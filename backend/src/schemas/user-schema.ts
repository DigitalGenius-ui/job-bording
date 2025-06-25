import { z } from "zod";
import { passwordSchema } from "./auth-schema";

export const updateUserImg = z.object({
  userImg: z.string(),
  profileId: z.string().min(1).max(26),
});

export const updateUserPassword = z
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
