(function () {
    'use strict';
    angular.module('GMA').controller('MainController', function ($scope, api, $ionicSideMenuDelegate, menuHandler, $rootScope, serverUrlHandler, storage) {
        $scope.isIos = ionic.Platform.isIOS();
        $scope.ThemeCssClass = storage.data.ThemeCssClass;
        $scope.directionClass = "";
        $scope.directionAttr = "left";
        if (storage.data.IsRightToLeft == true) {
            $scope.directionClass = "rtl";
            $scope.directionAttr = "right";
        }

        serverUrlHandler.resolve();

        // show error if exist
        $scope.error = false;
        $scope.$watch(function () { return $rootScope.hasError; }, function () {
            $scope.hasError = $rootScope.hasError;
            $scope.error = $rootScope.error;
        }, true);


        $scope.toggleMenu = function () {
            if (storage.data.IsRightToLeft == true) {
                $ionicSideMenuDelegate.toggleRight();
            } else {
                $ionicSideMenuDelegate.toggleLeft();
            }
        };

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
            var backToSponsors = from.name != "clientInfo" && to.name == "sponsors";
            if (backToSponsors) {
                // when going to sponsors by back button
                navigator.app.exitApp();
            }
        });


        api.menus.all().then(function (data) {
            // list menu items in the menu side bar
            $scope.menus = data.MenuItems;
            _.map($scope.menus, function (menuItem) {
                var templateId = "0";
                if (menuItem.TemplateId != null)
                    templateId = menuItem.TemplateId;
                menuItem.menuIcon = "images/" + $scope.ThemeCssClass + "/" + templateId + ".png";
                return menuHandler.mapMenuTemplateRoute(menuItem);
            });

        });
    });
})();
