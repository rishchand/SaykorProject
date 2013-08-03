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
    $("#RefAppt_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#RefAppt_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#RefAppt_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#RefAppt_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#RefAppt_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes    
    $("#RefAppt_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxRefProvTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxTimeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxDescTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxInvPplTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxLocTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxRefReasonTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxPatientIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxFileNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxPhoneNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#RefAppt_jqxEmailTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#RefAppt_jqxServiceProvDdn").jqxDropDownList({ source: serviceProvSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $('#RefAppt_jqxServiceProvDdn').on('select', function (event) {
        var args = event.args;
        var item = $('#RefAppt_jqxServiceProvDdn').jqxDropDownList('getItem', args.index);
        var options = {};
        if (item != null) {
            $("#clinicHours").text(clinicHours[item.label]["ClinicHour"]);
            $("#outpatientCondition").text(clinicHours[item.label]["OutpatientCondition"]);
            $("#outpatientVisit").text(clinicHours[item.label]["OutpatientVisit"]);
            if (!$("#effect").is(":visible")) {
                $("#effect").toggle("highlight", options, 500);
                $("#servProvDtlsSwitch").show();                
            }
            //$("#effect").toggle("highlight", options, 500);            
        }
    });
    $("#RefAppt_jqxApptTypeDdn").jqxDropDownList({ source: apptTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#RefAppt_jqxTimePeriodDdn").jqxDropDownList({ source: timePeriodSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#RefAppt_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Calendar
    $("#RefAppt_jqxApptDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#RefAppt_jqxStSchdCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });

    // Radio Buttons
    $('input').iCheck({
        radioClass: 'iradio_square-grey'
    });

    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#RefAppt_jqxgrid").jqxGrid(
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
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'APPOINTMENT TYPE',
                  datafield: 'apptType',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'APPOINTMENT DATE',
                  datafield: 'apptDt',
                  width: "15%",
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
                  width: "15%",
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
                  width: "13%",
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
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENT ID',
                  datafield: 'pntId',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
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

    // Event Binding
    $("#RefAppt_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
                
        $("#RefAppt_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#RefAppt_jqxRefProvTxt").val(screenData[selectedRowIndex]["referPrvdr"]);
        $("#RefAppt_jqxTimeTxt").val(screenData[selectedRowIndex]["time"]);
        $("#RefAppt_jqxDescTxt").val(screenData[selectedRowIndex]["descript"]);
        $("#RefAppt_jqxInvPplTxt").val(screenData[selectedRowIndex]["invitePpl"]);
        $("#RefAppt_jqxLocTxt").val(screenData[selectedRowIndex]["lction"]);
        $("#RefAppt_jqxRefReasonTxt").val(screenData[selectedRowIndex]["referRsns"]);
        $("#RefAppt_jqxPatientIdTxt").val(screenData[selectedRowIndex]["pntId"]);
        $("#RefAppt_jqxLastNameTxt").val(screenData[selectedRowIndex]["lstNm"]);
        $("#RefAppt_jqxFirstNameTxt").val(screenData[selectedRowIndex]["frstNm"]);
        $("#RefAppt_jqxFileNumberTxt").val(screenData[selectedRowIndex]["fileNmbr"]);
        $("#RefAppt_jqxPhoneNumberTxt").val(screenData[selectedRowIndex]["phNmbr"]);
        $("#RefAppt_jqxEmailTxt").val(screenData[selectedRowIndex]["email"]);
        
        $("#RefAppt_jqxServiceProvDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["srvPrvdr"], serviceProvSource));
        $("#RefAppt_jqxApptTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["apptType"], apptTypeSource));
        $("#RefAppt_jqxTimePeriodDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["timePrd"], timePeriodSource));
        $("#RefAppt_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gndr"], genderSource));
        
        date = screenData[selectedRowIndex]["apptDt"].split('-');
        if (date != "" && date.length > 2)
            $("#RefAppt_jqxApptDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["dtSch"].split('-');
        if (date != "" && date.length > 2)
            $("#RefAppt_jqxStSchdCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        $("#smsAlert_" + screenData[selectedRowIndex]["smsAlert"]).iCheck('check');
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

    $("#RefAppt_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}