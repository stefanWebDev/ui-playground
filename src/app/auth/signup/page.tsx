"use client";

import Link from "next/link";
import { Form } from "@/components/common/auth-form/Form";

export default function Signup() {
  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">
        Back
      </Link>

      <Form type="signup" />
    </div>
  );
}
