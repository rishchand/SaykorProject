/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#PatientGroup_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

function SelectPatient() {
    //$('#window').jqxWindow('open');
    $("#selectPatientPopUp").dialog("open");
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#PatientGroup_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "PNTGRP?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("PatientGroup_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "patientgroup",
        
        "id": document.getElementById("PatientGroup_jqxIdTxt").value,
        "grpName": document.getElementById("PatientGroup_jqxPatientGroupNameTxt").value,
        "grpDesc": document.getElementById("PatientGroup_jqxPatientGroupDescTxt").value,
        "prvdrInCharge": document.getElementById("PatientGroup_jqxProviderInChargeTxt").value,
        "prvdrResponsible": document.getElementById("PatientGroup_jqxProviderGroupTxt").value,
        "sortBy": document.getElementById("PatientGroup_jqxSortByTxt").value,
        "isEnabled": document.getElementById("PatientGroup_jqxIsEnabledTxt").value,
        "patients": document.getElementById("PatientGroup_jqxPatientsTxt").value,

        "prvdrType": $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label
    };
    CreateNewPtntGrpRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#PatientGroup_jqxIdTxt").attr('value');
    DeletePtntGrpRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#PatientGroup_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    newdata["type"] = "patientgroup";
        
    newdata["grpName"] = document.getElementById("PatientGroup_jqxPatientGroupNameTxt").value;
    newdata["grpDesc"] = document.getElementById("PatientGroup_jqxPatientGroupDescTxt").value;
    newdata["prvdrInCharge"] = document.getElementById("PatientGroup_jqxProviderInChargeTxt").value;
    newdata["prvdrResponsible"] = document.getElementById("PatientGroup_jqxProviderGroupTxt").value;
    newdata["sortBy"] = document.getElementById("PatientGroup_jqxSortByTxt").value;
    newdata["isEnabled"] = document.getElementById("PatientGroup_jqxIsEnabledTxt").value;
    newdata["patients"] = document.getElementById("PatientGroup_jqxPatientsTxt").value;

    newdata["prvdrType"] = $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label;
    
    
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#PatientGroup_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#PatientGroup_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#PatientGroup_jqxgrid").jqxGrid('getselectedrowindex');
        $('#PatientGroup_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#PatientGroup_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#PatientGroup_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#PatientGroup_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#PatientGroup_sideTableID").text("");
    $("#PatientGroup_profileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#PatientGroup_jqxButtonUpload").css("display", "");

    $("#PatientGroup_jqxIdTxt").val("");
    $("#PatientGroup_jqxPatientGroupNameTxt").val("");
    $("#PatientGroup_jqxPatientGroupDescTxt").val("");
    $("#PatientGroup_jqxProviderInChargeTxt").val("");
    $("#PatientGroup_jqxProviderGroupTxt").val("");
    $("#PatientGroup_jqxSortByTxt").val("");
    $("#PatientGroup_jqxIsEnabledTxt").val("");
    $("#PatientGroup_jqxPatientsTxt").val("");

    $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('selectIndex', -1);
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