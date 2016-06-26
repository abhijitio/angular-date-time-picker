datepicker = angular.module('datepicker', []);

datepicker.controller('dateTimePicker', ['$scope','$http', 'LandingData', '$filter', function($scope, $http, LandingData, $filter){
	

        $scope.showType = 1;
        $scope.selected = {};

        

        $scope.selectedTimeIndex = -1;
       
       
        

        $scope.selectDate = function(date) {
            
       
            $scope.showType = 2;
            
            
            LandingData.pdate.pdate = date;
           
            $scope.selectedMonthName = $filter('date')(date, 'dd MMM yyyy');
            getTimeValues();
            
            
        };
        
       

        $scope.selectTime = function(time, index) {
            $scope.selectedTimeIndex = index;

            //12 hrs to 24hr conversion
             
            // Get the digits from the string
            var b = time.match(/\d+/g);
            
            // Test whether it's am or pm, default to am
            var pm = /pm$/i.test(time);
            var h, m, s, v;
            var timeutc;
            var finalpicker;
            var datewithtime;

            // If no digits were found, return undefined
            if (!b) return;
 
            v = ('0' + ((pm? 12:0) + (b[0]%12))).slice(-2);
            if (v==23)
            v = v-12;
            else
            v = ('0' + ((pm? 12:0) + (b[0]%12))).slice(-2);            

            // Otherwise, convert the hours part to 24hr and two digits
              
            //h = ('0' + ((pm? 12:0) + (b[0]%12))).slice(-2);
            h=v;
              
            // Convert minutes part to two digits or 00 if missing
            //m = ('0' + (b[1] || 0)).slice(-2);
            m = ('0' + '0');

            // Convert seconds part to two digits or 00 if missing
            s = ('0' + (b[2] || 0)).slice(-2);

            // Return formatted string
            timeutc = h + ':' + m + ':' + s;
             
            //
            LandingData.ptime.ptime = timeutc;
            datewithtime = LandingData.pdate.pdate;
            datewithtime.setHours(h);
            console.log(datewithtime);
            
        };
        
       

        //END


        var getTimeValues = function() {
                LandingData.getTimeValues();
        }
        //getTimeValues();

        var bindScope = function() {
                $scope.timeValues = LandingData.timeValues;
        } 

       $scope.clickMonth = function (){
       $scope.selectedMonthName = $scope.monthName;
       $scope.showType = 1;
       }

        bindScope();
        
        //Date Picker START
  
        var date = new Date();
        var months = [],
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var tempMonth;
        tempMonth = date.getMonth();
        for (var i = 0; i <= 12; i++) {
            months.push(monthNames[tempMonth] + ' ' + date.getFullYear());
            tempMonth += 1;
            if (tempMonth >= 12) {
                tempMonth = 0;
                date.setFullYear(date.getFullYear() + 1);
            } 
        } 
        
       
        $scope.year =2016;
        $scope.changeMonth = function(steps) {
            if ($scope.monthIndex + steps >= 0 &&
            $scope.monthIndex + steps <= 12)
        {
            $scope.dateValues = [];
            $scope.monthIndex = $scope.monthIndex + steps;
            $scope.monthName = $scope.months[$scope.monthIndex];
            $scope.selectedMonthName = $scope.monthName;
            var date = new Date();
            var offset = date.getMonth();
            var offsetDate = offset + $scope.monthIndex;
            $scope.nDays = new Date( $scope.year,  offsetDate+1, 0).getDate();
            for (i = 1; i <= $scope.nDays; i++) {
                var d = new Date();
                d.setHours(0, 0, 0, 0); 
                var displayDate = new Date($scope.year,  offsetDate, i);
                if(displayDate >= d)
                $scope.dateValues.push(displayDate);
            }

        } else{console.log("missed")}
        
        $scope.showType =1;
         
  };

  $scope.monthIndex = 0;
  $scope.months = months;
  $scope.monthName = months[0];
  $scope.changeMonth(0);


}]);


//END

datepicker.factory('LandingData', [function(){
	return {
		//final structures which are bound to view
		//
		dateValues: [],
        timeValues: [],
        dtp: {dtp: null},
        ptime: {ptime: null},
        pdate: {pdate: null},

		//intermediate structures
		//
		

		//generates one hour slots between minTime and maxTime
		getTimeValues: function() {
                        var timeValues = this.timeValues;
                        timeValues.length = 0;
                        //var LandingData = this;
                        var minTime = 10; //vary this to change the first service slot available
                        var maxTime = 19; //vary this to chage the last service slot available
                        var string;
                        var pdate = this.pdate;
                         
                        var dn = new Date();
                        dn.setMinutes(0);
                        dn.setSeconds(0);
                        
                        var n;
                       
                        var nhour = dn.getHours();
                        n = nhour;
                        
                        if (n==minTime || n>minTime && pdate.pdate-dn<0) {
                        
                        for (var i = n+1; i < maxTime; i++) {
                            if(i<12) {
                                      lowersuffix = 'AM';
                                        startRange = i;
                                        }
                                        else if(i===12){
                                                lowersuffix = 'PM';
                                                startRange = i;
                                        }
                                        else {
                                                lowersuffix = 'PM';
                                                startRange = i - 12;
                                        }
                                if((i+1)<12) {
                                        uppersuffix = 'AM';
                                        endRange = (i+1);
                                        }
                                        else if((i+1)===12){
                                                uppersuffix = 'PM';
                                                endRange = (i+1);
                                        }
                                        else {
                                                uppersuffix = 'PM';
                                                endRange = (i+1) - 12;
                                        }
                              string = startRange + lowersuffix + '-' + endRange + uppersuffix;
                                timeValues.push(string);
                        };
                        }
                        else {
                        
                        for (var i = minTime; i < maxTime; i++) {
                            if(i<12) {
                                        lowersuffix = 'AM';
                                        startRange = i;
                                        }
                                        else if(i===12){
                                                lowersuffix = 'PM';
                                                startRange = i;
                                        }
                                        else {
                                                lowersuffix = 'PM';
                                                startRange = i - 12;
                                        }
                                if((i+1)<12) {
                                        uppersuffix = 'AM';
                                        endRange = (i+1);
                                        }
                                        else if((i+1)===12){
                                                uppersuffix = 'PM';
                                                endRange = (i+1);
                                        }
                                        else {
                                                uppersuffix = 'PM';
                                                endRange = (i+1) - 12;
                                        }
                                
                                string = startRange + lowersuffix + '-' + endRange + uppersuffix;
                                timeValues.push(string);  
                        };
                   }
                },
    //DTP END
	


	}
}]);
