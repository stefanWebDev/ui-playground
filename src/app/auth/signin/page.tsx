"use client";

import { useFormData } from "@/hooks/hook";
import Input from "@/components/form/Input";
import { FormDataUser } from "@/types/interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent } from "react";



export default function Login() {
  const [formData, setFormField] = useFormData();

  const mutation = useMutation({
    mutationFn: async (data: FormDataUser) => {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate(formData);
  }

  return (
     <div className="font-sans p-8 flex flex-col gap-4 items-center">

      <Link href="/">Back</Link>

      <h2 className="text-xl">Signin</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-md gap-2 flex flex-col">
        <Input id="email" type="text" onChange={(e) => setFormField("email", e.target.value)} label="Email" />
        <Input id="password" type="text" onChange={(e) => setFormField("password", e.target.value)} label="Password" />

        <button
          type="submit"
          className="hover:shadow-lg cursor-pointer mt-4 w-full bg-[var(--accent-color)] text-white py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
