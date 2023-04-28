import { Characters, } from './redux/types';

const BASE_URL = 'https://swapi.dev/api/people';

// Fetch_character
interface FetchCharacterOptions {
    id: string;
}

interface FetchCharacterResult {
    fetchedCharacter: Characters;
}

const fetchCharacter = async ({ id }: FetchCharacterOptions): Promise<FetchCharacterResult> => {
    const url = `${BASE_URL}/${id}/`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching character');
        }

        const data = await response.json();

        const fetchedCharacter: Characters = {
            id: data.url.split('/').slice(-2, -1)[0],
            name: data.name,
            birth_year: data.birth_year,
            gender: data.gender,
            height: data.height,
            mass: data.mass,
            hair_color: data.hair_color,
            skin_color: data.skin_color,
            eye_color: data.eye_color,
            homeworld: data.homeworld,
            films: data.films,
            species: data.species,
            vehicles: data.vehicles,
            starships: data.starships,
            created: data.created,
            edited: data.edited,
            url: data.url,
        };

        return { fetchedCharacter };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// FetchChars
interface FetchCharactersOptions {
    searchQuery?: string;
    page?: number;
}

const defaultOptions: FetchCharactersOptions = {
    searchQuery: '',
    page: 1,
};

interface FetchCharactersResult {
    fetchedCharacters: Characters[];
    totalItems: number;
}

const fetchCharacters = async (
    options: FetchCharactersOptions = defaultOptions
): Promise<FetchCharactersResult> => {
    const { searchQuery = '', page = 1 } = options;
    const url = `${BASE_URL}/?search=${searchQuery}&page=${page}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching characters');
        }

        const data = await response.json();
        console.log(data)

        const fetchedCharacters: Characters[] = data.results.map((result: any) => ({
            id: result.url.split('/').slice(-2, -1)[0],
            name: result.name,
            birth_year: result.birth_year,
            gender: result.gender,
            height: result.height,
            mass: result.mass,
            hair_color: result.hair_color,
            skin_color: result.skin_color,
            eye_color: result.eye_color,
            homeworld: result.homeworld,
            films: result.films,
            species: result.species,
            vehicles: result.vehicles,
            starships: result.starships,
            created: result.created,
            edited: result.edited,
            url: result.url,
        }));

        return { fetchedCharacters, totalItems: data.count };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { fetchCharacters, fetchCharacter };
