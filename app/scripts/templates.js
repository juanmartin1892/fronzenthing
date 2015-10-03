angular.module("blog.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/map.tpl.html","<div id=\"map\"></div>");
$templateCache.put("views/post-detail.tpl.html","<article class=\"blog-post\">\r\n  <header class=\"blog-post-header\">\r\n    <h1>{{ postdetail.post.title }}</h1>\r\n  </header>\r\n  <p class=\"blog-post-body\">\r\n    {{ postdetail.post.body }}\r\n  </p>\r\n  <p>\r\n    Escrito por: <strong>{{ postdetail.user[0].name }}</strong>\r\n      <span class=\"fa fa-envelope\"></span> {{ postdetail.user[0].email }}\r\n  </p>\r\n</article>\r\n<hr>\r\n<aside class=\"comments\">\r\n  <header class=\"comments-header\">\r\n    <h3><span class=\"fa fa-comments\"></span> Comments</h3>\r\n  </header>\r\n  <ul class=\"comments-list\">\r\n    <li class=\"comment-item\" ng-repeat=\"comment in postdetail.comments\">\r\n      <span class=\"fa fa-user\"></span> <span class=\"comment-author\">{{ comment.email }}</span>\r\n      <p class=\"comment-body\">\r\n        {{ comment.body }}\r\n      </p>\r\n    </li>\r\n  </ul>\r\n</aside>\r\n");
$templateCache.put("views/post-list.tpl.html","<md-button class=\"md-fab\" aria-label=\"Eat cake\">\r\n    Test\r\n</md-button>\r\n <ul class=\"blog-post-list\">\r\n  <li class=\"blog-post-link\" ng-repeat=\"post in postlist.posts\">\r\n    <a ng-href=\"{{ post.id }}\">{{ post.title }}</a>\r\n  </li>\r\n</ul>\r\n");}]);