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
    $("#disease_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#disease_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#disease_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#disease_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#disease_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#disease_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxDiseaseCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxSequenceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxDiseaseNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxGBNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxDiagRulesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxHighRiskRulesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxInterRiskRulesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxNormalRulesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#disease_jqxEmgRulesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#disease_jqxDiseaseCatgDdn").jqxDropDownList({ source: diseaseCatgSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Radio Buttons
    $('input').iCheck({
        radioClass: 'iradio_square-grey'
    });
    
    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#disease_jqxgrid").jqxGrid(
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
                  text: 'DISEASE ID',
                  datafield: 'id',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DISEASE CODE',
                  datafield: 'diseaseCd',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SEQUENCE',
                  datafield: 'sqnce',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DISEASE NAME',
                  datafield: 'diseaseNm',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'IS VALID',
                  datafield: 'isVal',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GB NAME',
                  datafield: 'gbName',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DISEASE CATEGORY',
                  datafield: 'diseaseCtgry',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DIAGNOSED RULES',
                  datafield: 'dgnsedRles',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'HIGH RISK RULES',
                  datafield: 'highrskRles',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'INTERMEDIATE RISK RULES',
                  datafield: 'intrmdiaterRskRles',
                  width: "16%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#disease_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;                
        $("#disease_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#disease_jqxDiseaseCodeTxt").val(screenData[selectedRowIndex]["diseaseCd"]);
        $("#disease_jqxSequenceTxt").val(screenData[selectedRowIndex]["sqnce"]);
        $("#disease_jqxDiseaseNameTxt").val(screenData[selectedRowIndex]["diseaseNm"]);
        $("#diseaseIsValid_" + screenData[selectedRowIndex]["isVal"]).iCheck('check');
        $("#disease_jqxGBNameTxt").val(screenData[selectedRowIndex]["gbName"]);
        $("#disease_jqxDiagRulesTxt").val(screenData[selectedRowIndex]["dgnsedRles"]);
        $("#disease_jqxHighRiskRulesTxt").val(screenData[selectedRowIndex]["highrskRles"]);
        $("#disease_jqxInterRiskRulesTxt").val(screenData[selectedRowIndex]["intrmdiaterRskRles"]);
        $("#disease_jqxNormalRulesTxt").val(screenData[selectedRowIndex]["nrmlRules"]);
        $("#disease_jqxEmgRulesTxt").val(screenData[selectedRowIndex]["emrgncyLnks"]);
        
        $("#disease_jqxDiseaseCatgDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["diseaseCtgry"], diseaseCatgSource));
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

    $("#disease_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}