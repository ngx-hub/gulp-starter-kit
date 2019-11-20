# Gulp 4 Starter Kit

> A simple `Gulp 4 Starter Kit` for modern web development.

This Gulp Starter Kit provides a simple way of setting up a modern web development environment. Here is a list of the current features:
 - Copy `HTML` files from `src` to `dist` directory
 - Compile `CSS` preprocessor code (`Sass/SCSS`, `Less`, `Stylus`) to `CSS`
 - Compiler `Babel` use `@babel/preset-env`
 - Autoprefix and minify `CSS` and put it inside `dist` directory
 - Compress and copy `images` into `dist` directory
 - Copy `assets` into `dist` directory
 - Spin up local dev server at `http://localhost:3000` including auto-reloading

During development, the already copied `html` page is located in the `./dist` directory, so all imports are assigned without considering the `./dist`.


## Prerequisites
This should be installed on your computer in order to get up and running:

1. `Node.js` (Required node version is >= 9.0) + `npm`
1. `Gulp 4` installed globally: `npm install gulp-cli -g`


## Dependencies
These [npm](https://www.npmjs.com/) packages are used in the `Gulp Starter Kit`:
   - [gh-pages](https://www.npmjs.com/package/gh-pages)
   - [browser-sync](https://www.browsersync.io/docs/gulp) / [options](https://www.browsersync.io/docs/options)
   - [del](https://github.com/sindresorhus/del)
   - [gulp](https://github.com/gulpjs/gulp)
   - [gulp-if](https://github.com/robrich/gulp-if)
   - [gulp-plumber](https://github.com/floatdrop/gulp-plumber)
   - [gulp-debug](https://github.com/sindresorhus/gulp-debug)
   - [gulp-concat](https://github.com/gulp-community/gulp-concat)
   - [gulp-debug](https://github.com/sindresorhus/gulp-debug)
   - [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
   - [gulp-babel ](https://github.com/babel/gulp-babel)
   - [gulp-sass](https://github.com/dlmanning/gulp-sass)
   - [gulp-postcss](https://github.com/postcss/gulp-postcss)
   - [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
   - [cssnano](https://github.com/cssnano/cssnano)
   - [gulp-less](https://github.com/gulp-community/gulp-less)
   - [gulp-stylus](https://github.com/stevelacy/gulp-stylus)
   - [gulp-rename](https://github.com/hparra/gulp-rename)
   - [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)
   - [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)


## Usage
### 1. Clone repo
```bash
https://github.com/AleksandrKinash/gulp-starter-kit
```
### 2. Go inside cloned repo
```bash
cd gulp-starter-kit
```

### 3. Install all dependencies
```bash
npm install
```

### 4. Run default gulp task
```bash
gulp
```

### 5. Build Production
disable: `sourcemaps`

enable: `imagemin`
```bash
gulp build --prod
```

### 6. Deploying / Publishing
The build can automatically deploy the build to the `GitHub Pages` of the current repository. To do this, you need to edit the field, `username` and repository in your `package.json` file.
```bash
"homepage": "https://user_name.github.io/repo_name",
```
Then in the terminal execute the following command.
```bash
npm deploy
```

## Supported CSS preprocessors and the corresponding directory names:
  - `Sass` (src/assets/sass)
  - `SCSS` (src/assets/scss)
  - `Less` (src/assets/less)
  - `Stylus` (src/assets/stylus)


## Supported types of images:
  - `PNG`
  - `JPG` / `JPEG`
  - `GIF`
  - `SVG`
  - `ICO` (not compressed)
