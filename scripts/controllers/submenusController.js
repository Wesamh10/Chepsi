(function () {
    'use strict';
    angular.module('GMA').controller('SubmenusController', function($scope, api, menuHandler, $stateParams) {
        api.menus.submenus($stateParams.id).then(function(data) {
            $scope.menu = data;
            _.map($scope.menu.Children, function (menuItem) {
                var templateId = "0";
                if (menuItem.TemplateId != null)
                    templateId = menuItem.TemplateId;
                menuItem.menuIcon = "images/" + $scope.ThemeCssClass + "/" + templateId + ".png";
                return menuHandler.mapMenuTemplateRoute(menuItem);
            });
        });
    });
})();
