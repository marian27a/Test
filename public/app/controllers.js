mainApp.controller("mainCtrl", ["$scope", "mainService", "$http", function ($scope, mainService, $http){
    $scope.workers = [];
    var self = this;
    self.currentId = "";
    $scope.searchValue = "";
    self.newWorker = {
        firsName: "",
        secondName: "",
        fatherName: "",
        gender: "Male",
        comeTime: "",
        goTime: ""
    };
    
    $scope.loadWorkers = function(){
            $http({
                    method: 'GET',
                    url: '/workers'
                    }).then(function(response){
                        $scope.workers = angular.fromJson(response).data;    
                    });
                };
    $scope.loadWorkers();
    
    this.addWorker = function(){
        mainService.addWorker(self.newWorker);
        var data = new Date().toISOString();
        self.newWorker.createdAt = data;
        $scope.workers.push(self.newWorker);
        $scope.loadWorkers();
        angular.element("#closeMod1").trigger('click');
        self.newWorker = self.newWorker = {
                firsName: "",
                secondName: "",
                fatherName: "",
                gender: "Male",
                comeTime: "",
                goTime: ""
        };
        
        $scope.addForm.$setPristine();
    };
    
    
    
    this.changeWorker = function(index, worker){
        self.currentWorker = {};
        self.currentIndex = index;
        for(var i in worker){
            self.currentWorker[""+i] = worker[""+i];
        };   
    };
    
    this.SaveChanges = function(){
        $scope.workers[self.currentIndex] = self.currentWorker;
        mainService.changeWorker(self.currentWorker);
        $scope.loadWorkers();
    };
    
    
    
    this.deleteWorker = function(index, worker){
        $scope.workers.splice(index, 1);
        mainService.removeWorker(worker);
        $scope.loadWorkers();
    }
    }]);

mainApp.filter("serchMatches", function(){
    return function(arr, str){
        if(angular.isArray(arr) && angular.isString(str)){
            var newArr = [];
            for (var i=0; i<arr.length; i++){
                var regexp = new RegExp(str, "i");
                if((arr[i]["firstName"].search(regexp)!=-1)||(arr[i]["secondName"].search(regexp)!=-1)){
                    newArr.push(arr[i]);
                };
            };
            return newArr
        } else{
            return arr
        };
    };
});
