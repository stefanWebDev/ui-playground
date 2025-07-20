"use client";

import { useState } from "react";
import { FormDataUser } from "../types/interface";

type FormDataKey = keyof FormDataUser;

export function useFormData() {
  const [formData, setFormData] = useState<FormDataUser>({
    email: "",
    password: "",
  });

  function setField<K extends FormDataKey>(key: K, value: FormDataUser[K]) {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  return [formData, setField] as const;
}