var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var newRow = true;

/*****************************************************************************************************/
/***********************************ONLOAD FUNCTION***************************************************/
/*****************************************************************************************************/
$(document).ready(function () {
    // This Loads the Menu and other necessary common scripts from the CPCCommon.js
    InitializeCPCCommon();

    // splitters
    InitializeSplitters();

    // Initialize the Service Ticket UI Components
    InitializeUI();

    // Load the necessary data for this screen from CRUD.js
    LoginAndLoadServiceTixGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();

});

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height: 600, panels: [{ size: '70%', min: '70%', collapsible: false }, { min: '0%', size: '30%' }] });
}


/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#jqxSrvTxBtnAdd").jqxButton({ width: '80', theme: "custom" });
    $("#jqxSrvTxBtnDelete").jqxButton({ width: '70', theme: "custom" });
    $("#jqxSrvTxBtnSave").jqxButton({ width: '70', theme: "custom" });
    $("#jqxSrvTxBtnCancel").jqxButton({ width: '70', theme: "custom" });

    // TextBoxes
    var jqxGridColumnWidth = "90%";
    $("#jqxSrvTxPatientIdTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxPatientLastNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxPatientFirstNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxPatientMobileNumberTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxProviderLastNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxProviderFirstNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxSrvTxServiceTicketDescriptTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });


    // Dropdown
    $("#jqxSrvTxPriorityDdn").jqxDropDownList({ source: prioritySource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTxWorksheetLevelDdn").jqxDropDownList({ source: worksheetLevelSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTxStatusDdn").jqxDropDownList({ source: statusSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTixGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTxProviderTypeDdn").jqxDropDownList({ source: providerTypeSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTixGenSourceDdn").jqxDropDownList({ source: genSourceSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSrvTixReasonDdn").jqxDropDownList({ source: reasonSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });

    // Initialize the radio button
    $('input').iCheck({
        radioClass: 'iradio_flat-red'
    });
    $('input').on('ifChecked', function (event) {
        changeColor();
    });
    function changeColor() {
        var className = "iradio_flat-" + $("input[name='iPriorityCheck']:checked").val();
        $('input').iCheck({
            radioClass: className
        });
        $('input').on('ifChecked', function (event) {
            changeColor();
        });
    }


    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#jqxSrvTxGrid").jqxGrid(
        {
            theme: "custom",
            width: "100%",
            height: "580",
            source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            columns: [

              {
                  text: 'SERVICE TICKET ID',
                  datafield: 'id',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PRIORITY',
                  datafield: 'prior',
                  width: "8%",
                  renderer: columnsrenderer
              },

              {
                  text: 'WORKSHEET LEVEL',
                  datafield: 'wrkshtLvl',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'STATUS',
                  datafield: 'status',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'pntId',
                  width: "9%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT LAST NAME',
                  datafield: 'pntLstNm',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT FIRST NAME',
                  datafield: 'pntFrstNm',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENDER',
                  datafield: 'gndr',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT MOBILE NUMBER',
                  datafield: 'pntMobNmbr',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER LAST NAME',
                  datafield: 'prvdrLstNm',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER FIRST NAME',
                  datafield: 'prvdrFrstNm',
                  width: "15%",
                  renderer: columnsrenderer
              },
            ]
        });

    // Event 
    $("#jqxSrvTxGrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#sideSrvTxID").text(screenData[selectedRowIndex]["id"]);
        $("#iPriorityCheck_" + getPriorityIndex(screenData[selectedRowIndex]["prior"])).iCheck('check');
        $("#jqxSrvTxPatientIdTxt").val(screenData[selectedRowIndex]["pntId"]);
        $("#jqxSrvTxPatientLastNameTxt").val(screenData[selectedRowIndex]["pntLstNm"]);
        $("#jqxSrvTxPatientFirstNameTxt").val(screenData[selectedRowIndex]["pntFrstNm"]);
        $("#jqxSrvTxPatientMobileNumberTxt").val(screenData[selectedRowIndex]["pntMobNmbr"]);
        $("#jqxSrvTxProviderLastNameTxt").val(screenData[selectedRowIndex]["prvdrLstNm"]);
        $("#jqxSrvTxProviderFirstNameTxt").val(screenData[selectedRowIndex]["prvdrFrstNm"]);
        $("#jqxSrvTxServiceTicketDescriptTxt").val(screenData[selectedRowIndex]["desc"]);
        $("#jqxSrvTxPriorityDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prior"], prioritySource));
        $("#jqxSrvTxWorksheetLevelDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["wrkshtLvl"], worksheetLevelSource));
        $("#jqxSrvTxStatusDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["status"], statusSource));
        $("#jqxSrvTixGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gndr"], genderSource));
        $("#jqxSrvTxProviderTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prvdrType"], providerTypeSource));
        $("#jqxSrvTixGenSourceDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["genSrce"], genSourceSource));
        $("#jqxSrvTixReasonDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["reason"], reasonSource));

    });
}

function getPriorityIndex(priority) {
    var priorityIndex = 1;
    if (priority.toString().toLowerCase() == "red") {
        priorityIndex = 1;
    }
    if (priority.toString().toLowerCase() == "orange") {
        priorityIndex = 2;
    }
    if (priority.toString().toLowerCase() == "green") {
        priorityIndex = 3;
    }
    return priorityIndex;
}
/*****************************************************************************************************/
/***********************************BIND GRID*********************************************************/
/*****************************************************************************************************/
// Bind Grid
function BindData2Grid(gridData) {
    source =
    {
        localdata: gridData,
        datatype: "array",
        pagesize: 10
    };
    dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (gridData) { },
        loadError: function (xhr, status, error) { }
    });

    $("#jqxSrvTxGrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}


/*****************************************/
/***************LOGIN*********************/
/*****************************************/
function LoginAndLoadServiceTixGrid() {
    alert('I am here');
    LoadSrvTxData();

    /***
    $.epic.login(
        "rthompson",
        "",
        function (ret) {
            if (ret.response.success) {
                role = ret.response.result;
                loginSessionContext = ret.response.sessionContext;
                LoadProviderData();
            }
            else {
                alert("Login Error");
            }
        });**/
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
    alert(JSON.stringify(dataParam));

    // 1. Call Database
    $.epic.query(prefix, fname, dataParam, function (ret) {
        // alert(ret.response.success);
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

        //alert("entering bind data to Grid");
        BindData2Grid(screenData);
    });
}

/*****************************************/
/***************CREATE/UPDATE*************/
/*****************************************/


function CreateNewSrvTxRecord(id, newRow, datacontent) {
    $.epic.setSessionContext(loginSessionContext);
    var prefix = 'Values';
    var fname = 'InsertData';
    var str = "1@2";
    var sign = str.substring(1, 2);
    var displayName = "HK.srvtixs" + sign + id;

    alert(JSON.stringify(datacontent));
    alert(displayName);


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
                alert("delete failed");
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

