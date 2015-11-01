(function () {
    'use strict';

    angular
        .module('app')
        .provider('provider', providerProvider);

    function providerProvider() {
        var configValue = false;

        this.setConfigValue = function (value) {
            configValue = value;
        };

        this.$get = providerFactory;

        providerFactory.$inject = ['$http'];
        function providerFactory($http) {
            var service = {
                getData: getData
            };

            return service;
            

            function getData() {                
                return configValue;
            }
        }
    }
})();