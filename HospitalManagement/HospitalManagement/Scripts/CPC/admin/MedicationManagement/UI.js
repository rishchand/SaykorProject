/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#PatientGroup_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

function SelectPatient() {
    $('#window').jqxWindow('open');
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#pg_jqxMedicationListGrid").jqxGrid("getselectedrowindex");
    var id = "PNTMED?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("pg_jqxMedicationListGrid").value;
        newRow = false;
    }
    var datacontent = {
        "type": "pntmed",
        
        "id": document.getElementById("MedDtls_jqxIdTxt").value,
        "pntId": document.getElementById("MedDtls_jqxPatientIdTxt").value,
        "dtPres": document.getElementById("MedDtls_jqxDatePresTxt").value,
        "medIdent": document.getElementById("MedDtls_jqxMedIdentifierTxt").value,
        "lstNm": document.getElementById("MedDtls_jqxLastNameTxt").value,
        "frstNm": document.getElementById("MedDtls_jqxFirstNameTxt").value,
        "gndr": $("#MedDtls_jqxGenderDdn").jqxDropDownList('getSelectedItem').label,
        "usedDrugs": $("#MedDtls_jqxCommUsedDrugDdn").jqxDropDownList('getSelectedItem').label,
        "drgCl": $("#MedDtls_jqxDrugClassDdn").jqxDropDownList('getSelectedItem').label,
        "drgNm": $("#MedDtls_jqxDrugNameDdn").jqxDropDownList('getSelectedItem').label,
        "medStDt": $("#MedDtls_jqxMedStrtDtCal").val(),
        "medEdDt": $("#MedDtls_jqxMedEndDtCal").val(),
        "freqofAdm": $("#MedDtls_jqxFregOfAdDdn").jqxDropDownList('getSelectedItem').label,
        "medTime": $("#MedDtls_jqxMedTimeDdn").jqxDropDownList('getSelectedItem').label,
        "intake": $("#MedDtls_jqxIntakeDdn").jqxDropDownList('getSelectedItem').label,
        "dosage": document.getElementById("MedDtls_jqxDosageTxt").value,
        "rmdr": $("input[name='reminderRdo']:checked").val(),
        "prvdId": document.getElementById("MedDtls_jqxProviderIdTxt").value,
        "prvdLsNm": document.getElementById("MedDtls_jqxProviderLastNameTxt").value,
        "prvdFrstNm": document.getElementById("MedDtls_jqxProviderFirstNameTxt").value
    };
    CreateNewMedicationRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#MedDtls_jqxIdTxt").attr('value');
    DeletePtntGrpRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#pg_jqxMedicationListGrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    newdata["type"] = "pntmed";
        
    newdata["id"] = document.getElementById("MedDtls_jqxIdTxt").value;
    newdata["pntId"] = document.getElementById("MedDtls_jqxPatientIdTxt").value;
    newdata["dtPres"] = document.getElementById("MedDtls_jqxDatePresTxt").value;
    newdata["medIdent"] = document.getElementById("MedDtls_jqxMedIdentifierTxt").value;
    newdata["lstNm"] = document.getElementById("MedDtls_jqxLastNameTxt").value;
    newdata["frstNm"] = document.getElementById("MedDtls_jqxFirstNameTxt").value;
    newdata["gndr"] = $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["usedDrugs"] = $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["drgCl"] = $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["drgNm"] = $("#PatientGroup_jqxProviderTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["medStDt"] = $("#MedDtls_jqxMedStrtDtCal").val();
    newdata["medEdDt"] = $("#MedDtls_jqxMedEndDtCal").val();
    newdata["freqofAdm"] = $("#MedDtls_jqxFregOfAdDdn").jqxDropDownList('getSelectedItem').label;
    newdata["medTime"] = $("#MedDtls_jqxMedTimeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["intake"] = $("#MedDtls_jqxIntakeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["dosage"] = document.getElementById("MedDtls_jqxDosageTxt").value;
    newdata["rmdr"] = $("input[name='reminderRdo']:checked").val();
    newdata["prvdId"] = document.getElementById("MedDtls_jqxProviderIdTxt").value;
    newdata["prvdLsNm"] = document.getElementById("MedDtls_jqxProviderLastNameTxt").value;
    newdata["prvdFrstNm"] = document.getElementById("MedDtls_jqxProviderFirstNameTxt").value;
    
    
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#pg_jqxMedicationListGrid").jqxGrid('addrow', screenData.length, newdata);
        $("#pg_jqxMedicationListGrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#pg_jqxMedicationListGrid").jqxGrid('getselectedrowindex');
        $('#pg_jqxMedicationListGrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#pg_jqxMedicationListGrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#pg_jqxMedicationListGrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#pg_jqxMedicationListGrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#MedDtls_jqxIdTxt").val("");
    $("#MedDtls_jqxPatientIdTxt").val("");
    $("#MedDtls_jqxDatePresTxt").val("");
    $("#MedDtls_jqxMedIdentifierTxt").val("");
    $("#MedDtls_jqxLastNameTxt").val("");
    $("#MedDtls_jqxFirstNameTxt").val("");

    $("#MedDtls_jqxGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#MedDtls_jqxCommUsedDrugDdn").jqxDropDownList('selectIndex', -1);
    $("#MedDtls_jqxDrugClassDdn").jqxDropDownList('selectIndex', -1);
    $("#MedDtls_jqxDrugNameDdn").jqxDropDownList('selectIndex', -1);

    $("#MedDtls_jqxMedStrtDtCal").val("");
    $("#MedDtls_jqxMedEndDtCal").val("");

    $("#MedDtls_jqxFregOfAdDdn").jqxDropDownList('selectIndex', -1);
    $("#MedDtls_jqxMedTimeDdn").jqxDropDownList('selectIndex', -1);
    $("#MedDtls_jqxIntakeDdn").jqxDropDownList('selectIndex', -1);

    $("#MedDtls_jqxDosageTxt").val("");
    $("#reminder_yes").iCheck('check');
    $("#MedDtls_jqxProviderIdTxt").val("");
    $("#MedDtls_jqxProviderLastNameTxt").val("");
    $("#MedDtls_jqxProviderFirstNameTxt").val("");
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