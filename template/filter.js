(function () {
    'use strict';

    angular
        .module('app')
        .filter('filter', filter);
    
    function filter() {
        return filterFilter;

        function filterFilter(input) {
            return input;
        }
    }
})();