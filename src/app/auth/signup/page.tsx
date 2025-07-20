"use client";

import { useFormData } from "@/components/form/hook";
import Input from "@/components/form/Input";
import { FormDataUser } from "@/components/form/interface";
import { useMutation } from "@tanstack/react-query";
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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Signup

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Input onChange={(e) => setFormField("surname", e.target.value)} label="Surname" />
        <Input onChange={(e) => setFormField("name", e.target.value)}  label="Name" />
        <Input onChange={(e) => setFormField("city", e.target.value)}  label="City" />
        <Input onChange={(e) => setFormField("address", e.target.value)}  label="Address" />
        <Input onChange={(e) => setFormField("email", e.target.value)}  label="Email" />
        <Input onChange={(e) => setFormField("password", e.target.value)}  label="Password" />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

    </div>
  );
}
