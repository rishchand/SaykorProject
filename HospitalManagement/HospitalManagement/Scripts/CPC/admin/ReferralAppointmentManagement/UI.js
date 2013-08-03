/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#RefAppt_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#RefAppt_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "APPT?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("RefAppt_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "appt",
        "id": id,
        "referPrvdr": document.getElementById("RefAppt_jqxRefProvTxt").value,
        "time": document.getElementById("RefAppt_jqxTimeTxt").value,
        "descript": document.getElementById("RefAppt_jqxDescTxt").value,
        "invitePpl": document.getElementById("RefAppt_jqxInvPplTxt").value,
        "lction": document.getElementById("RefAppt_jqxLocTxt").value,
        "referRsns": document.getElementById("RefAppt_jqxRefReasonTxt").value,
        "pntId": document.getElementById("RefAppt_jqxPatientIdTxt").value,
        "lstNm": document.getElementById("RefAppt_jqxLastNameTxt").value,
        "frstNm": document.getElementById("RefAppt_jqxFirstNameTxt").value,
        "fileNmbr": document.getElementById("RefAppt_jqxFileNumberTxt").value,
        "phNmbr": document.getElementById("RefAppt_jqxPhoneNumberTxt").value,
        "email": document.getElementById("RefAppt_jqxEmailTxt").value,

        "srvPrvdr": $("#RefAppt_jqxApptTypeDdn").jqxDropDownList('getSelectedItem').label,
        "apptType": $("#RefAppt_jqxApptTypeDdn").jqxDropDownList('getSelectedItem').label,
        "timePrd": $("#RefAppt_jqxTimePeriodDdn").jqxDropDownList('getSelectedItem').label,
        "gndr": $("#RefAppt_jqxGenderDdn").jqxDropDownList('getSelectedItem').label,

        "apptDt": $("#RefAppt_jqxApptDtCal").val(),
        "dtSch": $("#RefAppt_jqxStSchdCal").val(),

        "smsAlert": $("input[name='smsAlertRdo']:checked").val()
    };
    CreateNewRefApptRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#RefAppt_jqxIdTxt").attr('value');
    DeleteRefApptRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#RefAppt_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

function OffServProvDtls() {
    var options = {};
    if ($("#effect").is(":visible")) {
        $("#effect").toggle("highlight", options, 500);
        $("#servProvDtlsSwitch").hide();
    }
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"] = "appt";
        
    newdata["referPrvdr"] = document.getElementById("RefAppt_jqxRefProvTxt").value;
    newdata["time"] = document.getElementById("RefAppt_jqxTimeTxt").value;
    newdata["descript"] = document.getElementById("RefAppt_jqxDescTxt").value;
    newdata["invitePpl"] = document.getElementById("RefAppt_jqxInvPplTxt").value;
    newdata["lction"] = document.getElementById("RefAppt_jqxLocTxt").value;
    newdata["referRsns"] = document.getElementById("RefAppt_jqxRefReasonTxt").value;
    newdata["pntId"] = document.getElementById("RefAppt_jqxPatientIdTxt").value;
    newdata["lstNm"] = document.getElementById("RefAppt_jqxLastNameTxt").value;
    newdata["frstNm"] = document.getElementById("RefAppt_jqxFirstNameTxt").value;
    newdata["fileNmbr"] = document.getElementById("RefAppt_jqxFileNumberTxt").value;
    newdata["phNmbr"] = document.getElementById("RefAppt_jqxPhoneNumberTxt").value;
    newdata["email"] = document.getElementById("RefAppt_jqxEmailTxt").value;

    
    newdata["srvPrvdr"] = $("#RefAppt_jqxServiceProvDdn").jqxDropDownList('getSelectedItem').label;
    newdata["apptType"] = $("#RefAppt_jqxApptTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["timePrd"] = $("#RefAppt_jqxTimePeriodDdn").jqxDropDownList('getSelectedItem').label;
    newdata["gndr"] = $("#RefAppt_jqxGenderDdn").jqxDropDownList('getSelectedItem').label;

    newdata["apptDt"] = $("#RefAppt_jqxApptDtCal").val();
    newdata["dtSch"] = $("#RefAppt_jqxStSchdCal").val();

    newdata["smsAlert"] = $("input[name='smsAlertRdo']:checked").val();
    
    
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#RefAppt_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#RefAppt_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#RefAppt_jqxgrid").jqxGrid('getselectedrowindex');
        $('#RefAppt_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#RefAppt_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#RefAppt_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#RefAppt_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";

    $("#RefAppt_jqxIdTxt").val("");
    $("#RefAppt_jqxRefProvTxt").val("");
    $("#RefAppt_jqxTimeTxt").val("");
    $("#RefAppt_jqxDescTxt").val("");
    $("#RefAppt_jqxInvPplTxt").val("");
    $("#RefAppt_jqxLocTxt").val("");
    $("#RefAppt_jqxRefReasonTxt").val("");
    $("#RefAppt_jqxPatientIdTxt").val("");
    $("#RefAppt_jqxLastNameTxt").val("");
    $("#RefAppt_jqxFirstNameTxt").val("");
    $("#RefAppt_jqxFileNumberTxt").val("");
    $("#RefAppt_jqxPhoneNumberTxt").val("");
    $("#RefAppt_jqxEmailTxt").val("");

    
    $("#RefAppt_jqxServiceProvDdn").jqxDropDownList('selectIndex', -1);
    $("#RefAppt_jqxApptTypeDdn").jqxDropDownList('selectIndex', -1);
    $("#RefAppt_jqxTimePeriodDdn").jqxDropDownList('selectIndex', -1);
    $("#RefAppt_jqxGenderDdn").jqxDropDownList('selectIndex', -1);

    $("#RefAppt_jqxApptDtCal").val("");
    $("#RefAppt_jqxStSchdCal").val("");

    $("#smsAlert_yes").iCheck('check');
}

// show/hide progress bar
function ProgressBar(display) {
    if (display == 'show') {
        $("#progressContainer").removeClass("progressLabelHidden");
        $("#progressContainer").addClass("progressLabelVisible");
    }
    else {
        $("#progressContainer").removeClass("progressLabelVisible");
        $("#progressContainer").addClass("progressLabelHidden");
    }
}