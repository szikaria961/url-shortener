# Url Shortener

Url Shortener (MVC design)
![Url Shortener](https://res.cloudinary.com/sabazikaria/image/upload/v1612903252/Screen_Shot_2021-02-09_at_2.39.48_PM_qtqw0u.png)

Live preview is available [here](https://provide-url-shortener.herokuapp.com/).

## Requirements

_Technical Requirements_

- `Node.js >= v14`

## Development

### Installation

```
git clone https://github.com/szikaria961/url-shortener.git
cd url-shortener
npm install
cp .example-env .env
```

Open the `.env` file in your text editor of choice and fill in the `PORT`,
`MONGO_URI`, `BASE_URL`.

### Server

```
npm run dev
```

### Running Mongo

Create a new terminal tab/session and do the following:

```
mongod
```

View development app at `http://localhost:8000`

## License

[MIT](https://choosealicense.com/licenses/mit/)
