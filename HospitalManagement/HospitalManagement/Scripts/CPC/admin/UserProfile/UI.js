/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
// ADD
function AddRecord() {
    $("#userprofile_jqxgrid").jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');

    selectedRowIndex = $("#userprofile_jqxgrid").jqxGrid("getselectedrowindex");
    var id = "USRPR?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("userprofile_jqxIdTxt").value;
        newRow = false;
    }
    var datacontent = {
        "type": "userprofile",
        
        "id": document.getElementById("userprofile_jqxIdTxt").value,
        "userName": document.getElementById("userprofile_jqxUserNameTxt").value,
        "password": document.getElementById("userprofile_jqxPasswordTxt").value,
        "role":$("#userprofile_jqxRoleDdn").jqxDropDownList('getSelectedItem').label,
        "lastName": document.getElementById("userprofile_jqxLastNameTxt").value,
        "firstName": document.getElementById("userprofile_jqxFirstNameTxt").value,
        "title": document.getElementById("userprofile_jqxTitleTxt").value,
        "mobileNumber": document.getElementById("userprofile_jqxMobPhoneTxt").value,
        "workPhone": document.getElementById("userprofile_jqxWrkPhoneTxt").value,
        "gender": $("#userprofile_jqxGenderDdn").jqxDropDownList('getSelectedItem').label
    };
    CreateNewUserProfileRecord(id, newRow, datacontent);
}

// DELETE
function deleteButtonClick() {
    ProgressBar('show');
    var ID = $("#userprofile_jqxIdTxt").attr('value');
    DeleteUserProfileRecord(ID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $("#userprofile_jqxgrid").jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(Id)
{
    var newdata = {};
    newdata["id"] = Id;
    newdata["type"] = "userprofile";
        
    newdata["userName"] = document.getElementById("userprofile_jqxUserNameTxt").value;
    newdata["password"] = document.getElementById("userprofile_jqxPasswordTxt").value;
    newdata["lastName"] = document.getElementById("userprofile_jqxLastNameTxt").value;
    newdata["firstName"] = document.getElementById("userprofile_jqxFirstNameTxt").value;
    newdata["title"] = document.getElementById("userprofile_jqxTitleTxt").value;
    newdata["mobileNumber"] = document.getElementById("userprofile_jqxMobPhoneTxt").value;
    newdata["workPhone"] = document.getElementById("userprofile_jqxWrkPhoneTxt").value;

    newdata["role"] = $("#userprofile_jqxRoleDdn").jqxDropDownList('getSelectedItem').label;
    newdata["gender"]= $("#userprofile_jqxGenderDdn").jqxDropDownList('getSelectedItem').label;
    
    
    // add row
    if (newRow) {
        newdata["id"] = Id;
        var commit = $("#userprofile_jqxgrid").jqxGrid('addrow', screenData.length, newdata);
        $("#userprofile_jqxgrid").jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $("#userprofile_jqxgrid").jqxGrid('getselectedrowindex');
        $('#userprofile_jqxgrid').jqxGrid('updaterow', selectedRow, newdata);
    }

    ProgressBar('hide');
}

function DeleteGridData() {
    var rowscount = $("#userprofile_jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $("#userprofile_jqxgrid").jqxGrid('getrowid', selectedRowIndex);
        var commit = $("#userprofile_jqxgrid").jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#userprofile_sideTableID").text("");
    $("#userprofile_jqxIdTxt").val("");
    $("#userprofile_jqxUserNameTxt").val("");
    $("#userprofile_jqxPasswordTxt").val("");
    $("#userprofile_jqxLastNameTxt").val("");
    $("#userprofile_jqxFirstNameTxt").val("");
    $("#userprofile_jqxTitleTxt").val("");
    $("#userprofile_jqxMobPhoneTxt").val("");
    $("#userprofile_jqxWrkPhoneTxt").val("");

    $("#userprofile_jqxGenderDdn").jqxDropDownList('selectIndex', -1);
    $("#userprofile_jqxRoleDdn").jqxDropDownList('selectIndex', -1);
    $("#userprofile_profileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#userprofile_jqxButtonUpload").css("display", "");
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