"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";

interface SpecializationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  media: string[];
}

export default function SpecializationModal({
  isOpen,
  onClose,
  title,
  media
}: SpecializationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-100 w-full max-w-3xl rounded shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <button onClick={onClose}>
              <X className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto">
            {media.map((src, index) =>
              src.endsWith(".mp4") ? (
                <video key={index} controls className="rounded w-full h-auto">
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  key={index}
                  src={src}
                  alt={`${title} work ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded object-cover w-full h-auto"
                />
              )
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
