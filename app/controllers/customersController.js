//Option 1

/*app.controller('CustomersController', function ($scope) {
    $scope.sortBy = 'name';
    $scope.reverse = false;
    
    $scope.customers= [{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}];
    $scope.doSort = function(propName) {
       $scope.sortBy = propName;
       $scope.reverse = !$scope.reverse;
    };
});*/

//Option 2

/*(function() {

    angular.module('customersApp')
      .controller('CustomersController', function ($scope) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        
        $scope.customers= [{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}];
        $scope.doSort = function(propName) {
           $scope.sortBy = propName;
           $scope.reverse = !$scope.reverse;
        };
    });
    
}());*/

//Option 3

(function () {
  var CustomersController = function ($scope, $log, customersFactory, appSettings) {
    $scope.sortBy = "name";
    $scope.reverse = false;
    $scope.customers = [];
    $scope.appSettings = appSettings;

    function init() {
      customersFactory
        .getCustomers()
        .success(function (customers) {
          $scope.customers = customers;
        })
        .error(function (data, status, headers, config) {
          $log.log(data.error + ' ' + status);
        });
    }

    init();

    $scope.doSort = function (propName) {
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };

    // $scope.deleteCustomer = function(cusId) {
    //   customersFactory
    //   .deleteCustomer(cusId)
    //   .success(function(res) {
    //     if(res.status) {
    //       const customersList = $scope.customers;
    //       for (var i = 0, len =  $scope.customers.length; i < len; i++) {
    //         if ($scope.customers[i].id === cusId) {
    //           customersList.splice(i, 1);
    //           break;
    //         }
    //       }
    //       $scope.customers = customersList;
    //     }
    //   })
    // }
    $scope.deleteCustomer = function(cusId) {
      customersFactory
      .deleteCustomer(cusId)
      .success(function(res) {
        console.log("res >>", res);
        if(res.status) {
          init();
        }
      })
    }
  };

  CustomersController.$inject = ["$scope", "$log", "customersFactory", "appSettings"];

  angular
    .module("customersApp")
    .controller("CustomersController", CustomersController);
})();
