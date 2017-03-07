'use strict';

mainApp.service('mainService', ['$http', function($http){
    
                this.addWorker = function(worker){
                    $http({
                        method: 'POST',
                        url: '/workers',
                        data: JSON.stringify(worker),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                 };
    
                 this.removeWorker = function(worker){
                    $http({
                        method: 'DELETE',
                        url: '/workers/'+worker._id,
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                 };
                
                 this.changeWorker = function(worker){
                    $http({
                         method: 'PUT',
                        url: '/workers/'+worker._id,
                        headers: {
                            'Content-type': 'application/json'
                        },
                        data: worker
                    })
                 };
}]);