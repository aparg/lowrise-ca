"use client";
import React, { useState } from "react";

const NoteInput = ({ onSubmit }) => {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(note);
      setNote("");
    } catch (error) {
      console.error("Failed to submit note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t-2 border-black p-3 bg-gray-50">
      <div className="space-y-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your note here..."
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:border-black focus:ring-0 resize-none h-[80px] text-sm"
          disabled={isSubmitting}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !note.trim()}
          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Add Note
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteInput;
