var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var newRow = true;
var globalColumnWidth = "90%";
/*****************************************************************************************************/
/***********************************ONLOAD FUNCTION***************************************************/
/*****************************************************************************************************/
$(document).ready(function () {
    // This Loads the Menu and other necessary common scripts from the CPCCommon.js
    InitializeCPCCommon();

    // Initialize the Provider UI Components
    InitializeUI();

    // Load the necessary data for this screen from CRUD.js
    //LoginAndLoadGrid();
});

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#BookEnquiry_jqxgrid").jqxGrid(
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
                  text: '&nbsp;APPOINTMENT ID',
                  datafield: 'id',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'APPOINTMENT TYPE',
                  datafield: 'apptType',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'APPOINTMENT DATE',
                  datafield: 'apptDt',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DATE SCHEDULED',
                  datafield: 'dtSch',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'REFERRING PROVIDER',
                  datafield: 'referPrvdr',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SERVICE PROVIDER',
                  datafield: 'srvPrvdr',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'TIME PERIOD',
                  datafield: 'timePrd',
                  width: "10%",
                  renderer: columnsrenderer
              },
              {
                  text: 'TIME',
                  datafield: 'time',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DESCRIPTION',
                  datafield: 'descript',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'pntId',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST ANME',
                  datafield: 'lstNm',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'frstNm',
                  width: "8%",
                  renderer: columnsrenderer
              }
            ]
        });
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

    $("#BookEnquiry_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}

// show/hide progress bar
function ProgressBar(display) {
    if (display == 'show') {
        $("#progressContainer").removeClass("progressLabelHidden");
        $("#progressContainer").addClass("progressLabelVisible");
    }
    else {
        $("#progressContainer").removeClass("progressLabelVisible");
        $("#progressContainer").addClass("progressLabelHidden");
    }
}