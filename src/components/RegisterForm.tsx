"use client";

import { useAuth } from "@/context/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";
import registerUser from "@/actions/register-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { handleGoogleLogIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: onSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema> | null) => {
      if (!data) {
        await handleGoogleLogIn();
        return;
      }

      await registerUser(data);
    },
    onSuccess: () => {
      toast.success("User registered successfully!");
      router.refresh();
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to register user"
      );
    },
  });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <fieldset
        disabled={isSubmitting}
        className="flex flex-col gap-6 disabled:opacity-50"
      >
        <Input
          type="text" // Changed from 'email' to 'text' to disable browser validation
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Repeat Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </fieldset>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isSubmitting}>
          Create an account
        </Button>
        <div className="flex gap-4">
          <hr className="flex-1 border-t border-blue-500 self-center" />
          <p className="text-blue-500 text-2xl mx-auto ">OR</p>
          <hr className="flex-1 border-t border-blue-500 self-center" />
        </div>

        <Button
          type="button"
          onClick={() => onSubmit(null)}
          disabled={isSubmitting}
        >
          Continue with Google
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
