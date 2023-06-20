import React from 'react'

type SearchFormProps = {
  find: string,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Search = ({find, onSearch}: SearchFormProps) => (
  <>
    <label htmlFor="search">Search:</label>
    <input
      id="search"
      type="text"
      value={find}
      onChange={onSearch}
      />
      </>
  )




export default Search;