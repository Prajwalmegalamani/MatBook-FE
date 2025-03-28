"use client";
import Image from "next/image";
import Socials from "../../../public/images/socials.svg";
import Logo from "@/components/Logos/logo";
import LoginBackground from "@/backgrounds/login-background";
import LoginButton from "@/components/Buttons/login-button";
import { useToast } from "@/hooks/use-toast";
import Separators from "@/components/Separators/separators";
import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { toastWarning } = useToast();
  const { onLoginSuccess } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState<boolean>(true);
  const router = useRouter();

  function handleRememberMeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsRememberMeChecked(e.target.checked);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (/^[^@]+@[^@]+\.[^@]+$/.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    setPassword(e.target.value);
  }

  async function handleLogin() {
    setIsLoading(true);
    if (!isEmailValid) {
      toastWarning("Invalid email");
      return;
    }

    if (!isPasswordValid) {
      toastWarning("Invalid password");
      return;
    }

    // router.push("/dashboard");
    const username = email.split("@")[0];
    console.log(email, username, password);

    const res = await login(username, password);
    console.log(res);
    onLoginSuccess({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
    setIsLoading(false);
  }

  function getHeaderText() {
    return (
      <div className="flex flex-col justify-start text-start items-start align-middle gap-6 max-w-[400px] font-zen-kaku-gothic-antique">
        <h2 className="text-white text-4xl font-bold">
          Building the Future...
        </h2>
        <span className="text-white text-base font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </span>
      </div>
    );
  }

  function getFormHeader() {
    return (
      <div className="flex flex-col justify-start items-start align-middle">
        <h3 className="font-poppins text-sm font-medium">Welcome Back!</h3>
        <h4 className="font-poppins text-2xl font-semibold">
          Log In to your Account
        </h4>
      </div>
    );
  }

  function getForm() {
    return (
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-start items-start align-middle gap-[20px]"
      >
        <div className="flex flex-col justify-start items-start align-middle gap-[8px]">
          <label className="font-poppins text-sm font-medium text-[#4F4F4F]">
            Email
          </label>
          <input
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Type Here..."
            className={`font-poppins text-sm font-medium text-[#333333] w-[88vw] lg:max-w-[380px] border border-[#E0E0E0] rounded-lg p-2 placeholder:text-[#BDBDBD] ${
              !isEmailValid ? "border-red-500" : ""
            }`}
          />
          {!isEmailValid && (
            <span className="text-red-500 text-sm">Invalid email</span>
          )}
        </div>
        <div className="flex flex-col justify-start items-start align-middle gap-[8px]">
          <label className="font-poppins text-sm font-medium text-[#4F4F4F]">
            Password
          </label>
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Type Here..."
            className={`font-poppins text-sm font-medium text-[#333333] w-[88vw] lg:max-w-[380px] border border-[#E0E0E0] rounded-lg p-2 placeholder:text-[#BDBDBD] ${
              !isPasswordValid ? "border-red-500" : ""
            }`}
          />
          {!isPasswordValid && (
            <span className="text-red-500 text-sm">Invalid password</span>
          )}
        </div>
        <div className="flex w-full justify-between items-center align-middle ">
          <div className="flex justify-start items-center align-middle gap-[5px]">
            <input
              onChange={handleRememberMeChange}
              checked={isRememberMeChecked}
              type="checkbox"
              className="w-[22px] h-[22px] accent-[#EE3425] rounded-lg"
            />
            <label className="font-poppins text-xs font-medium text-[#333333]">
              Remember Me
            </label>
          </div>
          <div className="flex flex-col justify-start items-start align-middle gap-[5px]">
            <button className="font-poppins text-sm font-medium text-[#333333]">
              Forgot Password?
            </button>
          </div>
        </div>
        <LoginButton
          text="Log In"
          isLoading={isLoading}
          disabled={!isEmailValid || !isPasswordValid}
          onClick={() => {
            handleLogin();
          }}
        />
      </form>
    );
  }

  function getSignUp() {
    return (
      <div className="flex w-full flex-col justify-start items-center align-middle gap-[24px]">
        <span className="font-poppins text-sm font-medium text-[#333333]">
          New User?{" "}
          <button
            className="text-[#212121] cursor-pointer font-bold underline"
            onClick={() => toastWarning("Currently not available")}
          >
            SIGN UP HERE
          </button>
        </span>
        <div className="flex w-full flex-col justify-center align-middle items-center text-xs text-black gap-1 font-normal">
          <span>emilys@gmail.com</span>
          <span>emilyspass</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center text-white w-screen ">
      {/* Background Image */}
      <LoginBackground />
      <div className="w-full flex justify-center gap-[180px] items-start z-[1] mt-[132px]">
        {/* Left Side */}
        <div className="hidden lg:flex h-full  flex-col justify-start items-start align-middle mt-[142px] gap-[120px]">
          <Logo withText={true} />
          {/* Header Text */}
          {getHeaderText()}
        </div>
        {/* Right Side */}
        <div className="h-full flex flex-col justify-start items-center align-middle bg-[#FAFAFA] rounded-t-3xl px-4 py-6 md:p-8 mx-2 lg:p-10 gap-[40px]">
          <div className="flex flex-col justify-start items-start align-middle gap-[24px] text-black">
            {/* Header */}
            {getFormHeader()}
            {/* Form */}
            <div className="flex flex-col justify-start items-start align-middle gap-[20px]">
              <div className="flex flex-col justify-start items-start align-middle">
                {getForm()}
              </div>
              {/* Separator */}
              <Separators />
              {/* Socials */}
              <button
                className="cursor-pointer"
                onClick={() => toastWarning("Currently not available")}
              >
                <Image src={Socials} alt="socials" className="" />
              </button>
            </div>
          </div>
          {/* Sign Up */}
          {getSignUp()}
        </div>
      </div>
    </div>
  );
}
