/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#jqxgrid").jqxGrid("getselectedrowindex");
    var id = "MD?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("jqxProvIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "provider",
        
        "userName": document.getElementById("jqxUserNameTxt").value,
        "id": document.getElementById("jqxProvIdTxt").value,
        "password": document.getElementById("jqxPasswordTxt").value,
        "lastName": document.getElementById("jqxLastNameTxt").value,
        "firstName": document.getElementById("jqxFirstNameTxt").value,
        "providerType": $('#jqxProviderTypeDdn').jqxDropDownList('getSelectedItem').label,
        "gender": $("#jqxGenderDdn").jqxDropDownList('getSelectedItem').label,
        "mobPhone": document.getElementById("jqxMobileNumberTxt").value,
        "wrkPhone": document.getElementById("jqxWorkPhoneTxt").value,
        "center": $("#jqxCenterDdn").jqxDropDownList('getSelectedItem').label,
        "centerAdmin": document.getElementById("jqxCenterAdminTxt").value,
        "site": $("#jqxSiteDdn").jqxDropDownList('getSelectedItem').label,
        "servicesAvail": $("#jqxServicesAvailDdn").jqxDropDownList('getSelectedItem').label,
        "permanentProvince": document.getElementById("jqxPermanentProvinceTxt").value,
        "permCity": document.getElementById("jqxPermanentCityTxt").value,
        "permDistrict": $("#jqxPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "permStreetName": document.getElementById("jqxPermanentStreetNameTxt").value,
        "permStreetNumber": document.getElementById("jqxPermanentStreetNumberTxt").value,
        "permPostalCode": document.getElementById("jqxPermanentPostalCodeTxt").value,
        "mailProvince": document.getElementById("jqxMailingProvinceTxt").value,
        "mailCity": document.getElementById("jqxMailingCityTxt").value,
        "mailDistrict": $("#jqxMailingDistrictDdn").jqxDropDownList('getSelectedItem').label,
        "mailtStreetName": document.getElementById("jqxMailingStreetNameTxt").value,
        "mailStreetNumber": document.getElementById("jqxMailingStreetNumberTxt").value,
        "mailPostalCode": document.getElementById("jqxMailingPostalCodeTxt").value,
        "maritalStatus": $("#jqxMaritalStatusDdn").jqxDropDownList('getSelectedItem').label,
        "title": $("#jqxTitleDdn").jqxDropDownList('getSelectedItem').label,
        "doctorReferral": $("#jqxDoctorReferralDdn").jqxDropDownList('getSelectedItem').label,
        "specialize": $("#jqxSpecializeDdn").jqxDropDownList('getSelectedItem').label
    };
    CreateNewProviderRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var provID = $("#jqxProvIdTxt").attr('value');
    DeleteProviderRecord(provID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(provId)
{
    var newdata = {};
    newdata["userName"] = $("#jqxUserNameTxt").val();
    newdata["id"] = provId;
    newdata["password"] = $("#jqxPasswordTxt").val();
    newdata["lastName"] = $("#jqxLastNameTxt").val();
    newdata["firstName"] = $("#jqxFirstNameTxt").val();
    newdata["providerType"] = $('#jqxProviderTypeDdn').jqxDropDownList('getSelectedItem').label;
    newdata["gender"] = $("#jqxGenderDdn").jqxDropDownList('getSelectedItem').label;
    newdata["mobPhone"] = $("#jqxMobileNumberTxt").val();
    newdata["wrkPhone"] = $("#jqxMobileNumberTxt").val();
    newdata["center"] = $("#jqxCenterDdn").jqxDropDownList('getSelectedItem').label;
    newdata["centerAdmin"] = $("#jqxMobileNumberTxt").val();
    newdata["site"] = $("#jqxSiteDdn").jqxDropDownList('getSelectedItem').label;
    newdata["servicesAvail"] = $("#jqxServicesAvailDdn").jqxDropDownList('getSelectedItem').label;
    newdata["permanentProvince"] = $("#jqxMobileNumberTxt").val();
    newdata["permCity"] = $("#jqxMobileNumberTxt").val();
    newdata["permDistrict"] = $("#jqxPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["permStreetName"] = $("#jqxMobileNumberTxt").val();
    newdata["permStreetNumber"] = $("#jqxMobileNumberTxt").val();
    newdata["permPostalCode"] = $("#jqxMobileNumberTxt").val();
    newdata["mailProvince"] = $("#jqxMobileNumberTxt").val();
    newdata["mailCity"] = $("#jqxMobileNumberTxt").val();
    newdata["mailDistrict"] = $("#jqxMailingDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["mailtStreetName"] = $("#jqxMobileNumberTxt").val();
    newdata["mailStreetNumber"] = $("#jqxMobileNumberTxt").val();
    newdata["mailPostalCode"] = $("#jqxMobileNumberTxt").val();
    newdata["maritalStatus"] = $("#jqxMaritalStatusDdn").jqxDropDownList('getSelectedItem').label;
    newdata["title"] = $("#jqxTitleDdn").jqxDropDownList('getSelectedItem').label;
    newdata["doctorReferral"] = $("#jqxDoctorReferralDdn").jqxDropDownList('getSelectedItem').label;
    newdata["specialize"] = $("#jqxSpecializeDdn").jqxDropDownList('getSelectedItem').label;

    // add row
    if (newRow) {
        newdata["id"] = provId;
        var commit = $("#jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#jqxgrid").jqxGrid("selectrow", screenData.length-1);
    }
    else {
        // update row
        var selectedRow = $("#jqxgrid").jqxGrid('getselectedrowindex');
        $('#jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#sideTableID").text("");
    $("#jqxUserNameTxt").val("");
    $("#jqxPasswordTxt").val("");
    $("#jqxProvIdTxt").val("");
    $("#jqxLastNameTxt").val("");
    $("#jqxFirstNameTxt").val("");
    $("#jqxProviderTypeDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxMobileNumberTxt").val("");
    $("#jqxGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxWorkPhoneTxt").val("");
    $("#jqxCenterDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxCenterAdminTxt").val("");
    $("#jqxSiteDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxServicesAvailDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxPermanentProvinceTxt").val("");
    $("#jqxPermanentCityTxt").val("");
    $("#jqxPermanentDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxPermanentStreetNameTxt").val("");
    $("#jqxPermanentStreetNumberTxt").val("");
    $("#jqxPermanentPostalCodeTxt").val("");
    $("#jqxMailingProvinceTxt").val("");
    $("#jqxMailingCityTxt").val("");
    $("#jqxMailingDistrictDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxMailingStreetNameTxt").val("");
    $("#jqxMailingStreetNumberTxt").val("");
    $("#jqxMailingPostalCodeTxt").val("");
    $("#jqxMaritalStatusDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxTitleDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxDoctorReferralDdn").jqxDropDownList('selectIndex', -1);
    $("#jqxSpecializeDdn").jqxDropDownList('selectIndex', -1);
    $("#profileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#jqxButtonUpload").css("display", "");
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