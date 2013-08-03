/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#Rx_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#Rx_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "RX?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("Rx_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "rx",
        
        "id": document.getElementById("Rx_jqxIdTxt").value,
        "gnricDrugName": document.getElementById("Rx_jqxGenericDrugNameTxt").value,
        "tradeName": document.getElementById("Rx_jqxBRandDrugNamesTxt").value,
        "drugDescr": document.getElementById("Rx_jqxDescriptionTxt").value,
        "usedFor": document.getElementById("Rx_jqxUserForTxt").value,
        "sideEffects": document.getElementById("Rx_jqxSideEffectsTxt").value,

        "drugType": document.getElementById("Rx_jqxDrugTypeDdn").value,
        "inTake": document.getElementById("Rx_jqxIntakeDdn").value,
        "form": $("#Rx_jqxFormDdn").jqxDropDownList('getSelectedItem').label,
        "color": $("#Rx_jqxColorDdn").jqxDropDownList('getSelectedItem').label,
        "shape": $("#Rx_jqxShapeDdn").jqxDropDownList('getSelectedItem').label
    };
    CreateNewRxRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#Rx_jqxIdTxt").attr('value');
    DeleteRxRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#Rx_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"] = "rx";
        
    newdata["gnricDrugName"] = document.getElementById("Rx_jqxGenericDrugNameTxt").value;
    newdata["tradeName"] = document.getElementById("Rx_jqxBRandDrugNamesTxt").value;
    newdata["drugDescr"] = document.getElementById("Rx_jqxDescriptionTxt").value;
    newdata["usedFor"] = document.getElementById("Rx_jqxUserForTxt").value;
    newdata["sideEffects"] = document.getElementById("Rx_jqxSideEffectsTxt").value;

    newdata["drugType"] = $("#Rx_jqxDrugTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["inTake"] = $("#Rx_jqxIntakeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["form"] = $("#Rx_jqxFormDdn").jqxDropDownList('getSelectedItem').label;
    newdata["color"] = $("#Rx_jqxColorDdn").jqxDropDownList('getSelectedItem').label;
    newdata["shape"] = $("#Rx_jqxShapeDdn").jqxDropDownList('getSelectedItem').label;
    
    
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#Rx_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#Rx_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#Rx_jqxgrid").jqxGrid('getselectedrowindex');
        $('#Rx_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#Rx_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#Rx_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#Rx_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";

    $("#Rx_jqxIdTxt").val("");
    $("#Rx_jqxGenericDrugNameTxt").val("");
    $("#Rx_jqxBRandDrugNamesTxt").val("");
    $("#Rx_jqxDescriptionTxt").val("");
    $("#Rx_jqxUserForTxt").val("");
    $("#Rx_jqxSideEffectsTxt").val("");

    $("#Rx_jqxDrugTypeDdn").jqxDropDownList('selectIndex', -1);
    $("#Rx_jqxIntakeDdn").jqxDropDownList('selectIndex', -1);
    $("#Rx_jqxFormDdn").jqxDropDownList('selectIndex', -1);
    $("#Rx_jqxColorDdn").jqxDropDownList('selectIndex', -1);
    $("#Rx_jqxShapeDdn").jqxDropDownList('selectIndex', -1);
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