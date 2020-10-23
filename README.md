
# Vincent

## Demo
[Click Here to view](https://vincent-react.herokuapp.com/).

## Requirements

For development, you will only need Node.js installed on your environment.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v12.14.1

    $ npm --version
    6.14.4

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs


## Install

    $ npm install


## Start & watch

    $ npm start


## Languages & tools

### Templating

- [HTML](http://jade-lang.com/) for some structuring.

### JavaScript

- [React](http://facebook.github.io/react) is used for UI.
- [fontawesome](https://fontawesome.com/) is used for adding interactive icons.
- [axios](https://www.npmjs.com/package/axios) for handling api calls.
- [lodash](https://lodash.com/) for utilitizing functions for common programming tasks using the functional programming paradigm.
- [typescript](https://www.typescriptlang.org/) for implementing SOLID design patterns.

### CSS
- [SCSS](https://sass-lang.com/) is used to write futureproof CSS in nested form.

## Notes
- Implemented a sortable and paginated data table.
- Added sorting on table fields.
- Properly handle UI with mobile responsiveness.
- Added filter on Party, title and state.
- Added fuzzy text search
- Implemented image cache using rails by hitting this url:

  ```https://image-cache-congress.herokuapp.com/application/get_image?image_url=https://theunitedstates.io/images/congress/225x275/IMAGE_NAME```
- We can add test cases using libraries likes jest, enzyme or mocha.
- We can add eslint to ensure code consistency across the teams.
- For future we can add Styled Components to write css in js.
- I have deployed it on [Heroku](https://vincent-react.herokuapp.com/).
