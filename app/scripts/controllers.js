(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.controllers', ['app.services'])
    .controller('Map', Map)
    .controller('PostListCtrl', PostListCtrl)
    .controller('PostDetailCtrl', PostDetailCtrl);

  /* @ngInject */
  function Map ($http) {
    this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    window.getStatus = function () {
      $http({
        method: 'GET',
        dataType: 'json',
        url: 'http://178.62.118.55:5000/',
      }).then(function successCallback(response) {
          console.log("success");

        }, function errorCallback(response) {
          console.log("error");

        });
    }
  }


  /* @ngInject */
  function PostListCtrl (Post) {
    this.posts = Post.query();
  }

  /* @ngInject */
  function PostDetailCtrl ($routeParams, Post, Comment, User) {
    this.user = {};
    this.post = {};
    this.comments = {};

    var self = this;

    Post.query({ id: $routeParams.postId })
      .$promise.then(
        function (value) {
          self.post = value[0];
          self.user = User.query({ id: self.post.userId });
        },
        function (error) {
          console.log('ERROR: ' + error);
        }
      );

    this.comments = Comment.query({ postId: $routeParams.postId });

  }

})();
