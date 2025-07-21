"use client";

import { useFormData } from "@/hooks/hook";
import { FormDataUser } from "@/types/interface";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent } from "react";
import { Form } from "@/components/form/Form";


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

      <Form button="sign up" onSubmit={handleSubmit} setFormField={setFormField} inputs={[
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
