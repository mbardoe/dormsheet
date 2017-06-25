function clearCells() {
  findAdvisor();// puts the adviser's on duty name on the sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  //var dataSs = SpreadsheetApp.openById("1AVjU82tSTUzOFphL6YfIZ1OhZORQT7JCrcQQp8TqD");
  //var dataSheet = dataSs.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  //Before changes are made record the details on another sheet
  var time = new Date(Date.now());
  Logger.log("I think the day is:");
  Logger.log(time);
  // prepare to copy the sheet so that it will be easy to find in future
  var DaysOfWeek= new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat");
  var numDay=time.getDay()-1;
  if (numDay==-1)
  {
    numDay=6;
  }
    
  var day= DaysOfWeek[numDay];
  Logger.log(day);
  var daySheet = ss.getSheetByName(day);
  Logger.log(daySheet.getSheetId());
  
  
  //var dayDataRange=sheet.getDataRange();
  sheet.getDataRange().copyTo(daySheet.getRange("A1"),{contentsOnly:false});
  //dayDataRange.setValues(data);
  // now clear stuff out
  for (var i = 3; i < data.length; i++) {
    //Logger.log("Product name: " + data[i][0]);
    //Logger.log("Product number: " + data[i][1]);
    for (var j = 2; j< 8; j++){
      var x="";
      data[i][j]=x;
    }
  }
  //var time = new Date(Date.now());
  //Logger.log(time.toDateString());
  data[0][1]=time.toDateString();
  
  var day= time.toDateString().slice(0,3);
  Logger.log("This is what the date should read");
  Logger.log(data[0][1]);
  
  var dataRange = sheet.getDataRange();
  dataRange.setValues(data);
  var time = Date.now();
  //Logger.log(time);
  
  
}

function createSheets(){
  var x=new Date();
  Logger.log(x.toDateString());
  
}

function dateTest(){
  var time = new Date(Date.now());
  Logger.log(time.toDateString());
}

//Checks if a given date string is in
// one of the valid formats:
// a) M/D/YYYY format
// b) M-D-YYYY format
// c) M.D.YYYY format
// d) M_D_YYYY format
function isDate(s)
{  
  // make sure it is in the expected format
  if (s.search(/^\d{1,2}[\/|\-|\.|_]\d{1,2}[\/|\-|\.|_]\d{4}/g) != 0)
     return false;
 
  // remove other separators that are not valid with the Date class   
  s = s.replace(/[\-|\.|_]/g, "/");
 
  // convert it into a date instance
  var dt = new Date(Date.parse(s));    
 
  // check the components of the date
  // since Date instance automatically rolls over each component
  var arrDateParts = s.split("/");
     return (
         dt.getMonth() == arrDateParts[0]-1 &&
         dt.getDate() == arrDateParts[1] &&
         dt.getFullYear() == arrDateParts[2]
     );  
}

function findAdvisor(){
  var dataSs = SpreadsheetApp.openById("1AVjU82tSTUzOFphL6YfIZ1OhZORQT7JCrcQQp8TqD-E"); // Open the spreadsheet from its id
  var today = new Date(Date.now()); // get today's date for comparison
  var dataSheet = dataSs.getSheetByName("Duty Schedule"); // get the third sheet in this case it is the one with the duty schedule
  Logger.log(today);
  var data = dataSheet.getDataRange().getValues();  // get the values in the sheet
  // Go through the spreadsheet and look for todays date then grab the cell directly below as the advisor on duty.
  for (var i = 0; i < data.length; i++) {    
    for (var j = 0; j< 8; j++){
      Logger.log("Data: " + data[i][j]+ " "+i+" "+j);
      if (data[i][j].getMonth){
        if ((data[i][j].getMonth()==today.getMonth())&&(data[i][j].getDate()==today.getDate())&&(data[i][j].getYear()==today.getYear())){
            Logger.log("Data: " + data[i][j]+ " "+i+" "+j);
            Logger.log("This is a date.");
            var advisor=data[i+1][j];
            Logger.log("Advisor= "+data[i+1][j]);
        }
      }
    }
  }
  // Get the sign in sheet
  var sheet = dataSs.getSheets()[0];
  // get the values 
  var data = sheet.getDataRange().getValues();
  // change the value of the advisor cell
  data[0][2]=advisor;
  // get the data range
  var dataRange = sheet.getDataRange();
  // reset the values with the updated values
  dataRange.setValues(data);
  
}

