(function () {
  'use strict';

  /* @ngInject */
  angular
    .module('app.controllers', ['app.services'])
    .controller('Map', Map)
    .controller('PostListCtrl', PostListCtrl)
    .controller('PostDetailCtrl', PostDetailCtrl);

  /* @ngInject */
  function Map () {
    var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
          '&signed_in=true&callback=onloadedMap'; 
      document.body.appendChild(script);

    window.onloadedMap = function() {
      google.maps.event.addDomListener(window, 'load', initializeMap);

      function initializeMap() {
        var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(37.988444,-0.678717)
        }
        var map = new google.maps.Map(document.getElementById('map'),
                                      mapOptions);

      }

      function addMarker(lat, long) {        
        var image = '/img/mapIcon.png';
        var myLatLng = new google.maps.LatLng(lat, long); // 37.988444,-0.678717
        var marker = new google.maps.Marker({
            position: myLatLng,            
            map: map,
            icon: {
              origin: { x: 0, y: 0 }, 
              size: {width: 69, height:40},
              //url: image
            },
            // Define the place with a location, and a query string.
            place: {
              location: {lat: 37.988444, lng: -0.678717},
              query: 'Pescados Juaso SL, TORREVIEJA Alicante'

            },
            // Attributions help users find your site again.
            attribution: {
              source: 'Pescados Juaso sL. Mayoristas de Pescado en Torrevieja (Alicante).',
              webUrl: 'http:/www.juaso.es'
            }
        });
        google.maps.event.addListener(marker, 'click', toggleBounce);

        var infowindow = new google.maps.InfoWindow({
          content: 'Pescados JUaso SL'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        //http://maps.google.es/maps/ms?msa=0&amp;msid=214450084566970681320.0004ab43ca33e51f526e8&amp;ie=UTF8&amp;t=h&amp;vpsrc=0&amp;ll=37.836259,-0.791219&amp;spn=0.001313,0.002135&amp;z=17&amp;output=embed
        //http://maps.google.es/maps?f=q&source=s_q&hl=es&geocode=&q=Congelados+Sariego+S.L.,+Calle+Torrevieja,+Pola+de+Siero&aq=0&oq=Congelados+Sarieg&sll=43.394508,-5.657229&sspn=0.007843,0.01929&ie=UTF8&hq=congelados+sariego+sl+calle+torrevieja&hnear=Pola+de+Siero,+Principado+de+Asturias&t=m&cid=7447451315906609324&ll=43.399248,-5.654526&spn=0.024945,0.030041&z=14&iwloc=A&output=embed
        function toggleBounce() {

          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
      }


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
