import { Article } from "../types";

const storiesReducer = (state: Article[], action: { type: string; payload: any }) => {
    switch (action.type) {
      case 'SET_STORIES':
        return action.payload;
      case 'REMOVE_STORY':
        return state.filter((story: Article) => action.payload.objectID !== story.objectID);
      default :
        throw new Error();
    }
}

export { storiesReducer }
