var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    // 将 Vue.js 转为普通 js 文件
    mix.browserify('entries/hello.js', 'public/js/hello.js');
    mix.browserify('entries/tab.js', 'public/js/tab.js');

    // 实时监听文件，不需要可以不用
    mix.browserSync({
        proxy: 'vue.demo.aevit.xyz', // 你的本地域名
        port: 3000,
        notify: false,
        watchTask: true,
        open: 'external',
        host: 'vue.demo.aevit.xyz', // 你的本地域名
    });
});
