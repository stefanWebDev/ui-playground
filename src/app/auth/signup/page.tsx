"use client";

import Link from "next/link";
import { Form } from "@/components/auth-form/Form";

export default function Signup() {

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">

      <Link href="/">Back</Link>

      <Form type="signup" button="sign up" inputs={[
        "surname",
        "name",
        "city",
        "address",
        "email",
        "password"
      ]} />

    </div>
  );
}
