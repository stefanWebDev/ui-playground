'use client';
import React from "react";
import { createPortal } from "react-dom";

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
      className="fixed inset-0 bg-black opacity-50 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>

  );
}
