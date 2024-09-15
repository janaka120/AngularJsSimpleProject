(function () {
  var orderListFactory = function ($http) {

    function getOrders() {
      return $http.get('http://localhost:5500/orders');
    }

    var factory = {
      getOrders: getOrders,
    };
    return factory;
  };

  orderListFactory.$inject = ['$http'];

  angular.module("customersApp").factory("orderListFactory", orderListFactory);
})();
