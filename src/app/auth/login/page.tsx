"use client";


import { useFormData } from "@/components/form/hook";
import Input from "@/components/form/Input";



export default function Login() {
  const [formData, setFormField] = useFormData();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Login

      <form className="w-full max-w-md">
        <Input onChange={(e) => setFormField("email", e.target.value)} label="Email" />
        <Input onChange={(e) => setFormField("password", e.target.value)} label="Password" />

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
