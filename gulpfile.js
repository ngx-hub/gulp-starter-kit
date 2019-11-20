/**
 * @author Aleksandr kinash
 * @email aleksandrkinash90@gmail.com
 * @create date 2019-11-19 19:36:42
 * @modify date 2019-11-19 19:36:42
 * @desc [description]
 */
const del =             require(`del`);
const gulp =            require(`gulp`);
const gulpIf =          require(`gulp-if`);
const debug =           require(`gulp-debug`);
const plumber =         require(`gulp-plumber`);
const sass =            require(`gulp-sass`);
const less =            require(`gulp-less`);
const stylus =          require(`gulp-stylus`);
const concat =          require(`gulp-concat`);
const rename =          require(`gulp-rename`);
const postcss =         require(`gulp-postcss`);
const autoprefixer =    require(`autoprefixer`);
const cssnano =         require(`cssnano`);
const sourcemaps =      require(`gulp-sourcemaps`);
const uglify =          require(`gulp-uglify`);
const imagemin =        require(`gulp-imagemin`);
const browserSync =     require(`browser-sync`).create();

const IS_PROD = process.argv.splice(3).includes(`--production`);

const BROWSER_SYNC_CONFIG = {
    server: {
        baseDir: `./dist/`
    },
    host: `localhost`,
    port: 3000,
    logPrefix: `Gulp 4 browserSync`
};

const SRC_BASE = `./src/`;
const DIST_BASE = `./dist/`;
const PATHS = {
    src: {
        html:   [`${SRC_BASE}*.html`],
        js:      `${SRC_BASE}scripts/**/*.js`,
        sass:   [`${SRC_BASE}styles/**/*.scss`, `${SRC_BASE}styles/**/*.sass`],
        less:   [`${SRC_BASE}less/**/!{_}*.less`],
        stylus: [`${SRC_BASE}stylus/**/!{_}*.styl`],
        assets: [`${SRC_BASE}assets/**/*`, `!${SRC_BASE}assets/**/*.{png,jpg,jpeg,gif,svg,ico}`],
        images:  `${SRC_BASE}assets/**/*.{png,jpg,jpeg,gif,svg,ico}`
    },
    dest: {
        html:   DIST_BASE,
        js:     `${DIST_BASE}scripts/`,
        sass:   `${DIST_BASE}styles/`,
        less:   `${DIST_BASE}styles/`,
        stylus: `${DIST_BASE}styles/`,
        assets: `${DIST_BASE}assets/`,
        images: `${DIST_BASE}assets/`
    }
};

const cleanTask = () => {
    return del([DIST_BASE]);
};

const htmlTask = () => {
    return gulp
        .src(PATHS.src.html, {
            base: SRC_BASE,
            since: gulp.lastRun(`html`)
        })
        .pipe(gulp.dest(PATHS.dest.html))
        .pipe(browserSync.stream());
};

const jsTask = () => {
    return gulp
        .src(PATHS.src.js, {since: gulp.lastRun(`js`)})
        .pipe(debug({title: `js: `}))
        .pipe(plumber())
        .pipe(gulpIf(!IS_PROD, sourcemaps.init()))
            .pipe(concat(`main.js`))
            .pipe(rename({basename: `main`, suffix: `.min`}))
            .pipe(uglify())
        .pipe(gulpIf(!IS_PROD, sourcemaps.write()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATHS.dest.js))
        .pipe(browserSync.stream());
};

const sassTask = () => {
    return gulp
        .src(PATHS.src.sass, {since: gulp.lastRun(`sass`)})
        .pipe(debug({title: `sass:`}))
        .pipe(plumber())
        .pipe(gulpIf(!IS_PROD, sourcemaps.init()))
            .pipe(sass())
            .pipe(rename({basename: `main`, suffix: `.min`}))
            .on(`error`, sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulpIf(!IS_PROD, sourcemaps.write()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATHS.dest.sass))
        .pipe(browserSync.stream());
};

const lessTask = () => {
    return gulp
        .src(PATHS.src.less, {since: gulp.lastRun(`less`)})
        .pipe(debug({title: `less:`}))
        .pipe(plumber())
        .pipe(gulpIf(!IS_PROD, sourcemaps.init()))
            .pipe(less())
            .pipe(rename({basename: `main`, suffix: `.min`}))
            .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulpIf(!IS_PROD, sourcemaps.write()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATHS.dest.less))
        .pipe(browserSync.stream());
};

const stylusTask = () => {
    return gulp
        .src(PATHS.src.stylus, {since: gulp.lastRun(`stylus`)})
        .pipe(debug({title: `stylus:`}))
        .pipe(plumber())
        .pipe(gulpIf(!IS_PROD, sourcemaps.init()))
            .pipe(stylus())
            .pipe(rename({basename: `main`, suffix: `.min`}))
            .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulpIf(!IS_PROD, sourcemaps.write()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATHS.dest.stylus))
        .pipe(browserSync.stream());
};

const assetsTask = () => {
    return gulp
        .src(PATHS.src.assets)
        .pipe(gulp.dest(PATHS.dest.assets))
        .pipe(browserSync.stream());
};

const imagesTask = () => {
    return gulp.src(PATHS.src.images)
        .pipe(plumber())
        .pipe(gulpIf(IS_PROD, imagemin()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(PATHS.dest.images))
        .pipe(browserSync.stream());
};

const watch = () => {
    browserSync.init(BROWSER_SYNC_CONFIG);
    gulp.watch(PATHS.src.html, htmlTask);
    gulp.watch(PATHS.src.js, jsTask);
    gulp.watch(PATHS.src.sass, sassTask);
    gulp.watch(PATHS.src.less, lessTask);
    gulp.watch(PATHS.src.stylus, stylusTask);
    gulp.watch(PATHS.src.assets, assetsTask).on(`change`, browserSync.reload);
    gulp.watch(PATHS.src.images, imagesTask).on(`change`, browserSync.reload);
};

gulp.task(`html`, htmlTask);
gulp.task(`js`, jsTask);
gulp.task(`sass`, sassTask);
gulp.task(`less`, lessTask);
gulp.task(`stylus`, stylusTask);
gulp.task(`images`, imagesTask);
gulp.task(`assets`, assetsTask);
gulp.task(`clean`, cleanTask);
gulp.task(`watch`, watch);
gulp.task(`build`, gulp.series(cleanTask, gulp.parallel(htmlTask, assetsTask, imagesTask, jsTask, sassTask, lessTask, stylusTask)));
gulp.task(`default`, gulp.series(`build`, watch));
