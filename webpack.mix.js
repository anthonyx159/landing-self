let mix = require("laravel-mix");
mix.pug = require('laravel-mix-pug');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
// Change setPublicPath to set where the .cshtml get the public access
// Change setResourceRoot to set the URL for assets
let fs = require('fs');
function mix_multiple(folder,method,srcExt,outputExt) {
    const paths = fs.readdirSync(folder);
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].indexOf('.'+ srcExt) > 0 && paths[i].charAt(0) !== '_') {
            const file_path = folder + paths[i];
            mix[method](file_path, outputExt);
        }
    }
}

mix_multiple("src/sass/pages/home/","sass","scss","css");
mix_multiple("src/js/","js","js","js");

mix
    .copy('src/images/static/*', "dist/images/static")
    .pug('src/pug/pages/home/*.pug', '../../../../dist', {
        pug: {
            pretty: false,
            debug: false
        }
    })
    .options({ processCssUrls: false })
    .setPublicPath('dist')
    .disableSuccessNotifications();
