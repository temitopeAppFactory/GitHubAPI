angular.module("GitApp", [])
      .controller('GitCtrl', function ($scope, $http) {
      $scope.getGitInfo = function () {
         $scope.userNotFound = false;
         $scope.loaded = false;

         $http.get("https://api.github.com/users/" + $scope.username)
               .success(function (data) {
                  if (data.name == "") data.name = data.login;
                  $scope.user = data;
                  $scope.loaded = true;
               })
               .error(function () {
                  $scope.userNotFound = true;
               });
         $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
         });

         $http.get("https://api.github.com/users/repos" + $scope.username + $scope.repo + "/commits").success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
         });
      };

      
       $scope.getCommits = function(repo) {
      $http.get("https://api.github.com/repositories/" + repo.id + "/commits").success(function(data) {
        repo.commits = data;
        repo.showcommits = true;
      })
    };

    $scope.hideCommits = function(repo) {
      $http.get("https://api.github.com/repositories/" + repo.id + "/commits").success(function(data) {
        repo.commits = data;
        repo.showcommits = false;
      })
    };
   });