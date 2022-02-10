# dotenv-eval

<img src="https://raw.githubusercontent.com/motdotla/dotenv-eval/master/dotenv-eval.png" alt="dotenv-eval" align="right" />

Dotenv-eval adds command evaluation on top of 
[dotenv](http://github.com/motdotla/dotenv). If you find yourself needing to
add the output of a command in one of your environment variables, then
dotenv-eval is your tool.

## Install

```bash
# Install locally (recommended)
npm install dotenv-eval --save
```

Or installing with yarn? `yarn add dotenv-eval`

## Usage

Create a `.env` file in the root of your project:

```dosini
GREETING="$(echo hello)"
```

As early as possible in your application, import and configure dotenv and then eval dotenv:

```javascript
var dotenv = require('dotenv')
var dotenvEval = require('dotenv-eval')

var myEnv = dotenv.config()
dotenvEval.eval(myEnv)

console.log(process.env)
```

That's it. `process.env` now has the evaluated (command substitution) values you defined in your `.env` file.

## Documentation

DotenvEval exposes one function:

* eval

### Eval

`eval` will evaluate (command substitution) your environment variables.

```js
const dotenv = {
  parsed: {
    BASIC_SUBSTITUTE: '$(echo hello)'
  }
}

const obj = dotenvEval.eval(dotenv)

console.log(obj) // { BASIC_SUBSTITUTE: 'hello' }
```

#### Options

##### ignoreProcessEnv

Default: `false`

Turn off writing to `process.env`.

```js
const dotenv = {
  ignoreProcessEnv: true,
  parsed: {
    SHOULD_NOT_EXIST: 'testing'
  }
}
const obj = dotenvEval.eval(dotenv).parsed

console.log(obj.SHOULD_NOT_EXIST) // testing
console.log(process.env.SHOULD_NOT_EXIST) // undefined
```

## FAQ

### What rules does the command substitution engine follow?

The substitution engine roughly has the following rules:

* `$(command)` will substitute any command inside the `$(  )`
* `\$(command)` will escape the `$(command)` rather than substitute it

You can see a full list of examples [here](https://github.com/motdotla/dotenv-eval/blob/master/tests/.env).

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)
