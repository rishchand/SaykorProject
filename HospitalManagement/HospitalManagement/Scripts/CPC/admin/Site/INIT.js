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
    $("#jqxSiteButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#jqxSiteButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#jqxSiteButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#jqxSiteButtonSave").jqxButton({ width: '70', theme: "custom" });
       
    // TextBoxes
    $("#jqxSiteIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteAdminIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteAdminTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSitePermanentProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSitePermanentCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSitePermanentStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSitePermanentStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSitePermanentPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteMailingProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteMailingCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteMailingStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteMailingStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#jqxSiteMailingPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxSiteDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxSiteDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxSiteServicesAvailDdn").jqxDropDownList({ source: servicesAvailSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxSitePermanentDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#jqxSiteMailingDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    

    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#jqxSitegrid").jqxGrid(
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
                  text: 'SITE ID',
                  datafield: 'id',
                  width: "14%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SITE NAME',
                  datafield: 'name',
                  width: "16%",
                  renderer: columnsrenderer
              },
              
              {
                  text: 'ADMIN ID',
                  datafield: 'adminId',
                  width: "16%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SERVICE AVAILABLE',
                  datafield: 'servicesAvail',
                  width: "22%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVINCE',
                  datafield: 'permProvince',
                  width: "16%",
                  renderer: columnsrenderer
              },
              {
                  text: 'CITY',
                  datafield: 'permCity',
                  width: "16%",
                  renderer: columnsrenderer
              },
              
            ]
        });

    // Event Binding
    $("#jqxSitegrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
       
        $("#jqxSiteIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#jqxSiteNameTxt").val(screenData[selectedRowIndex]["name"]);
        $("#jqxSiteAdminIdTxt").val(screenData[selectedRowIndex]["adminId"]);
        $("#jqxSiteAdminTxt").val(screenData[selectedRowIndex]["admin"]);
       
        $("#jqxSiteServicesAvailDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["servicesAvail"], servicesAvailSource));
        $("#jqxSitePermanentProvinceTxt").val(screenData[selectedRowIndex]["permProvince"]);
        $("#jqxSitePermanentCityTxt").val(screenData[selectedRowIndex]["permCity"]);
        $("#jqxSitePermanentDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["permDistrict"], districtSource));
        $("#jqxSitePermanentStreetNameTxt").val(screenData[selectedRowIndex]["permStreetName"]);
        $("#jqxSitePermanentStreetNumberTxt").val(screenData[selectedRowIndex]["permStreetNumber"]);
        $("#jqxSitePermanentPostalCodeTxt").val(screenData[selectedRowIndex]["permPostalCode"]);
        $("#jqxSiteMailingProvinceTxt").val(screenData[selectedRowIndex]["mailProvince"]);
        $("#jqxSiteMailingCityTxt").val(screenData[selectedRowIndex]["mailCity"]);
        $("#jqxSiteMailingDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["mailDistrict"], districtSource));
        $("#jqxSiteMailingStreetNameTxt").val(screenData[selectedRowIndex]["mailtStreetName"]);
        $("#jqxSiteMailingStreetNumberTxt").val(screenData[selectedRowIndex]["mailStreetNumber"]);
        $("#jqxSiteMailingPostalCodeTxt").val(screenData[selectedRowIndex]["mailPostalCode"]);
        
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

    $("#jqxSitegrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}