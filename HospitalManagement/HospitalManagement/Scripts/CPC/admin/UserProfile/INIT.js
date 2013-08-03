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
    $("#userprofile_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#userprofile_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#userprofile_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#userprofile_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#userprofile_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#userprofile_jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#userprofile_jqxUserNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxPasswordTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxTitleTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxMobPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#userprofile_jqxWrkPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#userprofile_jqxRoleDdn").jqxDropDownList({ source: userRoleSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#userprofile_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });


    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#userprofile_jqxgrid").jqxGrid(
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
                  text: 'USER NAME',
                  datafield: 'userName',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PASSWORD',
                  datafield: 'password',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'USER PROFILE ID',
                  datafield: 'id',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
                  datafield: 'lastName',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'firstName',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'TITLE',
                  datafield: 'title',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MOBILE NUMBER',
                  datafield: 'mobileNumber',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'WORK PHONE',
                  datafield: 'workPhone',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENDER',
                  datafield: 'gender',
                  width: "8%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#userprofile_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#userprofile_profileImgDtlGrid").attr("src", "/Images/doctorphoto2.png");
        $("#userprofile_jqxButtonUpload").css("display", "none");
        $("#userprofile_sideTableID").text(screenData[selectedRowIndex]["id"]);
                
        $("#userprofile_jqxUserNameTxt").val(screenData[selectedRowIndex]["userName"]);
        $("#userprofile_jqxPasswordTxt").val(screenData[selectedRowIndex]["password"]);
        $("#userprofile_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#userprofile_jqxLastNameTxt").val(screenData[selectedRowIndex]["lastName"]);
        $("#userprofile_jqxFirstNameTxt").val(screenData[selectedRowIndex]["firstName"]);
        $("#userprofile_jqxTitleTxt").val(screenData[selectedRowIndex]["title"]);
        $("#userprofile_jqxMobPhoneTxt").val(screenData[selectedRowIndex]["mobileNumber"]);
        $("#userprofile_jqxWrkPhoneTxt").val(screenData[selectedRowIndex]["workPhone"]);;
        
        $("#userprofile_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gender"], genderSource));
        $("#userprofile_jqxRoleDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["role"], userRoleSource));
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

    $("#userprofile_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}