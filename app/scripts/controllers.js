(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.controllers', ['app.services'])
    .controller('Map', Map)
    .controller('PostListCtrl', PostListCtrl)
    .controller('PostDetailCtrl', PostDetailCtrl)
    .controller('trunckdetailsCtrl', trunckdetailsCtrl);

  /* @ngInject */
  function Map ($mdDialog) {
    this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    this.marker = {
      id: 0,
      coords: {
        latitude: 45,
        longitude: -73
      },
      options: {},
    };
      
    this.showAdvanced = function(ev) {
        $mdDialog.show({
            controller:trunckdetailsCtrl,
            templateUrl: '../views/trunck-details.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
    };
  }
    
    function trunckdetailsCtrl($scope){
        $scope.show = function(){
            console.log(this.trunck)
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
