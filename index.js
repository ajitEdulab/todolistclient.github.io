var app = angular.module("todoApp", []);
app.controller('myCtrl', function ($rootScope, $scope, $http, $window) {
  $scope.taskDetails = { taskName: '', Name: '', Created: '', RequiredTime: '', Action:false };

  $scope.taskList = [];
  $scope.NO = 1;
  $scope.editShow =false;
  
  //  $scope.add = function(ex) {

  //     console.log("example", ex);

  //     $scope.taskList.push(ex);
  //     console.log( $scope.taskList);
  //     // console.log("time", Date.now());
  //     $scope.taskDetails={taskName:'',name:'',created:'',requiredT:'',check :''};
  //   }


  //****************************** get data on loading page******************************************
  $window.onload = function () {
    $http.get("http://localhost:3000/api/getTask")
      .then(function (response) {
        // console.log('heyyy', response);

        $scope.myWelcome = response.data;

        // console.log('response', $scope.myWelcome);
        $scope.taskList = $scope.myWelcome;
        // $scope.taskList.push($scope.myWelcome);
        console.log("TaskList", $scope.taskList);
      });

  };


  // ****************************** Post Data on add button*****************************

  $scope.add = function (ex) {
    console.log("example", ex);
    // $scope.taskList.push(ex);
    // console.log( $scope.taskList);
    $http.post("http://localhost:3000/api/add", { msg: ex })
      .then(function (response) {
        console.log('heyyy', response);

        $scope.myWelcome = response.data;
        console.log('post response', $scope.myWelcome);
        $scope.taskList.push($scope.myWelcome);
        console.log("post TaskList", $scope.taskList);
      });
    $scope.taskDetails = { taskName: '', Name: '', Created: '', RequiredTime: '', Action: false };
  }



  //********************* Data get on Action selection *************************
  
  $scope.act = function (no) {
    console.log("innnnnn", no);

    $scope.NO = no;
    console.log("innnnnn", $scope.NO);
    $http.get("http://localhost:3000/api/getTask")
      .then(function (response) {
        // console.log('heyyy', response);

        $scope.myWelcome = response.data;

        // console.log('response', $scope.myWelcome);
        $scope.taskList = $scope.myWelcome;
        // $scope.taskList.push($scope.myWelcome);
        console.log("TaskList", $scope.taskList);
      });

  }

//**************** Update check status (pending) *************************/

  $scope.getChecked= function(xObj){
    // console.log("selected object",xObj);
    $http.put("http://localhost:3000/api/update", { id:xObj._id,act:xObj.Action})
      .then(function (response) {
        // console.log('response ....!!', response);
        $scope.act("1")
      });
  }


//*************************** Delete Task ****************************

$scope.deleteTask= function(DelObj){
  console.log("deleted object",DelObj);

  let options = { params: DelObj };

  $http.delete("http://localhost:3000/api/Delete",options)
      .then(function (response) {
        console.log('response ....!!', response);
        $scope.myWelcome = response.data;
        console.log('myWelcome', $scope.myWelcome);
        // $scope.taskList.push($scope.myWelcome);
        // console.log("TaskList", $scope.taskList);
        $scope.act("1")
      });
}

/************************** Edit Task****************************/

$scope.editTask = function(editObj){
  console.log("edit object",editObj);
$scope.editShow =true;
 $scope.taskDetails = editObj;

}

$scope.Changes = function(changeObj){
  console.log("Changes object",changeObj);

  $http.put("http://localhost:3000/api/saveEdit",{change:changeObj})
  .then(function (response) {
  // console.log('response ....!!', response);
  $scope.editShow =false;
  $scope.taskDetails = { taskName: '', Name: '', Created: '', RequiredTime: '', Action: false };
    $scope.act("1")

  });
}

  /************** for Current Time Date  */
  // $scope.getTime=function(){
  //   var date =new Date();
  //   console.log("date",date.getHours()+"."+date.getMinutes()+"  "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());
  //   $scope.taskDetails.Created = date.getHours()+"."+date.getMinutes()+"  "+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  //   console.log("time",$scope.taskDetails.Created);
  // }


})