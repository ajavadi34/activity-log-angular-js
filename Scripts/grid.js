(function(){
    var app = angular.module('taskApp', []);

    app.directive("logGrid", function(){
        return {
            restrict: 'E',
            templateUrl: 'log-grid.html',
            controller: ['$http', '$scope', function($http, $scope){
        
                //Gives us access to this property inside of ajax success method
                var grid = this;
                //Initializes empty array to prevent errors
                grid.headers = [];
                grid.rows = [];
                grid.apiUrl = 'http://activitylogdemo.ajdrafts.com/Controller/TaskController.php'; // must enable cors for localhost development
                grid.filter = 0;

                grid.loadData = function(){
                    var data = {
                        params: { 
                            Type: grid.filter,
                            PageNumber: 1 // todo add paging support
                        }                        
                    };
                    
                    //Ajax request for table object to populate grid data
                    $http.get(grid.apiUrl, data).success(function(data){
                        //Assigns returned grid data to table property
                        grid.data = data;
                    }).error(function(response){
                        alert(response);
                    });
                }

                grid.showBlankModal = function(){
                    grid.record = null; //clear out record data for blank modal (used to show/hide type dropdown)
                    $('#grid-modal').modal('show');
                };

                grid.filterData = function(value){
                    grid.filter = value;
                    grid.loadData();
                };

                grid.isInsert = function(){
                    if (!grid.record || !grid.record.Id)
                        return true;
                    else
                        return false;                    
                };

                grid.cancel = function(){
                    $('#grid-modal').modal('hide');
                    grid.record = null;
                };

                grid.editLog = function(gridRow){
                    //Create date object to send to be properly formatted
                    var date = pageTools.parseDate(gridRow.Date);                    
                    grid.record = angular.copy(gridRow);
                    grid.record.Date = pageTools.getFormattedDate(date);

                    //$('#modal-date').datepicker('setDate', date);
                    $('#grid-modal').modal('show');
                };

                grid.deleteLog = function(logId){
                    var proceed = confirm("Are you sure you want to delete?");

                    if (proceed)
                    {
                        var request = $http.delete(grid.apiUrl, {data: {Id: logId}});

                        request.success(function(data){
                            $('#grid-modal').modal('hide');
                            grid.loadData();
                        });
                    }
                };

                grid.saveLog = function(){
                    if (!grid.record.Id)
                    {
                        //Insert Log
                        var task = 
                        {
                            TypeId: grid.record.Type,
                            Title: grid.record.Title,
                            Description: grid.record.Description,
                            Date: grid.record.Date
                        }

                        var request = $http.post(grid.apiUrl, task);

                        //Sends data over in json format
                        request.success(function(data){
                            $('#grid-modal').modal('hide');
                            grid.loadData();
                        });
                    }
                    else
                    {
                        //Update Log
                        var task = 
                        {
                            Id: grid.record.Id,
                            Title: grid.record.Title,
                            Description: grid.record.Description,
                            Date: grid.record.Date
                        }

                        var request = $http.put(grid.apiUrl, task);

                        //Sends data over in json format
                        request.success(function(data){
                            $('#grid-modal').modal('hide');
                            grid.loadData();
                        });
                    }

                    /*
                    //Sends data as normal name value pairs
                    $.ajax({ 
                        type: 'POST', 
                        url: '/ajdrafts/controller/taskcontroller.php',
                        data: task,
                        dataType: 'script' 
                    });*/
                };

                //Initial load
                grid.loadData();
            }],
            controllerAs: 'grid'
        };
    });
        
    /*
    app.controller("GridController", ['$http', function($http){
        
        //Gives us access to this property inside of ajax success method
        var grid = this;
        //Initializes empty array to prevent errors
        grid.table = [];

        //Ajax request for table object to populate grid data
        $http.get('/ajdrafts/controller/taskcontroller.php').success(function(data){
            //Assigns returned grid data to table property
            grid.table = data;
        }).error(function(response){
            alert(response);
        });

    }]);
    */
    
})();