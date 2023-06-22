import React from 'react'
import InputWithLabel from './InputWithLabel';

type SearchFormProps = {
    searchTerm: string,
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSearchSubmit:  (event: React.FormEvent<HTMLFormElement>) => void,
}

const SearchForm = ({ searchTerm, handleSearch, handleSearchSubmit }: SearchFormProps) => {
  
  return (
    <form onSubmit={handleSearchSubmit}>
    <div className="search-container">
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
      >
        Submit
      </button>
      </div>
    </form>
  )
}



export default SearchForm