
export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
		const res = await this.getResource(`/books/`);
		return res.map(this._transformBook)
    }
    
    getBook = async (id) => {
		const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=36&pageSize=10`);
		return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(res)
    }
    
     getAllHouses = async () => {
		const res = await this.getResource(`/houses/`);
		return res.map(this._transformHouse)
    }
    
     getHouse =  async (id) => {
		const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res)
    }

	_addId(url) {
		const regExp = /[\d]+/g;
		return url.match(regExp)[0];
	}

	_checkEmpty (value) { 
		return value.length === 0 ? 'no data :(' : value;
	}

	_transformCharacter = (char) => {
		return {
			id: this._addId(char.url),
			name: this._checkEmpty(char.name),
			gender: this._checkEmpty(char.gender),
			born: this._checkEmpty(char.born),
			died: this._checkEmpty(char.died),
			culture: this._checkEmpty(char.culture)
		}
	}

	_transformHouse = (house) => {
		return {
			id: this._addId(house.url),
			name: this._checkEmpty(house.name),
			region: this._checkEmpty(house.region),
			words: this._checkEmpty(house.words),
			titles: this._checkEmpty(house.titles),
			overlord: this._checkEmpty(house.overlord),
			ancestralWeapons: this._checkEmpty(house.ancestralWeapons)
		}
	}

	_transformBook = (book) => {
		return {
			id: this._addId(book.url),
			name: this._checkEmpty(book.name),
			numberOfPages: this._checkEmpty(book.numberOfPages),
			publisher: this._checkEmpty(book.publisher),
			released: this._checkEmpty(book.released)
		}
	}
 }
