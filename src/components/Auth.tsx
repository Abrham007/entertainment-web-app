import Image from "next/image";
import { FC } from "react";
import videoIcon from "../../public/videoIcon.svg";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
import LoginForm from "./LoginForm";

interface AuthProps {
  type: "login" | "register";
}

const Auth: FC<AuthProps> = ({ type }) => {
  return (
    <main className="bg-blue-950 min-h-screen flex flex-col gap-15  sm:gap-20 items-center justify-center overflow-clip">
      <Image
        src={videoIcon.src}
        alt="Food Icon"
        width={videoIcon.width}
        height={videoIcon.height}
        className="h-14 w-14"
      />
      <div className="max-w-[400px] sm:w-full bg-blue-900 p-6 sm:p-8  rounded-[20px] flex flex-col gap-8 m-6">
        <h1 className="text-white text-6xl font-light">
          {type === "login" ? "Login" : "Sign Up"}
        </h1>
        {type === "login" ? <LoginForm /> : <RegisterForm />}
        <p className=" text-white text-center text-xl font-light leading-4">
          {type === "login" ? (
            <>
              <span>Don’t have an account?</span>
              <Link href="/register" className="text-red-500 p-3">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span>Already have an account?</span>
              <Link href="/login" className="text-red-500 p-3">
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
};

export default Auth;
