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

    // splitters
    InitializeSplitters();

    // Initialize the Provider UI Components
    InitializeUI();

    // Load the necessary data for this screen from CRUD.js
    LoginAndLoadGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();

});

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height:'500', panels: [{ size: '70%', min: '70%', collapsible: false }, { min: '0%', size: '30%' }] });
}

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#project_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#project_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#project_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#project_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#project_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes
    var globalColumnWidth = "90%";
    $("#project_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });    
    $("#project_jqxProjDolValTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxProjDescTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxProjSponTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxRegAdmIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxRegAdmTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxMobPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#project_jqxWrkPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#project_jqxProjNameDdn").jqxDropDownList({ source: projectSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#project_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#project_jqxCenterDdn").jqxDropDownList({ source: centerSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#project_jqxSiteDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#project_jqxProvTeamNameDdn").jqxDropDownList({ source: provTeamNameSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#project_jqxPanelGrpDdn").jqxDropDownList({ source: panelGrpSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#project_jqxgrid").jqxGrid(
        {
            theme: "custom",
            width: "100%",
            height: "100%",
            source: dataAdapter,
            sortable: true,                 
            filterable: true,
            pageable: true,
            rowsheight: 50,
            columns: [
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'PROJECT ID',
                  datafield: 'id',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT NAME',
                  datafield: 'prjctName',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT DOLLAR VALUE',
                  datafield: 'projVal',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT DESCRIPTION',
                  datafield: 'projDesc',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT SPONSOR',
                  datafield: 'projSpons',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'REGIONAL ADMIN ID',
                  datafield: 'regAdmId',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'REGIONAL ADMIN',
                  datafield: 'regAdm',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MOBILE PHONE',
                  datafield: 'mobPhone',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENDER',
                  datafield: 'gender',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'WORK PHONE',
                  datafield: 'workPhone',
                  width: "13%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#project_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;

        $("#project_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#project_jqxProjDolValTxt").val(screenData[selectedRowIndex]["projVal"]);
        $("#project_jqxProjDescTxt").val(screenData[selectedRowIndex]["projDesc"]);
        $("#project_jqxProjSponTxt").val(screenData[selectedRowIndex]["projSpons"]);
        $("#project_jqxRegAdmIdTxt").val(screenData[selectedRowIndex]["regAdmId"]);
        $("#project_jqxRegAdmTxt").val(screenData[selectedRowIndex]["regAdm"]);
        $("#project_jqxMobPhoneTxt").val(screenData[selectedRowIndex]["mobPhone"]);
        $("#project_jqxWrkPhoneTxt").val(screenData[selectedRowIndex]["workPhone"]);;
        
        $("#project_jqxProjNameDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prjctName"], projectSource));
        $("#project_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gender"], genderSource));
        $("#project_jqxCenterDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["center"], centerSource));
        $("#project_jqxSiteDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["sites"], siteSource));
        $("#project_jqxProvTeamNameDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prvdrTeamNm"], provTeamNameSource));
        $("#project_jqxPanelGrpDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["pnlGrp"], panelGrpSource));
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

    $("#project_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}