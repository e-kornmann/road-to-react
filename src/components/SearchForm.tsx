import React from 'react';
import InputWithLabel from './InputWithLabel';
import StyledSearchForm from './styledComponents/StyledSearchForm';
import * as S from './styledComponents/StyledButtons';

export type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isMediumDevice: boolean;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  isMediumDevice,
}: SearchFormProps) => (
    <StyledSearchForm onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <span>Search:</span>
      </InputWithLabel>
      {isMediumDevice ? (
        <S.StyledButtonSmall data-testid="submit-button-small" type="submit" disabled={!searchTerm}>
          Submit
        </S.StyledButtonSmall>
      ) : (
        <S.StyledButtonLarge data-testid="submit-button-large" type="submit" disabled={!searchTerm}>
          Submit
        </S.StyledButtonLarge>
      )}
    </StyledSearchForm>
);

export default SearchForm;
