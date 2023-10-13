# Pre-configured `dotenv` module

[![NPM version][npm-image]][npm-url]

## Installation

```bash
npm i dotenv-pre -S
```

## Usage

* Use `.env[.<name>]` file(s) for default and `.env[.<name>].local` for local configurations. 
* Add `.env[.<name>].local` file(s) to `.gitignore`

### Example without `name`

```typescript
import 'dotenv-pre/config';

// ...
```

### Example with `name`

```typescript
import { config } from 'dotenv-pre';

config({
  name: 'api',
});

// ...
```

### Files order

* `.env[.<name>].local` (e.g. `.env.api.local`)
* `.env[.<name>]` (e.g. `.env.api`)
* `.env.local`
* `.env`

## License

MIT

[npm-image]: https://badge.fury.io/js/dotenv-pre.svg
[npm-url]: https://npmjs.org/package/dotenv-pre
