"use client";

import React, { useState } from "react";
import InputBox from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import { theme } from "@/constant";
import SuperBtn from "./SuperBtn";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
}

const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormChange = (index: keyof FormDataProps, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/signin`, { ...formData });
      console.log(res);
      if (res.status === 200) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/signup`, { ...formData });
      if (res.status === 201) {
        handleLogin();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="rounded-md p-6 mt-18 flex flex-col justify-center border border-neutral-600 w-[400px] items-center gap-5 text-white">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold capitalize">
            {isSignin ? "welcome back" : "create account"}
          </h1>
          <h1 style={{ color: theme.gray }} className="text-[14px]">
            {isSignin
              ? "Enter your credentials to access your account"
              : "Enter your info to create a new account"}
          </h1>
        </div>
        <div className="grid grid-cols-1 w-full place-items-center place-content-center gap-5">
          {!isSignin && (
            <InputBox
              label="name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
          )}
          <InputBox
            label="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
          />
          <InputBox
            label="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleFormChange("password", e.target.value)}
          />
          <SuperBtn
            onClick={isSignin ? handleLogin : handleRegister}
            label={loading ? "Loading..." : isSignin ? "Register" : "Log In"}
            variant="red"
            className="w-full mt-2"
            disabled={loading}
          />
          <p style={{ color: theme.gray }} className="text-[14px]">
            {isSignin ? "Don't have an account?" : "Already have an account?"} {" "}
            <span
              onClick={() =>
                isSignin ? router.push("/signup") : router.push("/signin")
              }
              className="hover:underline cursor-pointer"
              style={{ color: theme.orangeColor }}
            >
              {isSignin ? "Register" : "Log in"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
