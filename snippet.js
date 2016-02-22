// https://www.bram.us/2015/03/19/geofencing-for-the-web/

navigator.serviceWorker.register('serviceworker.js').then(
  function(serviceWorkerRegistration) {
    serviceWorkerRegistration.geofencing.add(
        new CircularGeofenceRegion({
          name: "myfence",
          latitude: 37.421999,
          longitude: -122.084015,
          radius: 1000
        }), {includePosition: true}).then(
      function(geofence) {
        console.log(geofence.id);
        // If more than just a name needs to be stored with a geofence, now
        // would be the time to store this in some storage.
      }, function(error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
      }
    );
  });
