(function () {
  var OrderListController = function ($scope, orderListFactory) {
    $scope.orderList = null;
    $scope.ordersTotal = 0.0;
    $scope.totalType;

    function init() {
      //Search the customers for the customerId

      orderListFactory
        .getOrders()
        .success(function (orders) {
          $scope.orderList = orders;
          getOrdersTotal()
        })
        .error(function (data, status, headers, config) {
            $log.log(data.error + ' ' + status);
        });
    }

    function getOrdersTotal() {
      var total = 0;
      for (var i = 0; i < $scope.orderList.length; i++) {
        total += $scope.orderList[i].total;
      }

      $scope.ordersTotal = total;
      $scope.totalType = ($scope.ordersTotal > 100) ? 'success': 'danger'
    }

    init();
  };

  OrderListController.$inject = ["$scope", "orderListFactory"];

  angular
    .module("customersApp")
    .controller("OrderListController", OrderListController);
})();
