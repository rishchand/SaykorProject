var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var patientScreenData = new Array();
var medicationScreenData = new Array();
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

    // Load the necessary data for this screen from CRUD.js
    // Commented as the Patient List is cooked up data
    //LoginAndLoadGrid();

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

    $("#pg_jqxSelectedPatientGrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        LoginAndLoadMedicationGrid(patientScreenData[selectedRowIndex]["id"]);
    });
}

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: theme, width: '99.9%', height: 600, panels: [{ size: '35%', min: '30%', collapsible: false }, { min: '30%', size: '65%' }] });
    $('#mainSplitter2').jqxSplitter({ theme: theme, width: '100%', height: 600, panels: [{ size: '60%', min: '60%', collapsible: false }, { min: '39%', size: '39%' }] });
    $("#medicationListExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
    });
    $("#medicationDetailsExpander").jqxExpander({
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
    $("#MedMgt_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#MegMgt_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#MegMgt_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#MegMgt_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#MedDtls_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxPatientIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxDatePresTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxMedIdentifierTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxDosageTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxProviderIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxProviderLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#MedDtls_jqxProviderFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#MedDtls_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxCommUsedDrugDdn").jqxDropDownList({ source: commUsedDrugSource, selectedIndex: -1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxDrugClassDdn").jqxDropDownList({ selectedIndex: -1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ selectedIndex: -1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxFregOfAdDdn").jqxDropDownList({ source: freqOfAdminSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxMedTimeDdn").jqxDropDownList({ source: medTimeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#MedDtls_jqxIntakeDdn").jqxDropDownList({ source: intakeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    //Driopdown Event Bindings
    $('#MedDtls_jqxCommUsedDrugDdn').on('select', function (event) {
        var args = event.args;
        var item = $('#MedDtls_jqxCommUsedDrugDdn').jqxDropDownList('getItem', args.index);
        if (item != null) {
            if (item.label == "Common Diabetes Drugs") {
                $("#MedDtls_jqxDrugClassDdn").jqxDropDownList({ source: commDiabetesDrugClassesSource });
            }
            else if (item.label == "Hypertension commonly used drugs") {
                $("#MedDtls_jqxDrugClassDdn").jqxDropDownList({ source: hypertensionDrugClassesSource });
            }
        }
    });
    //Driopdown Event Bindings
    $('#MedDtls_jqxDrugClassDdn').on('select', function (event) {
        var args = event.args;
        var item = $('#MedDtls_jqxDrugClassDdn').jqxDropDownList('getItem', args.index);
        if (item != null) {
            switch (item.label) {
                case "Regular Insulin":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: regularInsulinDrugNameSource });
                    break;
                case "Sulfonylureas":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: sulfonylureasDrugNameSource });
                    break;
                case "Non-sulfonylurea":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: nonsulfonylureaDrugNameSource });
                    break;
                case "Glucosidase inhibitors":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: glucosidaseInhibitorsDrugNameSource });
                    break;
                case "Glargine":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: glargineDrugNameSource });
                    break;
                case "Thiazolidinedione":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: thiazolidinedioneDrugNameSource });
                    break;
                case "Chinese medicine antidiabetic drugs":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: chineseMedicineAtidiabeticDrugNameSource });
                    break;
                case "GLP1 analogues":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: GLP1AnaloguesDrugNameSource });
                    break;
                case "DPP4 inhibitors":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: DPP4InhibitorsDrugNameSource });
                    break;
                case "Biguanide":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: biguanideDrugNameSource });
                    break;
                case "Diuretics":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: diureticsDrugNameSource });
                    break;
                case "Calcium antagonists":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: calciumAntagonistsDrugNameSource });
                    break;
                case "β-blockers":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: blockersDrugNameSource });
                    break;
                case "Angiotensin-converting enzyme inhibitors":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: angiotensinConvertingEnzymeInhibitorsDrugNameSource });
                    break;
                case "Angiotensin II receptor blockers":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: angiotensiIIReceptorBlockersDrugNameSource });
                    break;
                case "Other":
                    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList({ source: otherDrugNameSource });
                    break;
            }
        }        
    });

    // Calendar
    $("#MedDtls_jqxMedStrtDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#MedDtls_jqxMedEndDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });

    // Checkbox
    // Radio Buttons
    $('input').iCheck({
        radioClass: 'iradio_square-grey'
    });

    // Window
    ////$("#window").dialog("open");
    //$('#window').jqxWindow({
    //    showCollapseButton: true, autoOpen: false, minHeight: 200, minWidth: 200, height: 700, width: 800, theme: "custom",
    //    initContent: function () {
    //        $('#tab').jqxTabs({ height: '100%', width: '100%', theme: "custom" });
    //        $('#window').jqxWindow('focus');
    //    }
    //});

    // Data Adaptor
    //BindData2Grid(screenData);

    InitializePatientData();
    BindPatientList2Grid(patientScreenData);

    //InitializeMedicationData();
    //BindMedicationList2Grid(medicationScreenData);

    // Grid
    $("#pg_jqxMedicationListGrid").jqxGrid(
        {
            theme: "custom",
            width: "180%",
            height: "99%",
            
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer,
            columns: [
              {
                  text: '',
                  width: "1%",
                  height: "100"
              },
              {
                  text: 'MEDICATION ID',
                  datafield: 'id',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'pntId',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DATE PRESCRIBED',
                  datafield: 'dtPres',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICATION IDENTIFIER',
                  datafield: 'medIdent',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
                  datafield: 'lstNm',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'frstNm',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENDER',
                  datafield: 'gndr',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'USED DRUGS',
                  datafield: 'usedDrugs',
                  width: "23%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DRUG CLASS',
                  datafield: 'drgCl',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DRUG NAME',
                  datafield: 'drgNm',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MED START DATE',
                  datafield: 'medStDt',
                  width: "18%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MED END DATE',
                  datafield: 'medEdDt',
                  width: "18%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#pg_jqxMedicationListGrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        // Textbox
        $("#MedDtls_jqxIdTxt").val(medicationScreenData[selectedRowIndex]["id"]);
        $("#MedDtls_jqxPatientIdTxt").val(medicationScreenData[selectedRowIndex]["pntId"]);
        $("#MedDtls_jqxDatePresTxt").val(medicationScreenData[selectedRowIndex]["dtPres"]);
        $("#MedDtls_jqxMedIdentifierTxt").val(medicationScreenData[selectedRowIndex]["medIdent"]);
        $("#MedDtls_jqxLastNameTxt").val(medicationScreenData[selectedRowIndex]["lstNm"]);
        $("#MedDtls_jqxFirstNameTxt").val(medicationScreenData[selectedRowIndex]["frstNm"]);
        $("#MedDtls_jqxDosageTxt").val(medicationScreenData[selectedRowIndex]["dosage"]);
        $("#MedDtls_jqxProviderIdTxt").val(medicationScreenData[selectedRowIndex]["prvdId"]);
        $("#MedDtls_jqxProviderLastNameTxt").val(medicationScreenData[selectedRowIndex]["prvdLsNm"]);
        $("#MedDtls_jqxProviderFirstNameTxt").val(medicationScreenData[selectedRowIndex]["prvdFrstNm"]);


        // Drop Down
        $("#MedDtls_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["gndr"], providerTypeSource));
        $("#MedDtls_jqxCommUsedDrugDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["usedDrugs"], providerTypeSource));
        $("#MedDtls_jqxDrugClassDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["drgCl"], providerTypeSource));
        $("#MedDtls_jqxDrugNameDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["drgNm"], providerTypeSource));
        $("#MedDtls_jqxFregOfAdDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["freqofAdm"], providerTypeSource));
        $("#MedDtls_jqxMedTimeDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["medTime"], providerTypeSource));
        $("#MedDtls_jqxIntakeDdn").jqxDropDownList('selectIndex', jQuery.inArray(medicationScreenData[selectedRowIndex]["intake"], providerTypeSource));

        // Calendar
        date = screenData[selectedRowIndex]["medStDt"].split('-');
        if (date != "" && date.length > 2)
            $("#MedDtls_jqxMedStrtDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["medEdDt"].split('-');
        if (date != "" && date.length > 2)
            $("#MedDtls_jqxMedEndDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        // Checkbox
        $("#reminderRdo_" + screenData[selectedRowIndex]["headOfHouse"]).iCheck('check');

    });
}

var pagerrenderer = function () {
    var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = $("#pg_jqxMedicationListGrid").jqxGrid('getpaginginformation');
    for (i = 0; i < paginginfo.pagescount; i++) {
        // add anchor tag with the page number for each page.
        var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
        anchor.appendTo(element);
        anchor.click(function (event) {
            // go to a page.
            var pagenum = parseInt($(event.target).text());
            $("#pg_jqxMedicationListGrid").jqxGrid('gotopage', pagenum);
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
        loadComplete: function (gridData) {  },
        loadError: function (xhr, status, error) { }
    });

    $("#pg_jqxSelectedPatientGrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

var patientSource;
var patientListDataAdapter;
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

    $("#pg_jqxSelectedPatientGrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}
var medicationSource;
var medicationListDataAdapter;
function BindMedicationList2Grid(gridData) {
    medicationSource =
    {
        localdata: gridData,
        datatype: "array",
        pagesize: 10
    };
    medicationListDataAdapter = new $.jqx.dataAdapter(medicationSource, {
        loadComplete: function (gridData) {  },
        loadError: function (xhr, status, error) { }
    });

    $("#pg_jqxMedicationListGrid").jqxGrid("updatebounddata", "cells");
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