//types.ts
export interface Characters {
    id?: string;
    name?: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    created?: string;
    edited?: string;
    url?: string;
    [key: string]: any;
}


export interface AppState {
    searchQuery: string;
    characters: Characters[];
    isLoading: boolean;
    charactersNumber: number;
    singleCharacter: Characters;
}

export interface SetSearchQueryAction {
    type: 'SET_SEARCH_QUERY';
    payload: {
        searchQuery: string;
    };
}

export interface SetCharactersAction {
    type: 'SET_CHARACTERS';
    payload: {
        characters: Characters[];
    };
}

export interface SetSingleCharacterAction {
    type: 'SET_SINGLE_CHARACTER';
    payload: {
        singleCharacter: Characters;
    };
}

export interface SetIsLoadingAction {
    type: 'SET_IS_LOADING';
    payload: {
        isLoading: boolean;
    };
}

export interface SetCharactersNumber {
    type:'SET_CHARACTERS_NUMBER';
    payload:{
        charactersNumber:number;
    };
}

export type AppAction =
    | SetSearchQueryAction
    | SetCharactersAction
    | SetIsLoadingAction
    | SetCharactersNumber
    | SetSingleCharacterAction;
