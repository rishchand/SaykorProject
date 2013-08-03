/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddCenterRecord() {
    $("#jqxCentergrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveCenterButtonClick() {
    ProgressBar('show');
    //alert('in ssave');

    selectedRowIndex = $("#jqxCentergrid").jqxGrid("getselectedrowindex");

    ///alert(selectedRowIndex);
    var id = "CNTR?";
    newRow = true;

    if (selectedRowIndex != -1 && selectedRowIndex != null) {
        id = screenData[selectedRowIndex]["id"];
        newRow = false;
    }

    //build doc
    var datacontent = {
        "type": "center",
        "id": id,
        "cntr": $("#jqxCntNameDdn").jqxDropDownList('getSelectedItem').label,
        "drctorId": document.getElementById("jqxCntDirectorIdTxt").value,
        "drctor": document.getElementById("jqxCntDirectorTxt").value,
        "cntrtDate": $("#jqxCntContractDateCal").val(),
        "descript": document.getElementById("jqxCntContractDescriptionTxt").value,
        "prjctId": document.getElementById("jqxCntProjectIdTxt").value,
        "project": $("#jqxCntProjectNameDdn").jqxDropDownList('getSelectedItem').label,
        "siteName": $("#jqxCntSitesDdn").jqxDropDownList('getSelectedItem').label,
        "servicesAvail": $("#jqxCntServicesAvailDdn").jqxDropDownList('getSelectedItem').label,
        "permProvince": document.getElementById("jqxCntPermanentProvinceTxt").value,
        "permCity": document.getElementById("jqxCntPermanentCityTxt").value,
        "permDistrict": $("#jqxCntPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "permStreetName": document.getElementById("jqxCntPermanentStreetNameTxt").value,
        "permStreetNumber": document.getElementById("jqxCntPermanentStreetNumberTxt").value,
        "permPostalCode": document.getElementById("jqxCntPermanentPostalCodeTxt").value,
        "mailProvince": document.getElementById("jqxCntMailingProvinceTxt").value,
        "mailCity": document.getElementById("jqxCntMailingCityTxt").value,
        "mailDistrict": $("#jqxCntMailingDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "mailtStreetName": document.getElementById("jqxCntMailingStreetNameTxt").value,
        "mailStreetNumber": document.getElementById("jqxCntMailingStreetNumberTxt").value,
        "mailPostalCode": document.getElementById("jqxCntMailingPostalCodeTxt").value,
        
    };

    CreateNewCenterRecord(id, newRow, datacontent);
}

// DELETE
function deleteCenterButtonClick() {
    ProgressBar('show');
    var centerID = document.getElementById("jqxCntIdTxt").value;
    DeleteProviderRecord(centerID);
}

// CANCEL
function CancelCenterRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#jqxCentergrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid getElembyid = html5, $ (selector) = jquery
function UpdateGridData(cntId)
{
    var newdata = {};
    
    newdata["id"] = cntId,
    newdata["cntr"] = $("#jqxCntNameDdn").jqxDropDownList('getSelectedItem').label,
    newdata["drctorId"] = document.getElementById("jqxCntDirectorIdTxt").value,
    newdata["drctor"] = document.getElementById("jqxCntDirectorTxt").value,
    newdata["cntrtDate"] = $("#jqxCntContractDateCal").val();
    newdata["descript"] = document.getElementById("jqxCntContractDescriptionTxt").value,
    newdata["prjctId"] = document.getElementById("jqxCntProjectIdTxt").value,
    newdata["project"] = $("#jqxCntProjectNameDdn").jqxDropDownList('getSelectedItem').label,
    newdata["siteName"] = $("#jqxCntSitesDdn").jqxDropDownList('getSelectedItem').label,
    newdata["servicesAvail"] = $("#jqxCntServicesAvailDdn").jqxDropDownList('getSelectedItem').label,
    newdata["permProvince"] = document.getElementById("jqxCntPermanentProvinceTxt").value,
    newdata["permCity"] = document.getElementById("jqxCntPermanentCityTxt").value,
    newdata["permDistrict"] = $("#jqxCntPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label,
    newdata["permStreetName"] = document.getElementById("jqxCntPermanentStreetNameTxt").value,
    newdata["permStreetNumber"] = document.getElementById("jqxCntPermanentStreetNumberTxt").value,
    newdata["permPostalCode"] = document.getElementById("jqxCntPermanentPostalCodeTxt").value,
    newdata["mailProvince"] = document.getElementById("jqxCntMailingProvinceTxt").value,
    newdata["mailCity"] = document.getElementById("jqxCntMailingCityTxt").value,
    newdata["mailDistrict"] = $("#jqxCntMailingDistrictDdn").jqxDropDownList('getSelectedItem').label,
    newdata["mailtStreetName"] = document.getElementById("jqxCntMailingStreetNameTxt").value,
    newdata["mailStreetNumber"] = document.getElementById("jqxCntMailingStreetNumberTxt").value,
    newdata["mailPostalCode"] = document.getElementById("jqxCntMailingPostalCodeTxt").value,
    
    
    JSON.stringify(newdata);
    // add row
    if (newRow) {
        newdata["id"] = cntId;
        var commit = $("#jqxCntgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#jqxCentergrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#jqxCentergrid").jqxGrid('getselectedrowindex');
        $('#jqxCentergrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#jqxCntIdTxt").val("");
    $("#jqxCntNameDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntDirectorIdTxt").val("");
    $("#jqxCntDirectorTxt").val("");
    $("#jqxCntContractDateCal").val("");
    $("#jqxCntContractDescriptionTxt").val("");
    $("#jqxCntProjectIdTxt").val("");
    $("#jqxCntProjectNameDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntSitesDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntServicesAvailDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntPermanentProvinceTxt").val("");
    $("#jqxCntPermanentCityTxt").val("");
    $("#jqxCntPermanentDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntPermanentStreetNameTxt").val("");
    $("#jqxCntPermanentStreetNumberTxt").val("");
    $("#jqxCntPermanentPostalCodeTxt").val("");
    $("#jqxCntMailingProvinceTxt").val("");
    $("#jqxCntMailingCityTxt").val("");
    $("#jqxCntMailingDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCntMailingStreetNameTxt").val("");
    $("#jqxCntMailingStreetNumberTxt").val("");
    $("#jqxCntMailingPostalCodeTxt").val("");
   
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