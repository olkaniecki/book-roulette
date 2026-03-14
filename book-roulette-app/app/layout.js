// app/layout.js
import { BooksProvider } from "./context/books_context";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BooksProvider>{children}</BooksProvider>
      </body>
    </html>
  );
}
