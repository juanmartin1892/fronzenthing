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
  function Map ($http, $mdDialog) {
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
      var that = this;
      window.getStatus = function () {
        var trunck = localStorage.getItem("trunck");
        if (trunck) {
          trunck = JSON.parse(trunck);          
          $http({
            method: 'GET',
            dataType: 'json', 
            url: 'http://178.62.118.55:5000/',
          }).then(function successCallback(response) {
              var attributes = response.data.contextElement.attributes;
              var id = response.data.contextElement.id;
              var cellid = _.findWhere(attributes, {name: "cellid"});

              var temperature = parseInt(_.findWhere(attributes, {name: "temperature"}).value);
              var humedity = parseInt((_.findWhere(attributes, {name: "humidity"}).value/2)/10000);

              var marker = getMarker(trunck, id, 37.16,-3.6, temperature, humedity);

              var markerTrunckIndex = _.findIndex(that.markers, {id:trunck.id});
              if (markerTrunckIndex == -1) {
                that.markers.push( marker );
              }
              else {              
                that.markers[markerTrunckIndex] = marker;
              }

            }, function errorCallback(response) {
              console.log("error");

            });
        }
      }
      
      //Marker: {"id":3,"icon":"assets/images/blue_marker.png","latitude":35,"longitude":-125,"showWindow":true,"options":{"labelContent":"[35,-125]","labelAnchor":"22 0","labelClass":"marker-labels"},"show":true} 
      this.onClick = function(marker) {
            marker.windowOptions.visible = marker.windowOptions.visible;
        };
      this.closeClick = function(marker) {
            marker.windowOptions.visible = false;
        };
      
    this.markers = [  
        {
          id: 2,
          coords: {
            latitude: 36.7,
            longitude: -4.3
          },
          options: {icon:'../pics/punto-mapa_NARANJA.png'},
        windowOptions: {visible: false},
            datas:{
                tag: 'Córdoba',
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
                longitude: -4.5
            },
            options: {icon:'../pics/punto-mapa_VERDE.png'},
            windowOptions: {visible: false},
            datas:{
                tag: 'Málaga',
                temperatureMin: -10,
                temperatureMax: 10,
                humedityMin: 40,
                humedityMax: 50,
                temperature: 45,
                humedity: 48,
                temperatureAsc: 0,
                humedityAsc: 1,
                latitude: 37.6,
                longitude: 4.3
            }
        }/*,
        {
            id: 'HM9PKJ',
            coords: {
             latitude: 37.16,
             longitude: -3.6
            },
            options: {icon:'../pics/punto-mapa_NARANJA.png'},
            windowOptions: {visible: false},
            datas:{
                tag: 'Granada',
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
        }*/
    ];

    setInterval(getStatus, 3000);

    function getMarker (trunck, id, lat, lng, temperature, humedity, color) {
      var color = "VERDE";
      if (temperature < trunck.temperatureMin || temperature > trunck.temperatureMax)
        color = "ROJO";
      return {
        id: id,
        coords: {
          latitude: lat,
          longitude: lng
        },
        options: { icon: '../pics/punto-mapa_' + color + '.png'},
        windowOptions: {visible: true},
        datas: {
          tag: 'Madrid',
          temperature: temperature,
          humedity: humedity,
        }
      };

    }
  }
  
    
    function trunckdetailsCtrl($scope, $mdDialog){
        $scope.show = function(){
            var trunckStr = JSON.stringify($scope.trunck);
            localStorage.setItem("trunck", trunckStr);
            $mdDialog.hide();
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
