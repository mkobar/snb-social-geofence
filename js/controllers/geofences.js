angular.module("ionic-geofence").controller("GeofencesCtrl", function (
    $scope,
    $ionicActionSheet,
    $timeout,
    $log,
    $state,
    Geolocation,
    Geofence,
    $ionicLoading
) {
    $ionicLoading.show({
        template: "Getting geofences from device...",
        duration: 5000
    });

    $scope.geofences = [];

    Geofence.getAll().then(function (geofences) {
        $ionicLoading.hide();
        $scope.geofences = geofences;
    }, function (reason) {
        $ionicLoading.hide();
        $log.error("An Error has occured", reason);
    });

    $scope.createNew = function () {
        $log.log("Obtaining current location...");
        $ionicLoading.show({
            template: "Obtaining current location...",
            hideOnStateChange: true
        });
        Geolocation.getCurrentPosition()
            .then(function (position) {
                $log.info("Current position found", position);

                $state.go("geofence-new", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, function (reason) {
                $log.error("Cannot obtain current location", reason);
                $ionicLoading.show({
                    template: "Cannot obtain current location",
                    duration: 1500
                });
            });
    };

    $scope.editGeofence = function (geofence) {
        $state.go("geofence-edit", {
            geofenceId: geofence.id
        });
    };
});
