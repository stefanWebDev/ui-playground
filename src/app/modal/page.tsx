"use client";

import { Modal } from "@/components/custom/Modal";
import Link from "next/link";
import { useState } from "react";

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-sans p-8 flex flex-col gap-4 items-center">
      <Link className="opacity-80 hover:opacity-100 " href="/">
        Back
      </Link>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-bold">Modal Title</h2>
        <p className="text-left mt-2">
          TLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum.
        </p>
      </Modal>
      <button
        type="button"
        aria-label="Open Modal"
        className="font-semibold opacity-90 hover:opacity-100 cursor-pointer mt-4 w-32 bg-[var(--accent-color)]
                  text-white py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
    </div>
  );
}
