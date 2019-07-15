mapboxgl.accessToken = 'pk.eyJ1IjoibWRrYXJyMDEiLCJhIjoiY2p4b3Zma2g5MGI1ZDNscXVtYjNjcjR6ZyJ9.Jx5abht67MVH6IP6khTtSQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: post.coordinates,
  zoom: 5
});


// create a HTML element for our post coordinages/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(new mapboxgl.Popup({
    offset: 25
  }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
  .addTo(map);

//Togggle edit form
$('.toggle-edit-form').on('click', function () {
  $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
  $(this).siblings('.edit-review-form').toggle();
});

$('.clear-rating').click(function () {
  $(this).siblings('input-no-rate').click();
});