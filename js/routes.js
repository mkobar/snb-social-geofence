angular.module("ionic-geofence").config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("geofences", {
            url: "/geofences",
            templateUrl: "views/geofences.html",
            controller: "GeofencesCtrl"
        })
        .state("geofence-new", {
            url: "/geofence/new/:longitude,:latitude",
            templateUrl: "views/geofence.html",
            controller: "GeofenceCtrl",

            resolve: {
                geofence: function ($stateParams, Geofence) {
                    return Geofence.create({
                        longitude: parseFloat($stateParams.longitude),
                        latitude: parseFloat($stateParams.latitude)
                    });
                }
            }
        });

    $urlRouterProvider.otherwise("/geofences");
});
