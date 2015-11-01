(function () {
    'use strict';

    angular
        .module('app')
        .service('service', service);

    service.$inject = ['$http'];

    function service($http) {
        this.getData = getData;

        function getData() { }
    }
})();