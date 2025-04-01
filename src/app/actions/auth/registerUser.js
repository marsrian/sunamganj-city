"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNameObj.usersCollection);

  // Validate payload structure and uniqueness of email or username
  const { email, password } = payload;
  if (!email || !password) return null;

  const existingUser = await userCollection.findOne({ email: payload.email });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    const result = await userCollection.insertOne(payload);
    result.insertedId = result.insertedId.toString();
    return result;
  }
  return null;
};