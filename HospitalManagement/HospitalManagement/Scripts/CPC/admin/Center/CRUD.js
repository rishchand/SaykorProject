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
                LoadCenterData();
            }
            else {
                alert("Login Error");
            }
        });
}

/*****************************************/
/***************READ**********************/
/*****************************************/
function LoadCenterData() {
    screenData.length = 0;
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'GetView';
    var dataParam = {};
    dataParam.viewDesignName = "dev_center";
    dataParam.viewName = "centersbyid";

    // 1. Call Database
    $.epic.query(prefix, fname, dataParam, function (ret) {
       // alert(ret.response.success);
        if (ret.response.success) {
            if (ret.response.result == "") {
                alert("There are no records in the database");
            }
        }
        else {
            alert("view dev_centers failed");
        }
        
        // 2. Parse the response
        var resp = JSON.parse(ret.response.result);
        for (var i = 0; i < resp.length; i++) {
            var row = {};
            var keys = Object.keys(resp[i]);
            //alert(keys);
            for (var j = 0; j < keys.length; j++) {
                row[keys[j]] = resp[i][keys[j]];
            }
            screenData[i] = row;
        }

        // 3. Bind to grid 

        //alert("entering bind data to Grid");
        BindData2Grid(screenData);
    });
}

/*****************************************/
/***************CREATE/UPDATE*************/
/*****************************************/
function CreateNewCenterRecord(id, newRow, datacontent) {
   $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'InsertData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.centers" + sign + id;

    //alert(JSON.stringify(datacontent));
    ///alert(displayName);
   

    // 1. Call Database
    $.epic.insert(prefix, fname, displayName, datacontent,
        function (data) {
            if (!data.response.success) {
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
function DeleteProviderRecord(centerID) {
    var prefix = 'Values';
    var fname = 'DeleteData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.centers" + sign + centerID;

    $.epic.delete(prefix, fname, displayName,
        function (data2) {
            if (!data2.response.success) {
                alert("delete failed");
                ProgressBar('hide')
                return;
            }
            else {
                var rowscount = $("#jqxCentergrid").jqxGrid('getdatainformation').rowscount;
                if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
                    var rowId = $("#jqxCentergrid").jqxGrid('getrowid', selectedRowIndex);
                    var commit = $("#jqxCentergrid").jqxGrid('deleterow', rowId);
                }
                ClearDetailGrid();
            }
            ProgressBar('hide');
        });
}