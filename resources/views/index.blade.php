<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello-Vue</title>
    </head>
    <body>
        {{-- Vue入口 --}}
        <div id='app'></div>
        {{-- CDN --}}
        <script src="//cdn.bootcss.com/vue/1.0.26/vue.min.js"></script>
        {{-- 引进编译后的js文件 --}}
        <script src="{{ asset('/js/hello.js')}}" charset="utf-8"></script>

        {{-- 多标签切换示例 --}}
        <div style="margin-top: 50px;">
          <a href="/tab" target="_blank">multi tab demo</a>
        </div>
    </body>
</html>
