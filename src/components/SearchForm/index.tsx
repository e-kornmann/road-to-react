import InputWithLabel from './InputWithLabel/InputWithLabel';
import StyledSearchForm from './style';
import * as S from '../shared/StyledButtons';
import { SearchFormProps } from './types';

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  isMediumDevice,
  hide,
}: SearchFormProps) => (
    <StyledSearchForm onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
        hide={hide}
      >
        <span>Search:</span>
      </InputWithLabel>
      {isMediumDevice ? (
        <S.StyledButton data-testid="submit-button-small" type="submit" disabled={!searchTerm}>
          Submit
        </S.StyledButton>
      ) : (
        <S.StyledButtonLarge data-testid="submit-button-large" type="submit" disabled={!searchTerm}>
          Submit
        </S.StyledButtonLarge>
      )}
    </StyledSearchForm>
);

export default SearchForm;
