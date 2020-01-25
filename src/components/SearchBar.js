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
        style={{ margin: "10px", padding: "5px" }}
      />
      <button>Search</button>
    </form>
  );
}

/*
 <input type='submit' className='submit' />
import React, { useState, useEffect } from "react";

export default function SearchBar() {
  return (
    <div>
      <form>
        <input type='text' name='city' placeholder='Search City'></input>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default function Emoji() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <p>{translate.translate(inputValue)}</p>
    </div>
  );
}

export function Button({ onClick, label }) {
  return <button>{label}</button>;
}

 
*/
