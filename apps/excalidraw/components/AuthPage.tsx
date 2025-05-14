"use client";

import React, { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

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
      if (res.status === 201) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
        return;
      }
    } catch (error) {
      console.log(error);
      return;
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
    <div className="w-full h-screen flex justify-center items-center bg-[#121212]">
      <div className="rounded-md p-5 flex flex-col justify-center w-[400px] items-center gap-5 text-white">
        <h1 className="text-2xl font-bold">
          {isSignin ? "Signin" : "Register"}
        </h1>
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
            onChange={(e) => handleFormChange("name", e.target.value)}
          />
          <InputBox
            label="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleFormChange("password", e.target.value)}
          />
          <Button
            isSignin={isSignin}
            onClick={isSignin ? handleLogin : handleRegister}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
