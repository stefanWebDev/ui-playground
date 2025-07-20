"use client";

import { useFormData } from "@/components/form/hook";
import Input from "@/components/form/Input";
import { FormDataUser } from "@/components/form/interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent } from "react";


export default function Signup() {
  const [formData, setFormField] = useFormData();

  const mutation = useMutation({
    mutationFn: async (data: FormDataUser) => {

      const response = await fetch("/api/signup", {
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

      <h2 className="text-xl">Signup</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md gap-2 flex flex-col">
        <Input id="surname" type="text" onChange={(e) => setFormField("surname", e.target.value)} label="Surname" />
        <Input id="name" type="text" onChange={(e) => setFormField("name", e.target.value)} label="Name" />
        <Input id="city" type="text" onChange={(e) => setFormField("city", e.target.value)} label="City" />
        <Input id="address" type="text" onChange={(e) => setFormField("address", e.target.value)} label="Address" />
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
