/*****************************************/
/***************LOGIN*********************/
/*****************************************/
function LoginAndLoadServiceTixGrid() {
    $.epic.login(
        "rthompson",
        "",
        function (ret) {
            if (ret.response.success) {
                role = ret.response.result;
                loginSessionContext = ret.response.sessionContext;
                LoadSrvTxData();
            }
            else {
                alert("Login Error");
            }
        });
}

/*****************************************/
/***************READ**********************/
/*****************************************/
function LoadSrvTxData() {

    screenData.length = 0;
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'GetView';
    var dataParam = {};
    dataParam.viewDesignName = "dev_serviceticket";
    dataParam.viewName = "serviceticketsbyid";

    // 1. Call Database
    $.epic.query(prefix, fname, dataParam, function (ret) {
        if (ret.response.success) {
            if (ret.response.result == "") {
                alert("There are no records in the database");
            }
        }
        else {
            alert("view dev_serviceticket failed");
        }

        // 2. Parse the response
        var resp = JSON.parse(ret.response.result);
        for (var i = 0; i < resp.length; i++) {
            var row = {};
            var keys = Object.keys(resp[i]);
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


function CreateNewSrvTxRecord(id, newRow, datacontent) {
    alert(id + newRow + datacontent.length);
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'InsertData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.srvtixs" + sign + id;

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


function DeleteSrvTxRecord(srvTxID) {
    var prefix = 'Values';
    var fname = 'DeleteData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.srvtixs" + sign + srvTxID;

    $.epic.delete(prefix, fname, displayName,
        function (data2) {
            if (!data2.response.success) {
                ProgressBar('hide')
                return;
            }
            else {
                var rowscount = $("#jqxSrvTxGrid").jqxGrid('getdatainformation').rowscount;
                if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
                    var rowId = $("#jqxSrvTxGrid").jqxGrid('getrowid', selectedRowIndex);
                    var commit = $("#jqxSrvTxGrid").jqxGrid('deleterow', rowId);
                }
                ClearDetailGrid();
            }
            ProgressBar('hide');
        });
}



