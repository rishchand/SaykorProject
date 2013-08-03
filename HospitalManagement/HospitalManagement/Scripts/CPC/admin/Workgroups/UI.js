/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#WorkGroup_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

function SelectProvider() {
    //$('#window').jqxWindow('open');
    $("#selectProviderPopUp").dialog("open");
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#WorkGroup_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "WKGRP?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("WorkGroup_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "workgroup",
        
        "id": document.getElementById("WorkGroup_jqxIdTxt").value,
        "NmRsrchGrp": document.getElementById("WorkGroup_jqxNmRsrchGrpTxt").value,
        "descript": document.getElementById("WorkGroup_jqxDescriptTxt").value,
        "ownId": document.getElementById("WorkGroup_jqxOwnIdTxt").value,
        "owner": document.getElementById("WorkGroup_jqxOwnerTxt").value,
        "mobPhone": document.getElementById("WorkGroup_jqxMobPhoneTxt").value,
        "wrkPhone": document.getElementById("WorkGroup_jqxWrkPhoneTxt").value,
        "centerAdmin": document.getElementById("WorkGroup_jqxCenterAdminTxt").value,
        "patients": document.getElementById("WorkGroup_jqxPatientsTxt").value,
        "providers": document.getElementById("WorkGroup_jqxPatientsTxt").value,

        "wrkgrpType": $("#WorkGroup_jqxWorkgroupTypeTxtDdn").jqxDropDownList('getSelectedItem').label,
        "ownType": $("#WorkGroup_jqxOwnTypeTxtDdn").jqxDropDownList('getSelectedItem').label,
        "gender": $("#WorkGroup_jqxGenderDdn").jqxDropDownList('getSelectedItem').label,
        "prjct": $("#WorkGroup_jqxPrjctDdn").jqxDropDownList('getSelectedItem').label,
        "center": $("#WorkGroup_jqxCenterDdn").jqxDropDownList('getSelectedItem').label,
        "site": $("#WorkGroup_jqxSiteDdn").jqxDropDownList('getSelectedItem').label,
        "servicesAvail": $("#WorkGroup_jqxServicesAvailDdn").jqxDropDownList('getSelectedItem').label

    };
    CreateNewPtntGrpRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#WorkGroup_jqxIdTxt").attr('value');
    DeletePtntGrpRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#WorkGroup_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"] = "workgroup";
        
    newdata["NmRsrchGrp"] = document.getElementById("WorkGroup_jqxNmRsrchGrpTxt").value;
    newdata["descript"] = document.getElementById("WorkGroup_jqxDescriptTxt").value;
    newdata["ownId"] = document.getElementById("WorkGroup_jqxOwnIdTxt").value;
    newdata["owner"] = document.getElementById("WorkGroup_jqxOwnerTxt").value;
    newdata["mobPhone"] = document.getElementById("WorkGroup_jqxMobPhoneTxt").value;
    newdata["wrkPhone"] = document.getElementById("WorkGroup_jqxWrkPhoneTxt").value;
    newdata["centerAdmin"] = document.getElementById("WorkGroup_jqxCenterAdminTxt").value;
    newdata["patients"] = document.getElementById("WorkGroup_jqxPatientsTxt").value;
    newdata["providers"] = document.getElementById("WorkGroup_jqxProvidersTxt").value;

    newdata["wrkgrpType"] = $("#WorkGroup_jqxWorkgroupTypeTxtDdn").jqxDropDownList('getSelectedItem').label;
    newdata["ownType"] = $("#WorkGroup_jqxOwnTypeTxtDdn").jqxDropDownList('getSelectedItem').label;
    newdata["gender"] = $("#WorkGroup_jqxGenderDdn").jqxDropDownList('getSelectedItem').label;
    newdata["prjct"] = $("#WorkGroup_jqxPrjctDdn").jqxDropDownList('getSelectedItem').label;
    newdata["center"] = $("#WorkGroup_jqxCenterDdn").jqxDropDownList('getSelectedItem').label;
    newdata["site"] = $("#WorkGroup_jqxSiteDdn").jqxDropDownList('getSelectedItem').label;
    newdata["servicesAvail"] = $("#WorkGroup_jqxServicesAvailDdn").jqxDropDownList('getSelectedItem').label;
    
    alert();
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#WorkGroup_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#WorkGroup_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#WorkGroup_jqxgrid").jqxGrid('getselectedrowindex');
        $('#WorkGroup_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#WorkGroup_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#WorkGroup_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#WorkGroup_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#WorkGroup_sideTableID").text("");
    $("#WorkGroup_profileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#WorkGroup_jqxButtonUpload").css("display", "");

    $("#WorkGroup_jqxIdTxt").val("");
    $("#WorkGroup_jqxNmRsrchGrpTxt").val("");
    $("#WorkGroup_jqxDescriptTxt").val("");
    $("#WorkGroup_jqxOwnIdTxt").val("");
    $("#WorkGroup_jqxOwnerTxt").val("");
    $("#WorkGroup_jqxMobPhoneTxt").val("");
    $("#WorkGroup_jqxWrkPhoneTxt").val("");
    $("#WorkGroup_jqxCenterAdminTxt").val("");
    $("#WorkGroup_jqxPatientsTxt").val("");
    $("#WorkGroup_jqxProvidersTxt").val("");

    $("#WorkGroup_jqxWorkgroupTypeTxtDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxOwnTypeTxtDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxPrjctDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxCenterDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxSiteDdn").jqxDropDownList('selectIndex', -1);
    $("#WorkGroup_jqxServicesAvailDdn").jqxDropDownList('selectIndex', -1);
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