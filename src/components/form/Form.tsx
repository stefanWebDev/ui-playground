import { destroyDropShadow, initDropShadow } from "@/effects/dropShadow";
import { FormDataKeys, FormDataUser } from "@/types/interface";
import { FormEvent, useState } from "react";
import Input from "./Input";

interface FormProps {
    onSubmit: (e: FormEvent) => void;
    inputs: FormDataKeys;
    setFormField: (key: keyof FormDataUser, value: string) => void;
    button: string;
}

export const Form = ({ onSubmit, inputs, setFormField, button }: FormProps) => {
    const [abortController, setAbortController] = useState<AbortController | null>(null);

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
        <form onSubmit={onSubmit} className="w-full max-w-md gap-2 flex flex-col">
            {inputFields}
            <button
                type="submit"
                className="hover:shadow-lg cursor-pointer mt-4 w-full bg-[var(--accent-color)] text-white py-2 px-4 rounded"
            >
                {button}
            </button>
        </form>
    )
}
