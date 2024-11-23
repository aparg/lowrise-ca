"use client";
import React, { useState } from "react";

const NoteInput = ({ onSubmit, placeholder, type }) => {
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
    <div className="border-t border-gray-200 p-3 bg-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type={type || "text"}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-0 text-sm"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting || !note.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default NoteInput;
