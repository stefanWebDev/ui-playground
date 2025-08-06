'use client';
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal =({ isOpen, onClose, children }: ModalProps) => {

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="max-w-1/2 bg-white p-6 rounded flex-col gap-4 text-center justify-between"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button className="mx-auto hover:opacity-100 mt-4 w-32 bg-[var(--accent-color)] text-white py-2 px-4 rounded" onClick={onClose}>Close</button>
      </div>
    </div>

  );
}
