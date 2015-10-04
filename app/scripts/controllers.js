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
    this.map = { center: { latitude: 37, longitude: -3 }, zoom: 8 };
    
      
    this.showAdvanced = function(ev) {
        $mdDialog.show({
            controller:trunckdetailsCtrl,
            templateUrl: '../views/trunck-details.tpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
    };
      
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
      
    this.camiones = 
        [
            {
            id: 'uk43892',
            tag: 'Comion123',
            temperatureMin: -10,
            temperatureMax: 10,
            humedityMin: 40,
            humedityMax: 50,
            currentStatus: {
                temperature: 45,
                humedity: 48,
                temperatureAsc: 0,
                humedityAsc: 1,
                latitude: 37.16,
                longitude: -3.6
                }
            }
        ];
      //Marker: {"id":3,"icon":"assets/images/blue_marker.png","latitude":35,"longitude":-125,"showWindow":true,"options":{"labelContent":"[35,-125]","labelAnchor":"22 0","labelClass":"marker-labels"},"show":true} 
      this.onClick = function(marker) {
            marker.windowOptions.visible = marker.windowOptions.visible;
        };
      this.closeClick = function(marker) {
            marker.windowOptions.visible = false;
        };
      
    this.markers = [  
        {
            id: 0,
            coords: {
            latitude: this.camiones[0].currentStatus.latitude,
            longitude: this.camiones[0].currentStatus.longitude,
          },
            options: {icon:'../pics/punto-mapa_VERDE.png'},
            windowOptions: {visible: false},
            datas:{
                tag: 'Comion123',
                temperatureMin: -10,
                temperatureMax: 10,
                humedityMin: 40,
                humedityMax: 50,
                temperature: 45,
                humedity: 48,
                temperatureAsc: 0,
                humedityAsc: 1,
                latitude: 37.16,
                longitude: -3.6
            }
        },
        {
          id: 2,
          coords: {
            latitude: 37.5,
            longitude: -4
          },
          options: {icon:'../pics/punto-mapa_ROJO.png'},
        },
        {
          id: 2,
          coords: {
            latitude: 37.2,
            longitude: -4.3
          },
          options: {icon:'../pics/punto-mapa_NARANJA.png'},
        }
    ]
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
