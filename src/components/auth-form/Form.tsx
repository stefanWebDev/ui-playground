import { destroyDropShadow, initDropShadow } from "@/effects/dropShadow";
import { FormDataKeys, FormDataUser } from "@/types/interface";
import { FormEvent, useState } from "react";
import Input from "../form/Input";
import { useFormData } from "@/hooks/useFormData";
import { useMutation } from "@tanstack/react-query";

interface FormProps {
  inputs: FormDataKeys;
  button: string;
  type: "signin" | "signup";
}

export const Form = ({ inputs, button, type }: FormProps) => {
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const [formData, setFormField] = useFormData();

  const { mutate, data: responseData, error, isSuccess } = useMutation({
    mutationFn: async (data: FormDataUser) => {

      const response = await fetch(`/api/auth/${type}`, {
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

    mutate(formData);
  }

  const initShadow = (e: React.FocusEvent<HTMLInputElement>) => {
    const abortController = new AbortController();
    setAbortController(abortController);
    abortController && initDropShadow({ abortController, element: e.target });
  }

  const inputFields = inputs.map((input) => (
    <Input
      key={input}
      onBlur={(e) => abortController && destroyDropShadow({ abortController, element: e.target })}
      onFocus={(e) => initShadow(e)}
      id={input}
      type="text"
      onChange={(e) => setFormField(input, e.target.value)}
      label={input} />
  ));

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
        {inputFields}
        <button
          type="submit"
          className="font-semibold opacity-90 hover:opacity-100 cursor-pointer mt-4 w-full bg-[var(--accent-color)] text-white py-2 px-4 rounded"
        >
          {button}
        </button>
      </form>

    {/* todo: error messages only take zod validation into account, add general error feedback from tanstack mutation */}

      {responseData?.error && (
        <div className="max-w-md text-red-500">
          {responseData.error}
        </div>
      )}

      {!error && !responseData?.error && isSuccess && (
        <div className="max-w-md text-green-500">
          Data received successfully!
        </div>
      )}</div>
  )
}
