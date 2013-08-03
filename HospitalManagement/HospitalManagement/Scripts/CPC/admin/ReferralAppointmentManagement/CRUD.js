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
                LoadRefApptData();
            }
            else {
                alert("Login Error");
            }
        }); 
}

/*****************************************/
/***************READ**********************/
/*****************************************/
function LoadRefApptData() {
    screenData.length = 0;
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'GetView';
    var dataParam = {};
    dataParam.viewDesignName = "dev_appt";
    dataParam.viewName = "apptsbyid";

    // 1. Call Database
    $.epic.query(prefix, fname, dataParam, function (ret) {
        //alert(JSON.stringify(ret));
        if (ret.response.success) {
            if (ret.response.result == "") {
                alert("There are no records in the database");
            }
        }
        else {
            alert("view all appointment failed");
        }
        
        // 2. Parse the response
        //alert(JSON.stringify(ret.response.result));
        var resp = JSON.parse(ret.response.result);
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
}

/*****************************************/
/***************CREATE/UPDATE*************/
/*****************************************/
function CreateNewRefApptRecord(id, newRow, datacontent) {
    var prefix = 'Values';
    var fname = 'InsertData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.appts" + sign + id;

    // 1. Call Database
    $.epic.insert(prefix, fname, displayName, datacontent,
        function (data) {
            if (!data.response.success) {
                alert(JSON.stringify(data));
                alert("Add failed");
                return;
            }
            else {
                // 2. Get the id if its a new row
                if (newRow) {
                    id = data.response.result;
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
function DeleteRefApptRecord(ID) {
    var prefix = 'Values';
    var fname = 'DeleteData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.appts" + sign + ID;
    //alert(displayName);
    $.epic.delete(prefix, fname, displayName,
        function (data2) {
            if (!data2.response.success) {
                alert("delete failed");
                ProgressBar('hide')
                return;
            }
            else {
                DeleteGridData();
            }
            ProgressBar('hide');
        });
}