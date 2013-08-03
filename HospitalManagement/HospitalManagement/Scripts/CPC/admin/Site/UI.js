/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#jqxSitegrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');
    selectedRowIndex = $("#jqxSitegrid").jqxGrid("getselectedrowindex");

    var id = "STS?";
    newRow = true;

    if (selectedRowIndex != -1 && selectedRowIndex != null) {
        id = screenData[selectedRowIndex]["id"];
        newRow = false;
    }
    
    var datacontent = {
        "type": "sites",
         "id": id,
        "name": document.getElementById("jqxSiteNameTxt").value,
        "adminId": document.getElementById("jqxSiteAdminIdTxt").value,
        "admin": document.getElementById("jqxSiteAdminTxt").value,
        "servicesAvail": $("#jqxSiteServicesAvailDdn").jqxDropDownList('getSelectedItem').label,
        "permProvince": document.getElementById("jqxSitePermanentProvinceTxt").value,
        "permCity": document.getElementById("jqxSitePermanentCityTxt").value,
        "permDistrict": $("#jqxSitePermanentDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "permStreetName": document.getElementById("jqxSitePermanentStreetNameTxt").value,
        "permStreetNumber": document.getElementById("jqxSitePermanentStreetNumberTxt").value,
        "permPostalCode": document.getElementById("jqxSitePermanentPostalCodeTxt").value,
        "mailProvince": document.getElementById("jqxSiteMailingProvinceTxt").value,
        "mailCity": document.getElementById("jqxSiteMailingCityTxt").value,
        "mailDistrict": $("#jqxSiteMailingDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "mailtStreetName": document.getElementById("jqxSiteMailingStreetNameTxt").value,
        "mailStreetNumber": document.getElementById("jqxSiteMailingStreetNumberTxt").value,
        "mailPostalCode": document.getElementById("jqxSiteMailingPostalCodeTxt").value,
        
    };

    CreateNewSiteRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = document.getElementById("jqxSiteIdTxt").value;
    DeleteSiteRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#jqxSitegrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(siteId)
{
    var newdata = {};
    
    newdata["id"]= siteId,
    newdata["name"]= document.getElementById("jqxSiteNameTxt").value,
    newdata["adminId"]= document.getElementById("jqxSiteAdminIdTxt").value,
    newdata["admin"]= document.getElementById("jqxSiteAdminTxt").value,
    newdata["servicesAvail"] = $("#jqxSiteServicesAvailDdn").jqxDropDownList('getSelectedItem').label;
    newdata["permProvince"] = $("#jqxSitePermanentProvinceTxt").val();
    newdata["permCity"] = $("#jqxSitePermanentCityTxt").val();
    
    newdata["permDistrict"] = $("#jqxSitePermanentDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["permStreetName"] = $("#jqxSitePermanentStreetNameTxt").val();
    newdata["permStreetNumber"] = $("#jqxSitePermanentStreetNumberTxt").val();
    newdata["permPostalCode"] = $("#jqxSitePermanentPostalCodeTxt").val();
    newdata["mailProvince"] = $("#jqxSiteMailingProvinceTxt").val();
    newdata["mailCity"] = $("#jqxSiteMailingCityTxt").val();
    newdata["mailDistrict"] = $("#jqxSiteMailingDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["mailtStreetName"] = $("#jqxSiteMailingStreetNameTxt").val();
    newdata["mailStreetNumber"] = $("#jqxSiteMailingStreetNumberTxt").val();
    newdata["mailPostalCode"] = $("#jqxSiteMailingPostalCodeTxt").val();

    // add row
    if (newRow) {
        newdata["id"] = siteId;
        var commit = $("#jqxSitegrid").jqxGrid('addrow', screenData.length, newdata);
        $("#jqxSitegrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#jqxSitegrid").jqxGrid('getselectedrowindex');
        $('#jqxSitegrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#jqxSitegrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#jqxSitegrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#jqxSitegrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
   
    $("#jqxSiteIdTxt").val("");
    $("#jqxSiteNameTxt").val("");
    $("#jqxSiteAdminIdTxt").val("");
    $("#jqxSiteAdminTxt").val("");
    $("#jqxSiteDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSiteServicesAvailDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSitePermanentProvinceTxt").val("");
    $("#jqxSitePermanentCityTxt").val("");
    $("#jqxSitePermanentDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSitePermanentStreetNameTxt").val("");
    $("#jqxSitePermanentStreetNumberTxt").val("");
    $("#jqxSitePermanentPostalCodeTxt").val("");
    $("#jqxSiteMailingProvinceTxt").val("");
    $("#jqxSiteMailingCityTxt").val("");
    $("#jqxSiteMailingDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSiteMailingStreetNameTxt").val("");
    $("#jqxSiteMailingStreetNumberTxt").val("");
    $("#jqxSiteMailingPostalCodeTxt").val("");
   
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