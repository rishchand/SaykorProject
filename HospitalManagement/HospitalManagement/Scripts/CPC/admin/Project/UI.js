/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#project_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#project_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "PRJT?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("project_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "project",
        
        "id": id,
        "prjctName": $("#project_jqxProjNameDdn").jqxDropDownList('getSelectedItem').label,
        "projVal": document.getElementById("project_jqxProjDolValTxt").value,
        "projDesc": document.getElementById("project_jqxProjDescTxt").value,
        "projSpons": document.getElementById("project_jqxProjSponTxt").value,
        "regAdmId": document.getElementById("project_jqxRegAdmIdTxt").value,
        "regAdm": document.getElementById("project_jqxRegAdmTxt").value,
        "mobPhone": document.getElementById("project_jqxMobPhoneTxt").value,
        "gender": $("#project_jqxGenderDdn").jqxDropDownList('getSelectedItem').label,
        "workPhone": document.getElementById("project_jqxWrkPhoneTxt").value,
        "center": $("#project_jqxCenterDdn").jqxDropDownList('getSelectedItem').label,
        "sites": $("#project_jqxSiteDdn").jqxDropDownList('getSelectedItem').label,
        "prvdrTeamNm": $("#project_jqxProvTeamNameDdn").jqxDropDownList('getSelectedItem').label,
        "pnlGrp": $("#project_jqxPanelGrpDdn").jqxDropDownList('getSelectedItem').label
    };
    CreateNewProjectRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var projID = $("#project_jqxIdTxt").attr('value');
    DeleteProjectRecord(projID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#project_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"]= "project";
        
    newdata["projVal"]= document.getElementById("project_jqxProjDolValTxt").value;
    newdata["projDesc"]= document.getElementById("project_jqxProjDescTxt").value;
    newdata["projSpons"]= document.getElementById("project_jqxProjSponTxt").value;
    newdata["regAdmId"]= document.getElementById("project_jqxRegAdmIdTxt").value;
    newdata["regAdm"]= document.getElementById("project_jqxRegAdmTxt").value;
    newdata["mobPhone"]= document.getElementById("project_jqxMobPhoneTxt").value;
    newdata["workPhone"]= document.getElementById("project_jqxWrkPhoneTxt").value;

    newdata["prjctName"]= $("#project_jqxProjNameDdn").jqxDropDownList('getSelectedItem').label;
    newdata["gender"]= $("#project_jqxGenderDdn").jqxDropDownList('getSelectedItem').label;
    newdata["center"]= $("#project_jqxCenterDdn").jqxDropDownList('getSelectedItem').label;
    newdata["sites"]= $("#project_jqxSiteDdn").jqxDropDownList('getSelectedItem').label;
    newdata["prvdrTeamNm"]= $("#project_jqxProvTeamNameDdn").jqxDropDownList('getSelectedItem').label;
    newdata["pnlGrp"]= $("#project_jqxPanelGrpDdn").jqxDropDownList('getSelectedItem').label;

    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#project_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#project_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#project_jqxgrid").jqxGrid('getselectedrowindex');
        $('#project_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#project_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#project_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#project_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#project_jqxIdTxt").val("");
    $("#project_jqxProjDolValTxt").val("");
    $("#project_jqxProjDescTxt").val("");
    $("#project_jqxProjSponTxt").val("");
    $("#project_jqxRegAdmIdTxt").val("");
    $("#project_jqxRegAdmTxt").val("");
    $("#project_jqxMobPhoneTxt").val("");
    $("#project_jqxWrkPhoneTxt").val("");

    $("#project_jqxProjNameDdn").jqxDropDownList('selectIndex', -1);
    $("#project_jqxGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#project_jqxCenterDdn").jqxDropDownList('selectIndex', -1);
    $("#project_jqxSiteDdn").jqxDropDownList('selectIndex', -1);
    $("#project_jqxProvTeamNameDdn").jqxDropDownList('selectIndex', -1);
    $("#project_jqxPanelGrpDdn").jqxDropDownList('selectIndex', -1);
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