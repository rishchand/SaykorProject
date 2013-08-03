/*****************************************/
/***************LOGIN*********************/
/*****************************************/
function LoginAndLoadGrid() {
    $.epic.login(
        "rthompson",
        "",
        function (ret) {
            if (ret.response.success) {
                role = ret.response.result;
                loginSessionContext = ret.response.sessionContext;
                LoadPatientData();
            }
            else {
                alert("Login Error");
            }
        });
}

/*****************************************/
/***************READ**********************/
/*****************************************/
function LoadPatientData() {
    screenData.length = 0;
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'GetView';
    var dataParam = {};
    dataParam.viewDesignName = "dev_patient";
    dataParam.viewName = "patientsbyid";

    // 1. Call Database
    $.epic.query(prefix, fname, dataParam, function (ret) {
        
        if (ret.response.success) {
            if (ret.response.result == "") {
                alert("There are no records in the database");
            }
        }
        else {
            alert("view all patient failed");
        }

        // 2. Parse the response
        var resp = JSON.parse(ret.response.result);
        //alert(JSON.stringify(resp[1]));
        for (var i = 0; i < resp.length; i++) {
            var row = {};
            var keys = Object.keys(resp[i]);
            //alert(keys.toString());
            for (var j = 0; j < keys.length; j++) {
                row[keys[j]] = resp[i][keys[j]];
            }
            screenData[i] = row;
        }

        // 3. Bind to grid 
        BindData2Grid(screenData);
    });

    /*// Initialize the data here
    InitializeData();
    // 3. Bind to grid (SCreen data comes from the temp.js
    BindData2Grid(screenData);*/
}

/*****************************************/
/***************CREATE/UPDATE*************/
/*****************************************/
function CreateNewPatientRecord(id, newRow, datacontent) {
    var prefix = 'Values';
    var fname = 'InsertData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.patients" + sign + id;

    // 1. Call Database
    $.epic.insert(prefix, fname, displayName, datacontent,
        function (data) {
            alert(JSON.stringify(data));
            if (!data.response.success) {
                alert("Add failed");
                return;
            }
            else {
                // 2. Get the id if its a new row
                if (newRow) {
                    id = data.response.result;
                    alert(id);
                }
                // 3. Bind to grid
                UpdateGridData(id);
            }
            ProgressBar('hide');
        });
}

/*****************************************/
/***************DELETE*********************/
/*****************************************/
function DeletePatientRecord(patientID) {
    var prefix = 'Values';
    var fname = 'DeleteData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.patients" + sign + patientID;

    $.epic.delete(prefix, fname, displayName,
        function (data2) {
            alert(JSON.stringify(data2));
            if (!data2.response.success) {
                alert("delete failed");
                ProgressBar('hide')
                return;
            }
            else {
                DeleteFromGrid();
            }
            ProgressBar('hide');
        });
}