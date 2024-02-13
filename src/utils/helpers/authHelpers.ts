"use server";

import User from "@/models/User.model";
import { connectToDB } from "../connectToDB";
import bcrypt from "bcrypt";
import { Account, Profile } from "next-auth";

interface signInParams {
  email: string;
  password: string;
}

export async function SignInUsingCredentials({
  email,
  password,
}: signInParams) {
  connectToDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Email or Password");
  }

  return { ...user._doc, _id: user._id.toString() };
}

interface ExtendedProfile extends Profile {
  picture?: string;
}

interface signInwithOauthParams {
  account: Account;
  profile: ExtendedProfile;
}

export async function signInwithOauth({
  account,
  profile,
}: signInwithOauthParams) {
  connectToDB();

  const user = await User.findOne({ email: profile.email });

  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });

  console.log(newUser);
  await newUser.save();
  return true;
}

interface getByEmail {
    email: string
}

export async function getUserbyEmail({email}:getByEmail) {
    connectToDB()

    const user = await User.findOne({email}).select('-password')

    if (!user) {
        throw new Error('User not found')
    }

    console.log({user})

    return {...user._doc, _id: user._id.toString()}
}

export interface SignUpWithCredentialsParams {
    name: string,
    email: string,
    password: string
  }
  
  export async function signUpWithCredentials ({
    name,
    email,
    password
  }: SignUpWithCredentialsParams) {
   connectToDB()
  
    try {
      const user = await User.findOne({email})
  
      if (user) {
        throw new Error("User already exists.")
      }
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      })
  
      // console.log({newUser})
      await newUser.save()
  
      return { success: true }
    } catch (error) {
        console.log(error)
      return {success: false, msg: 'unable tocreate user'}
    }
  }
