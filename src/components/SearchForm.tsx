import React from 'react'
import InputWithLabel from './InputWithLabel';
import StyledSearchForm from './styledComponents/StyledSearchForm';
import * as S from './styledComponents/StyledButtons';

type SearchFormProps = {
    searchTerm: string,
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSearchSubmit:  (event: React.FormEvent<HTMLFormElement>) => void,
    isMediumDevice: boolean,
 
}


const SearchForm = ({ searchTerm, handleSearch, handleSearchSubmit, isMediumDevice }: SearchFormProps) => {
  

  return (
    <StyledSearchForm onSubmit={handleSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
      <span>Search:</span>
      </InputWithLabel>
      { isMediumDevice 
        ? (<S.StyledButtonSmall
            type="submit"
            disabled={!searchTerm}  
           >
          Submit
          </S.StyledButtonSmall>) : (
            <S.StyledButtonLarge
            type="submit"
            disabled={!searchTerm}  
           >
          Submit
          </S.StyledButtonLarge>)
          
      }
      
    </StyledSearchForm>
  )
}

export default SearchForm
