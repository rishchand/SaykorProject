var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var patientScreenData = new Array();
var newRow = true;
var globalColumnWidth = "90%";
var theme = "custom";
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

    // Initialize PAtientList Grids
    InitializeSelectedPatientGrid();
    InitializeAllPatientGrid();

    // Load the necessary data for this screen from CRUD.js
    LoginAndLoadGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();
});

function InitializeSelectedPatientGrid() {
    // Grid
    $("#pg_jqxSelectedPatientGrid").jqxGrid(
        {
            theme: "custom",
            width: "150%",
            height: '99%',
            source: patientListDataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer_SelectedPatientGrid,
            columns: [
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'FILE NUMBER',
                  datafield: 'fileNumber',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FILE DATE',
                  datafield: 'fileDate',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
                  datafield: 'lastName',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'firstName',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'id',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL INS CATG NAME',
                  datafield: 'medicalInsuranceCat',
                  width: "25%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL CARD NUMBER',
                  datafield: 'medicareCardNumber',
                  width: "25%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DATE OF BIRTH',
                  datafield: 'dateOfBirth',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PHONE NUMBER',
                  datafield: 'phoneNumber',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'EMAIL',
                  datafield: 'email',
                  width: "20%",
                  renderer: columnsrenderer
              }
            ]
        });
}

function InitializeAllPatientGrid() {
    // Grid
    $("#pg_jqxAllPatientGrid").jqxGrid(
        {
            theme: "custom",
            width: "100%",
            source: patientListDataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            columns: [
            {
                text: '',
                cellsrenderer: allPatient_cellsrenderer,
                width: "5%"
            },
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'FILE NUMBER',
                  datafield: 'fileNumber',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FILE DATE',
                  datafield: 'fileDate',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
                  datafield: 'lastName',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'firstName',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'id',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL INS CATG NAME',
                  datafield: 'medicalInsuranceCat',
                  width: "25%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL CARD NUMBER',
                  datafield: 'medicareCardNumber',
                  width: "25%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DATE OF BIRTH',
                  datafield: 'dateOfBirth',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PHONE NUMBER',
                  datafield: 'phoneNumber',
                  width: "20%",
                  renderer: columnsrenderer
              },
              {
                  text: 'EMAIL',
                  datafield: 'email',
                  width: "20%",
                  renderer: columnsrenderer
              }
            ]
        });
}

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: theme, width: '99.9%', height: 600, panels: [{ size: '40%', min: '30%', collapsible: false }, { min: '30%', size: '60%' }] });
    $('#mainSplitter2').jqxSplitter({ theme: theme, width: '100%', height: 600, panels: [{ size: '40%', min: '40%' }, { min: '30%', size: '60%' }] });
    $("#patientGrpExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
    });
    $("#patientGrpDtlExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
    });
    $("#patientListExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
    });
}

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#PatientGroup_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#PatientGroup_jqxButtonSelectPatient").jqxButton({ width: '120', theme: "custom" });
    $("#PatientGroup_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#PatientGroup_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#PatientGroup_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#PatientGroup_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#PatientGroup_jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#PatientGroup_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxPatientGroupNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxPatientGroupDescTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxProviderInChargeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxProviderGroupTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxSortByTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxIsEnabledTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#PatientGroup_jqxPatientsTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList({ source: drugTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Window
    $("#selectPatientPopUp").dialog({
        autoOpen: false,
        height: 530,
        width: 700,
        modal: true,
        buttons: {
            "Select Patients": function () {
                
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
        }
    });
    //$('#window').jqxWindow({
    //    showCollapseButton: true, autoOpen: false, minHeight: 200, minWidth: 200, height: 700, width: 800, theme: "custom",
    //    initContent: function () {
    //        $('#tab').jqxTabs({ height: '100%', width: '100%', theme: "custom" });
    //        $('#window').jqxWindow('focus');
    //    }
    //});

    // Data Adaptor
    BindData2Grid(screenData);
    InitializeData();
    BindPatientList2Grid(patientScreenData);

    // Grid
    $("#PatientGroup_jqxgrid").jqxGrid(
        {
            theme: "custom",
            width: "180%",
            height: "99%",
            source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer,
            columns: [
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'PATIENT GROUP ID',
                  datafield: 'id',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT GROUP NAME',
                  datafield: 'grpName',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT GROUP DESCRIPTION',
                  datafield: 'grpDesc',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER INCHARGE',
                  datafield: 'prvdrInCharge',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER RESP FOR GROUP',
                  datafield: 'prvdrResponsible',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER TYPE',
                  datafield: 'prvdrType',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SORT BY',
                  datafield: 'sortBy',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'IS ENABLED',
                  datafield: 'isEnabled',
                  width: "23%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENTS',
                  datafield: 'patients',
                  width: "18%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#PatientGroup_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#PatientGroup_profileImgDtlGrid").attr("src", "/Images/doctorphoto2.png");
        $("#PatientGroup_jqxButtonUpload").css("display", "none");
        $("#PatientGroup_sideTableID").text(screenData[selectedRowIndex]["id"]);

        $("#PatientGroup_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#PatientGroup_jqxPatientGroupNameTxt").val(screenData[selectedRowIndex]["grpName"]);
        $("#PatientGroup_jqxPatientGroupDescTxt").val(screenData[selectedRowIndex]["grpDesc"]);
        $("#PatientGroup_jqxProviderInChargeTxt").val(screenData[selectedRowIndex]["prvdrInCharge"]);
        $("#PatientGroup_jqxProviderGroupTxt").val(screenData[selectedRowIndex]["prvdrResponsible"]);
        $("#PatientGroup_jqxSortByTxt").val(screenData[selectedRowIndex]["sortBy"]);
        $("#PatientGroup_jqxIsEnabledTxt").val(screenData[selectedRowIndex]["isEnabled"]);
        $("#PatientGroup_jqxPatientsTxt").val(screenData[selectedRowIndex]["patients"]);

        $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prvdrType"], providerTypeSource));
    });
}

var pagerrenderer = function () {
    var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = $("#PatientGroup_jqxgrid").jqxGrid('getpaginginformation');
    for (i = 0; i < paginginfo.pagescount; i++) {
        // add anchor tag with the page number for each page.
        var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
        anchor.appendTo(element);
        anchor.click(function (event) {
            // go to a page.
            var pagenum = parseInt($(event.target).text());
            $("#PatientGroup_jqxgrid").jqxGrid('gotopage', pagenum);
        });
    }
    return element;
}


var pagerrenderer_AllPatientGrid = function () {
    var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = $("#pg_jqxAllPatientGrid").jqxGrid('getpaginginformation');
    for (i = 0; i < paginginfo.pagescount; i++) {
        // add anchor tag with the page number for each page.
        var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
        anchor.appendTo(element);
        anchor.click(function (event) {
            // go to a page.
            var pagenum = parseInt($(event.target).text());
            $("#pg_jqxAllPatientGrid").jqxGrid('gotopage', pagenum);
        });
    }
    return element;
}

var pagerrenderer_SelectedPatientGrid = function () {
    var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = $("#pg_jqxSelectedPatientGrid").jqxGrid('getpaginginformation');
    for (i = 0; i < paginginfo.pagescount; i++) {
        // add anchor tag with the page number for each page.
        var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
        anchor.appendTo(element);
        anchor.click(function (event) {
            // go to a page.
            var pagenum = parseInt($(event.target).text());
            $("#pg_jqxSelectedPatientGrid").jqxGrid('gotopage', pagenum);
        });
    }
    return element;
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

    $("#PatientGroup_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

function BindPatientList2Grid(gridData) {
    patientSource =
    {
        localdata: gridData,
        datatype: "array",
        pagesize: 10
    };
    patientListDataAdapter = new $.jqx.dataAdapter(patientSource, {
        loadComplete: function (gridData) {  },
        loadError: function (xhr, status, error) { }
    });

    $("#PatientGroup_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var allPatient_cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<input type='checkbox'/>";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}