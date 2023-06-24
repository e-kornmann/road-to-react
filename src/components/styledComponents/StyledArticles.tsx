import styled from 'styled-components';

const StyledArticlesLarge = styled.div`
  font-family: 'Helvetica Textbook Roman';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 50px;
  margin-bottom: 100px;
  }
`;

const StyledArticlesMedium = styled(StyledArticlesLarge)`
    grid-template-columns: 1fr;
  }
`;

export { StyledArticlesMedium, StyledArticlesLarge };
