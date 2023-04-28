import { AppState} from './types';

const initialState: AppState = {
    searchQuery: '',
    characters: [],
    isLoading:false,
    charactersNumber:0,
    singleCharacter: {
        id: '',
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
    },
};

export default initialState;
