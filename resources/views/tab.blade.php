<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Vue-Tab-Demo</title>
        <link rel="stylesheet" href="/css/app.css" media="screen" title="no title" charset="utf-8">
    </head>
    <body>
        {{-- Vue入口 --}}
        <div id='app'></div>
        <script type="text/javascript">
          // 转换 php 传来的数据，给 Tab.vue 文件使用
          @if(isset($allData))
              var allData = {!! json_encode($allData) !!};
          @endif
        </script>
        {{-- CDN --}}
        <script src="//cdn.bootcss.com/vue/1.0.26/vue.min.js"></script>
        {{-- 引进编译后的js文件 --}}
        <script src="{{ asset('/js/tab.js')}}" charset="utf-8"></script>
    </body>
</html>
