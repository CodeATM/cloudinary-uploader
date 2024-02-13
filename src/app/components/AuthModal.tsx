import React from "react";
import { ModalProps } from "@/types/ModalProps";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosCloudOutline } from "react-icons/io";
import { LiaGithub } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import Input from "./Input";
import { useState, useCallback } from "react";
import axios from "axios";
import { signUpWithCredentials } from "@/utils/helpers/authHelpers";
import {signIn} from 'next-auth/react'

type Props = {};

const AuthModal = ({ handleCloseAuth, handleOpenAuth, auth }: ModalProps) => {
  const [variant, setVariant] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  //====================== Register ==================================
  const register = useCallback(async () => {
    const res = await signUpWithCredentials({name, password, email})

    if (res?.success) {
      console.log('user created')
      toggleVariant()
      setName('')
      setPassword('')
      setEmail('')

    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    await signIn('credentials', {
      email: email,
      password: password,
    })
  }, [email, password]);

  //====================== Login =====================================

  return (
    <div
      className={
        auth
          ? "fixed top-0 left-0 right-0 bottom-0 bg-black/55 bg-blur bg-opacity-40 z-50 flex justify-center items-center px-4 opacity-1 visible transition duration-300"
          : "opacity-0 hidden"
      }
    >
      <div className="bg-containe p-8 rounded-xl bg-white max-w-[450px]">
        <AiOutlineClose
          className="absolute right-8 top-8 text-2xl cursor-pointer text-white"
          onClick={handleCloseAuth}
        />
        <div className="py-8 px-5 flex flex-col justify-center gap-3">
          <div className="text-center cursor-pointer">
            <div className="logo flex justify-center items-center gap-2">
              <IoIosCloudOutline className="font-bold text-4xl" />{" "}
              <span className="text-semibold trackig-wide text-2xl capitalize">
                cloudz
              </span>
            </div>
            <p className="mt-2 font-medium text-lg">
              {variant === "login"
                ? "Welcome back!"
                : "Create a Cloudz Account"}
            </p>
          </div>
          {/* //----------------------------------------- */}

          <div className="inputs space-y-5">
            {variant === "register" && (
              <input
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                className="w-full px-3 py-2 outline-none border-[1px] border-gray-300 text-md placeholder:text-gray-500 rounded-[7px] text-gray-700"
                placeholder="Fullname"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="w-full px-3 py-2 outline-none border-[1px] border-gray-300 text-md placeholder:text-gray-500 rounded-[7px] text-gray-700"
              placeholder="name@gmail.com"
            />
            <input
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="w-full px-3 py-2 outline-none border-[1px] border-gray-300 text-md placeholder:text-gray-500 rounded-[7px] text-gray-700"
              placeholder="Password"
            />
          </div>

          {/* //------------------------------------ */}
          <div className="button">
            <button onClick={login} className="py-2 mt-3 hover:bg-gray-900 rounded-[7px] text-[1.05rem] bg-black text-gray-300 fonst-semibold text-center w-full ">
              {variant === "login" ? "Sign in  " : "Create Account"}
            </button>
            <div className="mt-3 flex text-sm font-medium gap-x-1">
              <h1 className="text-gray-500">
                {variant === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </h1>
              <span
                onClick={toggleVariant}
                className="cursor-pointer hover:text-gray-800 transition ease-in-out duration-30"
              >
                {variant === "login" ? "Create Account " : "Sign in"}
              </span>
            </div>
          </div>

          {/* //-------------------------------------------------- */}

          <div className="social space-y-3 mt-3">
            <div className="w-full px-3 py-2 border-[1px] border-gray-300 text-md placeholder:text-gray-500 rounded-[7px] text-gray-700 flex justify-center items-center gap-2 cursor-pointer hover:border-gray-400 transition ease-in-out duration-300">
              <FcGoogle className="text-xl" />{" "}
              <span className="">Continue with Google</span>
            </div>
            <div className="w-full px-3 py-2 border-[1px] border-gray-300 text-md placeholder:text-gray-500 rounded-[7px] text-gray-700 flex justify-center items-center gap-2 cursor-pointer hover:border-gray-400 transition ease-in-out duration-300">
              <LiaGithub className="text-xl" />
              Continue with Github
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
