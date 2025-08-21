"use client";

import { FormDataUser } from "@/types/types";
import { useState } from "react";

type FormDataKey = keyof FormDataUser;

export function useFormData() {
  const [formData, setFormData] = useState<FormDataUser>({
    email: "",
    password: "",
  });

  function setField<K extends FormDataKey>(key: K, value: FormDataUser[K]) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return [formData, setField] as const;
}
