// app/context/BooksContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  // Load from localStorage on client only
  useEffect(() => {
    const stored = localStorage.getItem("books");
    if (stored) setBooks(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => setBooks((prev) => [...prev, book]);

  const updateBook = (id, updatedFields) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );

  const removeBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error("useBooks must be used within a BooksProvider");
  return context;
};
