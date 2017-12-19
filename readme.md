# vue-prettier

> Prettify .vue files with [Prettier](https://prettier.io/)

## Why

* Uses [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) instead of regexp to parse .vue files
* same CLI args as prettier (can be used as a drop-in replacement)

_Note that this is a temporary solution while waiting for [Prettier to support Vue.js](https://github.com/prettier/prettier/issues/2097)._

## Install

```
$ npm install --global vue-prettier
```

Make sure that you also have [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) as a dev dependency (which should be the case if you use [vue-loader](https://github.com/vuejs/vue-loader) or [rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue))

```
$ npm install --save-dev vue-template-compiler
```

## Usage

### CLI

```
$ vue-prettier --write my-component.vue
```

### Editor integration

#### Vim

Install [vim-prettier](https://github.com/prettier/vim-prettier) and set the prettier CLI executable path

```vim
let g:prettier#exec_cmd_path = "~/path/to/cli/vue-prettier"
```

#### Webstorm

Follow the [official Webstorm Setup](https://prettier.io/docs/en/webstorm.html#standalone) and set the Program to `vue-prettier`

#### Visual Studio Code

Visual Studio Code supports formatting .vue files thanks to the [Vetur extension](https://vuejs.github.io/vetur/).
More informations can be found in the [formatting page](https://vuejs.github.io/vetur/formatting.html).

## Credits

This project wouldn't be possible without the great work on these projects

* [pretty-vue.sh](https://gist.github.com/pearofducks/22aa906a550c762a7b7a582f6d4e14ff)
* [prettier-vue](https://github.com/guilhermelimak/prettier-vue)

## License

MIT © [Olivier Ligot](https://oligot.be)
