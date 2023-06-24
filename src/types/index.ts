type Article = {
  title: string,
  url: string,
  author: string,
  numComments: number,
  points: number,
  objectID: number,
};

  type StorieState = {
    data: Article[]
    isLoading: boolean,
    isError: boolean,
  };

  type StoriesFetchInitAction = {
    type: 'STORIES_FETCH_INIT';
  };

  type StoriesFetchSuccessAction = {
    type: 'STORIES_FETCH_SUCCESS';
    payload: Article[];
  };

  type StoriesFetchFailureAction = {
    type: 'STORIES_FETCH_FAILURE';
  };

  type StoriesRemoveAction = {
    type: 'REMOVE_STORY';
    payload: Article;
  };

  type StoriesAction =
    | StoriesFetchInitAction
    | StoriesFetchSuccessAction
    | StoriesFetchFailureAction
    | StoriesRemoveAction;

export type {
  Article,
  StorieState,
  StoriesFetchSuccessAction,
  StoriesFetchFailureAction,
  StoriesRemoveAction,
  StoriesAction,
};
