var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var newRow = true;

/*****************************************************************************************************/
/***********************************ONLOAD FUNCTION***************************************************/
/*****************************************************************************************************/
$(document).ready(function () {
    // This Loads the Menu and other necessary common scripts from the CPCCommon.js
    InitializeCPCCommon();

    // splitters
    InitializeSplitters();

    // Initialize the Provider UI Components
    InitializeUI();

    // Load the necessary data for this screen from CRUD.js
    LoginAndLoadGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();

});

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height: 600, panels: [{ size: '70%', min: '70%', collapsible: false }, { min: '0%', size: '30%' }] });
}

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });


    // TextBoxes
    var jqxGridColumnWidth = "90%";
    $("#jqxUserNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxProvIdTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPasswordTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxLastNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxFirstNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMobileNumberTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxWorkPhoneTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxCenterAdminTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPermanentProvinceTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPermanentCityTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPermanentStreetNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPermanentStreetNumberTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxPermanentPostalCodeTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMailingProvinceTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMailingCityTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMailingStreetNameTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMailingStreetNumberTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });
    $("#jqxMailingPostalCodeTxt").jqxInput({ width: jqxGridColumnWidth, height: '20px' });

    // Dropdown
    $("#jqxProviderTypeDdn").jqxDropDownList({ source: providerTypeSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxCenterDdn").jqxDropDownList({ source: centerSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSiteDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxServicesAvailDdn").jqxDropDownList({ source: servicesAvailSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxPermanentDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxMailingDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxMaritalStatusDdn").jqxDropDownList({ source: maritalStatusSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxTitleDdn").jqxDropDownList({ source: titleSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxDoctorReferralDdn").jqxDropDownList({ source: doctorReferralSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });
    $("#jqxSpecializeDdn").jqxDropDownList({ source: specializeSource, selectedIndex: 1, width: jqxGridColumnWidth, height: '20', theme: "custom" });

    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#jqxgrid").jqxGrid(
        {
            theme: "custom",
            width: "100%",
            height: "580",
            source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            columns: [
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'USER NAME',
                  datafield: 'userName',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER ID',
                  datafield: 'id',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PASSWORD',
                  datafield: 'password',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'LAST NAME',
                  datafield: 'lastName',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FIRST NAME',
                  datafield: 'firstName',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDER TYPE',
                  datafield: 'providerType',
                  width: "10%",
                  renderer: columnsrenderer
              },
              {
                  text: 'GENDER',
                  datafield: 'gender',
                  width: "7%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MOBILE PHONE',
                  datafield: 'mobPhone',
                  width: "13%",
                  renderer: columnsrenderer
              },
              {
                  text: 'TITLE',
                  datafield: 'title',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'SPECIALIZES IN DESEASES',
                  datafield: 'specialize',
                  width: "20%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#profileImgDtlGrid").attr("src", "/Images/doctorphoto2.png");
        $("#jqxButtonUpload").css("display", "none");
        $("#sideTableID").text(screenData[selectedRowIndex]["id"]);
        $("#jqxUserNameTxt").val(screenData[selectedRowIndex]["userName"]);
        $("#jqxPasswordTxt").val(screenData[selectedRowIndex]["password"]);
        $("#jqxProvIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#jqxLastNameTxt").val(screenData[selectedRowIndex]["lastName"]);
        $("#jqxFirstNameTxt").val(screenData[selectedRowIndex]["firstName"]);
        $("#jqxProviderTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["providerType"], providerTypeSource));
        $("#jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gender"], genderSource));
        $("#jqxMobileNumberTxt").val(screenData[selectedRowIndex]["mobPhone"]);
        $("#jqxWorkPhoneTxt").val(screenData[selectedRowIndex]["wrkPhone"]);
        $("#jqxCenterDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["center"], centerSource));
        $("#jqxCenterAdminTxt").val(screenData[selectedRowIndex]["centerAdmin"]);
        $("#jqxSiteDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["site"], siteSource));
        $("#jqxServicesAvailDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["servicesAvail"], servicesAvailSource));
        $("#jqxPermanentProvinceTxt").val(screenData[selectedRowIndex]["permanentProvince"]);
        $("#jqxPermanentCityTxt").val(screenData[selectedRowIndex]["permCity"]);
        $("#jqxPermanentDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["permDistrict"], districtSource));
        $("#jqxPermanentStreetNameTxt").val(screenData[selectedRowIndex]["permStreetName"]);
        $("#jqxPermanentStreetNumberTxt").val(screenData[selectedRowIndex]["permStreetNumber"]);
        $("#jqxPermanentPostalCodeTxt").val(screenData[selectedRowIndex]["permPostalCode"]);
        $("#jqxMailingProvinceTxt").val(screenData[selectedRowIndex]["mailProvince"]);
        $("#jqxMailingCityTxt").val(screenData[selectedRowIndex]["mailCity"]);
        $("#jqxMailingDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["mailDistrict"], districtSource));
        $("#jqxMailingStreetNameTxt").val(screenData[selectedRowIndex]["mailtStreetName"]);
        $("#jqxMailingStreetNumberTxt").val(screenData[selectedRowIndex]["mailStreetNumber"]);
        $("#jqxMailingPostalCodeTxt").val(screenData[selectedRowIndex]["mailPostalCode"]);
        $("#jqxMaritalStatusDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["maritalStatus"], maritalStatusSource));
        $("#jqxTitleDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["title"], titleSource));
        $("#jqxDoctorReferralDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["doctorReferral"], doctorReferralSource));
        $("#jqxSpecializeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["specialize"], specializeSource));
    });    
}

/*****************************************************************************************************/
/***********************************BIND GRID*********************************************************/
/*****************************************************************************************************/
// Bind Grid
function BindData2Grid(gridData) {
    source =
    {
        localdata: gridData,
        datatype: "array",
        pagesize: 10
    };
    dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (gridData) { },
        loadError: function (xhr, status, error) { }
    });

    $("#jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}