"use server";

import { auth } from "@/firebase/server";
import { registerSchema } from "@/validation/authSchema";
import z from "zod";

const registerUser = async (data: z.infer<typeof registerSchema>) => {
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    throw new Error(
      `Validation failed: ${
        validation.error?.errors.map((e) => e.message).join(", ") ??
        "Unknown error"
      }`
    );
  }

  try {
    await auth.createUser({
      email: data.email,
      password: data.password,
    });
  } catch (error: unknown) {
    throw new Error(
      `Failed to register user. ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export default registerUser;
