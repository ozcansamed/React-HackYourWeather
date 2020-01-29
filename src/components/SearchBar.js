import React from "react";
import "./SearchBar.css";

export default function SearchForm({
  onHandleFormSubmit,
  onHandleSearchInputChange
}) {
  return (
    <form onSubmit={onHandleFormSubmit}>
      <input
        type='text'
        name='city'
        onChange={onHandleSearchInputChange}
        placeholder='Search City...'
      />
      <button>Search</button>
    </form>
  );
}
