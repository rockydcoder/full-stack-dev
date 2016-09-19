var app = angular.module('myApp', []);
app.controller('myCtrl', ['$resource', '$scope', function($scope, $resource) {
 $scope.formData = {};
 $http({
  method: 'GET',
  url: '/api.tasks'
}).then(function successCallback(response) {
    $scope.tasks = data;
  }, function errorCallback(response) {
    console.log('Error: ' + response);
  });
 });

 $scope.createTask = function() {
 	$http({
  method: 'POST',
  data: $scope.formData
  url: '/api/tasks'
}).then(function successCallback(response) {
    $scope.formData = {};
$scope.tasks = response;
 console.log(response);
  }, function errorCallback(response) {
    console.log('Error: ' + response);
  });
 };
 
 $scope.deleteTask = function(id) {
 $http({
  method: 'DELETE',
  data: $scope.formData
  url: '/api/tasks/' + id
}).then(function successCallback(response) {
    $scope.tasks = response;
  }, function errorCallback(response) {
    console.log('Error: ' + response);
  });
 };
}]);