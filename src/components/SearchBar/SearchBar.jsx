import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery("");
    } else {
      toast.error("Please enter text to search for images.");
    }
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
          className={css.input}
        />
        <button type="submit" className={css.inputBtn}>
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
