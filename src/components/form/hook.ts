"use client";

import { useState } from "react";
import { FormData } from "./interface";

type FormDataKey = keyof FormData;

export function useFormData() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function setField<K extends FormDataKey>(key: K, value: FormData[K]) {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  return [formData, setField] as const;
}