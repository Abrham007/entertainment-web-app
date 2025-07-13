"use client";

import { useAuth } from "@/context/auth";
import Button from "./ui/Button";
import Input from "./ui/Input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShema } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { handleGoogleLogIn, handleEmailLogIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: onSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: z.infer<typeof loginShema> | null) => {
      if (!data) {
        await handleGoogleLogIn();
        return;
      }

      await handleEmailLogIn(data.email, data.password);
    },
    onSuccess: () => {
      toast.success("User logged in successfully!");
      router.refresh();
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        error.message.includes("auth/invalid-credential")
      ) {
        toast.error("User not found. Please register first.");
        return;
      }
      toast.error("Failed to log in user");
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
      </fieldset>

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isSubmitting}>
          Login to your account
        </Button>
        <div className="flex gap-4">
          <hr className="flex-1 border-t border-blue-500 self-center" />
          <span className="text-blue-500 text-2xl mx-auto ">OR</span>
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

export default LoginForm;
