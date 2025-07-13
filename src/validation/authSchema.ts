import { z } from "zod";

export const loginShema = z.object({
  email: z
    .string()
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      "Password must be strong"
    ),
});

export const registerSchema = loginShema
  .extend({
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
