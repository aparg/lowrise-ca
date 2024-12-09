"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const NoteInput = ({ onSubmit, placeholder, type, autoFocus }) => {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type={type || "text"}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting || !note.trim()}
          className="p-2 text-black rounded-full hover:bg-chat-active-card transition-colors disabled:text-gray-300 disabled:hover:bg-transparent"
          aria-label="Send message"
        >
          {isSubmitting ? (
            <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default NoteInput;
