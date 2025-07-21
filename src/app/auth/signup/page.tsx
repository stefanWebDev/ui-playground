"use client";

import { useFormData } from "@/hooks/hook";
import { FormDataUser } from "@/types/interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent } from "react";
import { Form } from "@/components/form/Form";


export default function Signup() {
  const [formData, setFormField] = useFormData();

  const { mutate, data: responseData, error, isSuccess } = useMutation({

    mutationFn: async (data: FormDataUser) => {

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      return res;
    },
    onError: (error) => {
      console.error("Error during signup:", error);
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      // Handle success, e.g., redirect or show a success message
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(formData);
  }



  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">

      <Link href="/">Back</Link>

      <Form button="sign up" onSubmit={handleSubmit} setFormField={setFormField} inputs={[
        "surname",
        "name",
        "city",
        "address",
        "email",
        "password"
      ]} />

      {responseData?.error && (
        <div className="text-red-500">
         {responseData.error}
        </div>
      )}

     {!error && !responseData?.error && isSuccess && (
        <div className="text-green-500">
         Data received successfully!
        </div>
      )}

    </div>
  );
}
