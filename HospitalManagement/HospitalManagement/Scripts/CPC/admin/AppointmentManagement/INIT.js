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

    InitializeCalendar();
});

function InitializeSplitters() {
    $("#appointmentExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "470px", theme: "custom",
    });
}

function InitializeCalendar() {
    // Buttons
    $("#appointment_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#appointment_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#appointment_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });

    // TextBoxes    
    $("#Appt_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxTextTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxDetailsTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxRefProvTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxServiceProvTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxTimeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxDescTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxInvPplTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxLocTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxRefReasonTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxPatientIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxFileNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxPhoneNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#Appt_jqxEmailTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#Appt_jqxApptTypeDdn").jqxDropDownList({ source: apptTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Appt_jqxTimePeriodDdn").jqxDropDownList({ source: timePeriodSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#Appt_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Calendar
    $("#Appt_jqxApptDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#Appt_jqxStSchdCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#Appt_jqxStartDtTimeCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd hh:mm tt' });
    $("#Appt_jqxEndDtTimeCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd hh:mm tt' });

    // Radio Buttons
    $('input').iCheck({
        radioClass: 'iradio_square-grey'
    });
}
