import { destroyDropShadow, initDropShadow } from "@/utils/effects/dropShadow";
import { FormDataKeys, FormDataUser } from "@/types/interface";
import { FormEvent, useState } from "react";
import Input from "./Input";
import { useMutation } from "@tanstack/react-query";
import { useFormData } from "@/utils/hooks/useFormData";
import { setCookie } from "@/utils/helpers/cookie";

interface FormProps {
  type: "signin" | "signup";
}

export const Form = ({ type }: FormProps) => {
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const button = type === "signin" ? "sign in" : "sign up";
  const inputs: FormDataKeys = type === "signin" ? ["email", "password"] : [
        "surname",
        "name",
        "city",
        "address",
        "email",
        "password"
      ];

  const [formData, setFormField] = useFormData();

  const {
    mutate,
    data: responseData,
    error,
    isSuccess,
    isPending,
  } = useMutation({
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
    onSuccess: (data: { token: string; expiresAt: Date, error: string }) => {
      if (data.token) {
      setCookie("accessToken", data.token, new Date(data.expiresAt));
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(formData);
  };

  const initShadow = (e: React.FocusEvent<HTMLInputElement>) => {
    const abortController = new AbortController();
    setAbortController(abortController);
    if (abortController) {
      initDropShadow({ abortController, element: e.target });
    }
  };

  const inputFields = inputs.map((input) => (
    <Input
      key={input}
      onBlur={(e) => abortController && destroyDropShadow({ abortController, element: e.target })}
      onFocus={(e) => initShadow(e)}
      id={input}
      type="text"
      onChange={(e) => setFormField(input, e.target.value)}
      label={input}
    />
  ));

  const errorMessage = responseData?.error;

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg p-4 gap-2 flex flex-col border border-transparent"
      >
        {inputFields}
        <button
          disabled={isPending}
          type="submit"
          className="font-semibold opacity-90 hover:opacity-100 cursor-pointer mt-4 w-full bg-[var(--accent-color)] text-white py-2 px-4 rounded"
        >
          {button}
        </button>

        {errorMessage && <div className="max-w-md text-red-500">{errorMessage}</div>}

        {!error && !responseData?.error && isSuccess && (
          <div className="max-w-md text-green-500">Data received successfully!</div>
        )}
      </form>
    </div>
  );
};
