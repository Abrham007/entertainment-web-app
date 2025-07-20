import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/server";
import { registerSchema } from "@/validation/authSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const validation = registerSchema.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: `Validation failed: ${
          validation.error?.errors.map((e) => e.message).join(", ") ??
          "Unknown error"
        }`,
      },
      { status: 400 }
    );
  }

  try {
    await auth.createUser({
      email: data.email,
      password: data.password,
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: `Failed to register user. ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
