"use client";

import React, { useState } from "react";
import { useBooks } from "../context/books_context";
import Image from "next/image";

export default function AddBook() {
  const { addBook, books } = useBooks();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState("");
  const [format, setFormat] = useState("");

  const searchBook = async () => {
    if (!query) return;
    const res = await fetch(`/api/books?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const booksData = data.items?.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      cover: item.volumeInfo.imageLinks?.thumbnail || "",
    }));

    setResults(booksData || []);
  };

  const handleAddBook = () => {
    if (!selectedBook) return;
    addBook({
      id: selectedBook.id,
      title: selectedBook.title,
      cover: selectedBook.cover,
      genre,
      pages,
      format,
    });
    setSelectedBook(null);
    setQuery("");
    setResults([]);
    setGenre("");
    setPages("");
    setFormat("");
  };

  return (
    <div className="p-8">
      <h2>Add Book</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books"
      />
      <button onClick={searchBook}>Search</button>

      <div className="mt-4 flex flex-col gap-2">
        {results.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className={`p-2 border cursor-pointer ${
              selectedBook?.id === book.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            {book.cover && <Image src={book.cover} alt={book.title} width={50} height={75} />}
            <p>{book.title}</p>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="mt-4">
          <h3>{selectedBook.title}</h3>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Classic">Classic</option>
          </select>
          <select value={pages} onChange={(e) => setPages(e.target.value)}>
            <option value="">Pages</option>
            <option value="100-199">100-199</option>
            <option value="200-299">200-299</option>
          </select>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">Format</option>
            <option value="Paperback">Paperback</option>
            <option value="Hardcover">Hardcover</option>
          </select>
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}

      <div className="mt-4">
        <h3>Your Library</h3>
        {books.map((b) => (
          <div key={b.id}>
            {b.cover && <Image src={b.cover} alt={b.title} width={40} height={60} />}
            <span>{b.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
