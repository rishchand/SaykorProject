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

    // Initialize the Site UI Components
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
    $("#jqxCntBtnAdd").jqxButton({ width: '80', theme: "custom" });
    $("#jqxCntBtnDelete").jqxButton({ width: '70', theme: "custom" });
    $("#jqxCntBtnSave").jqxButton({ width: '70', theme: "custom" });
    $("#jqxCntBtnCancel").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes
    $("#jqxCntIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntDirectorIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntDirectorTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntContractDescriptionTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntProjectIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntPermanentProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntPermanentCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntPermanentStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntPermanentStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntPermanentPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntMailingProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntMailingCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntMailingStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntMailingStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxCntMailingPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#jqxCntNameDdn").jqxDropDownList({ source: centerSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxCntProjectNameDdn").jqxDropDownList({ source: projectSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxCntSitesDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxCntServicesAvailDdn").jqxDropDownList({ source: servicesAvailSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxCntPermanentDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxCntMailingDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Calendar
    $("#jqxCntContractDateCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });


    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#jqxCentergrid").jqxGrid(
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
                  text: 'CENTER ID',
                  datafield: 'id',
                  width: "9%",
                  renderer: columnsrenderer
              },
              {
                  text: 'CENTER',
                  datafield: 'cntr',
                  width: "12%",
                  renderer: columnsrenderer
              },

              {
                  text: 'DIRECTOR ID',
                  datafield: 'drctorId',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DIRECTOR',
                  datafield: 'drctor',
                  width: "9%",
                  renderer: columnsrenderer
              },
              {
                  text: 'CONTRACT DATE',
                  datafield: 'cntrtDate',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'CONTRACT DESCRIPTION',
                  datafield: 'descript',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT ID',
                  datafield: 'prjctId',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROJECT NAME',
                  datafield: 'project',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SITES',
                  datafield: 'site',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SERVICES AVAILABLE',
                  datafield: 'servicesAvail',
                  width: "14%",
                  renderer: columnsrenderer
              },
            ]
        });

    // Event
    $("#jqxCentergrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#jqxCntIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#jqxCntDirectorIdTxt").val(screenData[selectedRowIndex]["drctorId"]);
        $("#jqxCntDirectorTxt").val(screenData[selectedRowIndex]["drctor"]);
        var date = screenData[selectedRowIndex]["cntrtDate"].split('-');
        if (date != "" && date.length > 2)
                $("#jqxCntContractDateCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        $("#jqxCntContractDescriptionTxt").val(screenData[selectedRowIndex]["descript"]);
        $("#jqxCntProjectIdTxt").val(screenData[selectedRowIndex]["prjctId"]);
        $("#jqxCntPermanentProvinceTxt").val(screenData[selectedRowIndex]["permProvince"]);
        $("#jqxCntPermanentCityTxt").val(screenData[selectedRowIndex]["permCity"]);
        $("#jqxCntPermanentDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["permDistrict"], districtSource));
        $("#jqxCntPermanentStreetNameTxt").val(screenData[selectedRowIndex]["permStreetName"]);
        $("#jqxCntPermanentStreetNumberTxt").val(screenData[selectedRowIndex]["permStreetNumber"]);
        $("#jqxCntPermanentPostalCodeTxt").val(screenData[selectedRowIndex]["permPostalCode"]);
        $("#jqxCntMailingProvinceTxt").val(screenData[selectedRowIndex]["mailProvince"]);
        $("#jqxCntMailingCityTxt").val(screenData[selectedRowIndex]["mailCity"]);
        $("#jqxCntMailingDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["mailDistrict"], districtSource));
        $("#jqxCntMailingStreetNameTxt").val(screenData[selectedRowIndex]["mailtStreetName"]);
        $("#jqxCntMailingStreetNumberTxt").val(screenData[selectedRowIndex]["mailStreetNumber"]);
        $("#jqxCntMailingPostalCodeTxt").val(screenData[selectedRowIndex]["mailPostalCode"]);
        $("#jqxCntNameDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["cntr"], centerSource));
        $("#jqxCntProjectNameDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["project"], projectSource));
        $("#jqxCntSitesDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["siteName"], siteSource));
        $("#jqxCntServicesAvailDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["servicesAvail"], servicesAvailSource));


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

    $("#jqxCentergrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}