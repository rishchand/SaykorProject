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
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height: 600, panels: [{ size: '70%', min: '70%', collapsible: false }, { min: '0%', size: '30%' }] });
}

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#Rx_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#Rx_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#Rx_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#Rx_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#Rx_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#Rx_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Rx_jqxGenericDrugNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Rx_jqxBRandDrugNamesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Rx_jqxDescriptionTxt").jqxInput({ width: globalColumnWidth, height: '20px' });    
    $("#Rx_jqxUserForTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Rx_jqxSideEffectsTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#Rx_jqxDrugTypeDdn").jqxDropDownList({ source: drugTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Rx_jqxIntakeDdn").jqxDropDownList({ source: intakeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Rx_jqxFormDdn").jqxDropDownList({ source: formSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Rx_jqxColorDdn").jqxDropDownList({ source: colorSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Rx_jqxShapeDdn").jqxDropDownList({ source: shapeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#Rx_jqxgrid").jqxGrid(
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
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'Rx Id',
                  datafield: 'id',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENERIC DRUG NAME',
                  datafield: 'gnricDrugName',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'BRAND DRUG NAMES',
                  datafield: 'tradeName',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DRUG TYPE',
                  datafield: 'drugType',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DESCRIPTION',
                  datafield: 'drugDescr',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'INTAKE',
                  datafield: 'inTake',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FORM',
                  datafield: 'form',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'COLOR',
                  datafield: 'color',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SHAPE',
                  datafield: 'shape',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'USED FOR',
                  datafield: 'usedFor',
                  width: "8%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#Rx_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
                
        $("#Rx_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#Rx_jqxGenericDrugNameTxt").val(screenData[selectedRowIndex]["gnricDrugName"]);
        $("#Rx_jqxBRandDrugNamesTxt").val(screenData[selectedRowIndex]["tradeName"]);
        $("#Rx_jqxDescriptionTxt").val(screenData[selectedRowIndex]["drugDescr"]);
        $("#Rx_jqxUserForTxt").val(screenData[selectedRowIndex]["usedFor"]);
        $("#Rx_jqxSideEffectsTxt").val(screenData[selectedRowIndex]["sideEffects"]);
        
        $("#Rx_jqxDrugTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["drugType"], drugTypeSource));
        $("#Rx_jqxIntakeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["inTake"], intakeSource));
        $("#Rx_jqxFormDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["form"], formSource));
        $("#Rx_jqxColorDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["color"], colorSource));
        $("#Rx_jqxShapeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["shape"], shapeSource));
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

    $("#Rx_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}