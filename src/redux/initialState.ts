import { AppState} from './types';

const initialState: AppState = {
    searchQuery: '',
    characters: [],
    isLoading:false,
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
