/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#disease_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#disease_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "DIS?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("disease_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "disease",

        "id": id,
        "diseaseCd": document.getElementById("disease_jqxDiseaseCodeTxt").value,
        "sqnce": document.getElementById("disease_jqxSequenceTxt").value,
        "diseaseNm": document.getElementById("disease_jqxDiseaseNameTxt").value,
        "isVal": $("input[name='diseaseIsValidRdo']:checked").val(),
        "gbName": document.getElementById("disease_jqxGBNameTxt").value,
        "diseaseCtgry": $("#disease_jqxDiseaseCatgDdn").jqxDropDownList('getSelectedItem').label,
        "dgnsedRles": document.getElementById("disease_jqxDiagRulesTxt").value,
        "highrskRles": document.getElementById("disease_jqxHighRiskRulesTxt").value,
        "intrmdiaterRskRles": document.getElementById("disease_jqxInterRiskRulesTxt").value,
        "nrmlRules": document.getElementById("disease_jqxNormalRulesTxt").value,
        "emrgncyLnks": document.getElementById("disease_jqxEmgRulesTxt").value
    };
    CreateNewDiseasesbyidRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#disease_jqxIdTxt").attr('value');
    DeleteDiseaseRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#disease_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"] = "disease";
        
    newdata["diseaseCd"] = document.getElementById("disease_jqxDiseaseCodeTxt").value;
    newdata["sqnce"] = document.getElementById("disease_jqxSequenceTxt").value;
    newdata["diseaseNm"] = document.getElementById("disease_jqxDiseaseNameTxt").value;
    newdata["isVal"] = $("input[name='diseaseIsValidRdo']:checked").val();
    newdata["gbName"] = document.getElementById("disease_jqxGBNameTxt").value;
    newdata["dgnsedRles"] = document.getElementById("disease_jqxDiagRulesTxt").value;
    newdata["highrskRles"] = document.getElementById("disease_jqxHighRiskRulesTxt").value;
    newdata["intrmdiaterRskRles"] = document.getElementById("disease_jqxInterRiskRulesTxt").value;
    newdata["nrmlRules"] = document.getElementById("disease_jqxNormalRulesTxt").value;
    newdata["emrgncyLnks"] = document.getElementById("disease_jqxEmgRulesTxt").value;

    newdata["diseaseCtgry"] = $("#disease_jqxDiseaseCatgDdn").jqxDropDownList('getSelectedItem').label;

    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#disease_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#disease_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#disease_jqxgrid").jqxGrid('getselectedrowindex');
        $('#disease_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#disease_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#disease_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#disease_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#disease_jqxIdTxt").val("");
    $("#disease_jqxDiseaseCodeTxt").val("");
    $("#disease_jqxSequenceTxt").val("");
    $("#disease_jqxDiseaseNameTxt").val("");
    $("#diseaseIsValid_yes").iCheck('check');
    $("#disease_jqxGBNameTxt").val("");
    $("#disease_jqxDiagRulesTxt").val("");
    $("#disease_jqxHighRiskRulesTxt").val("");
    $("#disease_jqxInterRiskRulesTxt").val("");
    $("#disease_jqxNormalRulesTxt").val("");
    $("#disease_jqxEmgRulesTxt").val("");

    $("#disease_jqxDiseaseCatgDdn").jqxDropDownList('selectIndex', -1);
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