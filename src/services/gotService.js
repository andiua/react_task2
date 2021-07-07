
export default class GotService {
	_apiBase = 'https://www.anapioficeandfire.com/api';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllBooks() {
		const res = await this.getResource(`/books/`);
		return res.map(this._transformBook)
    }
    
    async getBook(id) {
		const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res);
    }
    
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter)
    }
    
    async getCharacter (id) {
        const res = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(res)
    }
    
    async getAllHouses() {
		const res = await this.getResource(`/houses/`);
		return res.map(this._transformHouse)
    }
    
    async getHouse(id) {
		const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res)
    }

	_checkEmpty(value) { 
		return value.length === 0 ? 'no data :(' : value;
	}

	_transformCharacter(char) {
		return {
			name: this._checkEmpty(char.name),
			gender: this._checkEmpty(char.gender),
			born: this._checkEmpty(char.born),
			died: this._checkEmpty(char.died),
			culture: this._checkEmpty(char.culture)
		}
	}

	_transformHouse(house) {
		return {
			name: this._checkEmpty(house.name),
			region: this._checkEmpty(house.region),
			words: this._checkEmpty(house.words),
			titles: this._checkEmpty(house.titles),
			overlord: this._checkEmpty(house.overlord),
			ancestralWeapons: this._checkEmpty(house.ancestralWeapons)
		}
	}

	_transformBook(book) {
		return {
			name: this._checkEmpty(book.name),
			numberOfPages: this._checkEmpty(book.numberOfPages),
			publisher: this._checkEmpty(book.publisher),
			released: this._checkEmpty(book.released)
		}
	}
 }
