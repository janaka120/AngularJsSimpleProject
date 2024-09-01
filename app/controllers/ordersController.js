(function() {
    
    var OrdersController = function ($scope, $routeParams, customersFactory) {
        var customerId = $routeParams.customerId;
        $scope.orders = null;
        $scope.customer = null;
    
        function init() {
            //Search the customers for the customerId
            var customer = customersFactory.getCustomer(customerId);
            $scope.customer = customer;
        }
        
        init();
    };
    
    OrdersController.$inject = ['$scope', '$routeParams', 'customersFactory'];

    angular.module('customersApp')
      .controller('OrdersController', OrdersController);
    
}());