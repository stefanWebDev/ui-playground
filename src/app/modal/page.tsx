'use client';

import { Modal } from "@/components/Modal";
import Link from "next/link";
import { useState } from "react";

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">Back</Link>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-bold">Modal Title</h2>
        <p className="mt-2">This is the modal content.</p>
      </Modal>
      <button
        type="button"
        aria-label="Open Modal"
        className="font-semibold opacity-90 hover:opacity-100 cursor-pointer mt-4 w-full bg-[var(--accent-color)] text-white py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
    </div>
  );
}
