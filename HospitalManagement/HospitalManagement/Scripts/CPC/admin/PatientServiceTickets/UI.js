/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddSrvTxRecord() {
    $("#jqxSrvTxGrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveSrvTxButtonClick() {

    ProgressBar('show');
    selectedRowIndex = $("#jqxSrvTxGrid").jqxGrid("getselectedrowindex");

    var id = "SRVTX?";
    newRow = true;

    if (selectedRowIndex != -1 && selectedRowIndex != null) {
        id = screenData[selectedRowIndex]["id"];
        newRow = false;
    }

    //build doc
    var datacontent = {
        "type": "srvtix",
        "id": id,
        "prior": $("#jqxSrvTxPriorityDdn").jqxDropDownList('getSelectedItem').label,
        "wrkshtLvl": $("#jqxSrvTxWorksheetLevelDdn").jqxDropDownList('getSelectedItem').label,
        "status": $("#jqxSrvTxStatusDdn").jqxDropDownList('getSelectedItem').label,
        "pntId": document.getElementById("jqxSrvTxPatientIdTxt").value,
        "pntLstNm": document.getElementById("jqxSrvTxPatientLastNameTxt").value,
        "pntFrstNm": document.getElementById("jqxSrvTxPatientFirstNameTxt").value,
        "gndr": $("#jqxSrvTixGenderDdn").jqxDropDownList('getSelectedItem').label,
        "pntMobNmbr": document.getElementById("jqxSrvTxPatientMobileNumberTxt").value,
        "prvdrLstNm": document.getElementById("jqxSrvTxProviderLastNameTxt").value,
        "prvdrFrstNm": document.getElementById("jqxSrvTxProviderFirstNameTxt").value,
        "prvdrType": $("#jqxSrvTxProviderTypeDdn").jqxDropDownList('getSelectedItem').label,
        "genSrce": $("#jqxSrvTixGenSourceDdn").jqxDropDownList('getSelectedItem').label,
        "reason": $("#jqxSrvTixReasonDdn").jqxDropDownList('getSelectedItem').label,
        "desc": document.getElementById("jqxSrvTxServiceTicketDescriptTxt").value,

    };
    CreateNewSrvTxRecord(id, newRow, datacontent);
}

// DELETE
function deleteSrvTxButtonClick() {
    ProgressBar('show');
    var srvTixID = $("#sideSrvTxID").text()
    DeleteSrvTxRecord(srvTixID);
}

// CANCEL
function CancelSrvTxRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#jqxSrvTxGrid").jqxGrid("selectrow", selectedRowIndex);
}

function ViewSrvTickets() {
    $("#dtlsSrvTxGrid").hide();
    $("#ticket_tickets").show();

}
/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid getElembyid = html5, $ (selector) = jquery
function UpdateGridData(srvTixId) {
    var newdata = {};

    newdata["id"] = srvTixId,
    newdata["prior"] = $("#jqxSrvTxPriorityDdn").jqxDropDownList('getSelectedItem').label,
    newdata["wrkshtLvl"] = $("#jqxSrvTxWorksheetLevelDdn").jqxDropDownList('getSelectedItem').label,
    newdata["status"] = $("#jqxSrvTxStatusDdn").jqxDropDownList('getSelectedItem').label,
    newdata["pntId"] = document.getElementById("jqxSrvTxPatientIdTxt").value,
    newdata["pntLstNm"] = document.getElementById("jqxSrvTxPatientLastNameTxt").value,
    newdata["pntFrstNm"] = document.getElementById("jqxSrvTxPatientFirstNameTxt").value,
    newdata["gndr"] = $("#jqxSrvTixGenderDdn").jqxDropDownList('getSelectedItem').label,
    newdata["pntMobNmbr"] = document.getElementById("jqxSrvTxPatientMobileNumberTxt").value,
    newdata["prvdrLstNm"] = document.getElementById("jqxSrvTxProviderLastNameTxt").value,
    newdata["prvdrFrstNm"] = document.getElementById("jqxSrvTxProviderFirstNameTxt").value,
    newdata["prvdrType"] = $("#jqxSrvTxProviderTypeDdn").jqxDropDownList('getSelectedItem').label,
    newdata["genSrce"] = $("#jqxSrvTixGenSourceDdn").jqxDropDownList('getSelectedItem').label,
    newdata["reason"] = $("#jqxSrvTixReasonDdn").jqxDropDownList('getSelectedItem').label,
    newdata["desc"] = document.getElementById("jqxSrvTxServiceTicketDescriptTxt").value,
    screenData[screenData.length] = newdata;

    JSON.stringify(newdata);
    // add row
    if (newRow) {
        newdata["id"] = srvTixId;
        var commit = $("#jqxSrvTxGrid").jqxGrid('addrow', screenData.length, newdata);
        $("#jqxSrvTxGrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        screenData[screenData.length] = newdata;
        var selectedRow = $("#jqxSrvTxGrid").jqxGrid('getselectedrowindex');
        $('#jqxSrvTxGrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#sideSrvTxID").text("");
    $("#jqxSrvTxPriorityDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTxWorksheetLevelDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTxStatusDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTxPatientIdTxt").val("");
    $("#jqxSrvTxPatientLastNameTxt").val("");
    $("#jqxSrvTxPatientFirstNameTxt").val("");
    $("#jqxSrvTixGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTxPatientMobileNumberTxt").val("");
    $("#jqxSrvTxProviderLastNameTxt").val("");
    $("#jqxSrvTxProviderFirstNameTxt").val("");
    $("#jqxSrvTxProviderTypeDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTixGenSourceDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTixReasonDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSrvTxServiceTicketDescriptTxt").val("");

    $("#srvTxProfileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#jqxSrvTxBtnUpload").css("display", "");

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