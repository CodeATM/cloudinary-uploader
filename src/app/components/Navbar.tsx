'use client'
import React from "react";
import { IoIosCloudOutline } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Image from "next/image";
import img from "../../../public/pic-2.png";
import { useState } from "react";
import AuthModal from "./AuthModal";

type Props = {};

const Navbar = (props: Props) => {
  const isLoggedin = false;
  const [auth, setAuth] = useState(false)

  const handleOpenAuth = () =>{
    setAuth(true)
  }
  const handleCloseAuth = () => {
    setAuth(false)
  }

  return (
    <div className="absolute w-full" >
      <div className=" w-[80%] md:w-[70%] bg-white mx-auto mt-8 py-4 px-4  drop-shadow-xl">
        <div className="flex justify-between items-center">
          <div
            className="flex gap-2 items-center
        "
          >
            <IoIosCloudOutline className="text-2xl font-bold" />
            <span className="font-semibold tracking-wider ">Cloudz</span>
          </div>
          <div className="user">
            {isLoggedin ? (
              <div className="flex items-center gap-3 font-medium">
                <Image
                  src={img}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <button className="text-white fonst-semibold py-2 px-2  capitalize text-[.8rem] leading-wide bg-black rounded-[.5rem] tracking-wide">
                  <RiLogoutCircleRLine />
                </button>
              </div>
            ) : (
              <div className="">
                <button onClick={handleOpenAuth} className="text-white fonst-semibold py-2 px-4  capitalize text-[1.rem] leading-wide bg-black rounded-[.5rem] tracking-wide">
                  SignUp
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal  handleOpenAuth={handleOpenAuth} handleCloseAuth={handleCloseAuth} auth={auth} />
    </div>
  );
};

export default Navbar;
