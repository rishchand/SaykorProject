var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var newRow = true;
var screenData = new Array();
var globalColumnWidth = "90%";
/*****************************************************************************************************/
/***********************************ONLOAD FUNCTION***************************************************/
/*****************************************************************************************************/
$(document).ready(function () {
    // This Loads the Menu and other necessary common scripts from the CPCCommon.js
    InitializeCPCCommon();

    InitializeSplitters();

    // Initialize the Provider UI Components
    InitializeUI();

    // Load the necessary data for this screen from CRUD.js
    LoginAndLoadGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();

});

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height: 600, panels: [{ size: '75%', min: '75%', collapsible: false }, { min: '24%', size: '24%' }] });

    // Sections Dropdown on the top
    $("#patient_jqxSectionDdn").jqxDropDownList({ source: DataSectionsSource, selectedIndex: 0, height: '26', theme: "custom" });
    $('#patient_jqxSectionDdn').on('select', function (event) {
        var args = event.args;
        ShowPatientSection(args.index);
    });
}

function InitializePersonalInfo() {
    // TextBoxes    
    $("#patient_jqxFileNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxLastNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxFirstNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPatientIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMedInsCatgNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMedicareCardNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxEmailTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxSmsAlertTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPermanentProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPermanentCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPermanentStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPermanentStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPermanentPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMailingProvinceTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMailingCityTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMailingStreetNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMailingStreetNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxMailingPostalCodeTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxHeadOfHouseTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxContactNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxContactTelNumberTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxFileManageAgencyTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxCreatedByTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Calendars
    $("#patient_jqxDoBCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxFileDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });

    // Radio Buttons
    $('input').iCheck({
        radioClass: 'iradio_square-grey'
    });

    // Dropdown
    $("#patient_jqxPermanentDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 0, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxMailingDistrictDdn").jqxDropDownList({ source: districtSource, selectedIndex: 0, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxEthnicityDdn").jqxDropDownList({ source: ethnicityList, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxMaritalStatusDdn").jqxDropDownList({ source: maritalStatusSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxOcupationCategoryDdn").jqxDropDownList({ source: occupationalCategories, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxEducationDdn").jqxDropDownList({ source: educationList, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

}

function InitializeDescriptiveInfo() {
    // TextBoxes    
    $("#patient_jqxHeightTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#patient_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxBloodTypeDdn").jqxDropDownList({ source: BloodGroupTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxBloodGrpDdn").jqxDropDownList({ source: BloodGroupSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
}

function InitializeMedicalInfo() {
    // TextBoxes    
    $("#patient_jqxCenterAdminTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxHealthEventNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxHealthIncidentLocationTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPastObservProjNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPastObservMethNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxpPastObserTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#patient_jqxCenterDdn").jqxDropDownList({ source: centerSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxSiteDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxRespDoctorDdn").jqxDropDownList({ source: ResponsibleDoctorSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Calendars
    $("#patient_jqxHDoICal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
}

function InitializeAllergens() {
    // TextBoxes    
    $("#patient_jqxOtherAllergensTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#patient_jqxAllergenDrugsDdn").jqxDropDownList({ source: AllergenDrugsSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxAllergenFoodDdn").jqxDropDownList({ source: AllergenFoodSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxAllergenSorroundingDdn").jqxDropDownList({ source: AllergenSorroundingSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Check box
    $("#patient_jqxHaveAllergiesChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxMixedAllergenChk").jqxCheckBox({ width: "20px" });
}
function InitializePersonalHistory() {
    // Check box
    $("#patient_jqxHaveMedicalHistoryChk").jqxCheckBox({ width: "20px" });

    // Calendar
    $("#patient_jqxHypertensionDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxDiabetesDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxCorHrtDisDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxMalDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxSevMenIllDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxTBDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxLivDisDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxChrObsPulDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxConMalDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxOccDisDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxKidDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxOThrNotDgnstDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
    $("#patient_jqxOthrConfDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
}
function InitializeSurgery() {
    // Check box
    $("#patient_jqxWithoutSurgeryChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxNameofProcTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Calendar
    $("#patient_jqxDtOfSurgeryCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
}
function InitializeTrauma() {
    // Check box
    $("#patient_jqxHistOfTraumaChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxNameofTraumaTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Calendar
    $("#patient_jqxTraumaBeginDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
}
function InitializeBloodTransfusion() {
    // Check box
    $("#patient_jqxHistOfBloodTranChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxTranReasonTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Calendar
    $("#patient_jqxTranDtCal").jqxDateTimeInput({ width: 220, height: '25', theme: "custom", formatString: 'yyyy-MM-dd' });
}
function InitializeHereditaryDiseaseHistory() {
    // Check box
    $("#patient_jqxHistOfFamilyGeneticsChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxGeneticVDNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
}
function InitializeFamilyHistoryofDiseases() {
    // Check box
    $("#patient_jqxMedicalHistChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxHypertensionWithPatientTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxDiabetesPatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxRelWithPatientWithCoronaryHrtDisTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxChronicObstructivePulmonarydisRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxStrokePatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxCancerPatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxPAtientWithSevMentIllRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxTBPatientTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxLiverDisPatientrelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxCogenetalMalPatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxKidneyDisPatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#patient_jqxAnemiaPatientRelTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
}
function InitializeDisability() {
    // Check box
    $("#patient_jqxWithoutDisablitiesChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxVisualDisabilityChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxHearingDisabilityChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxSpeechDisabilityChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxPhysicalDisabilityChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxIntellectualDisabilityChk").jqxCheckBox({ width: "20px" });
    $("#patient_jqxMentalDisabilityChk").jqxCheckBox({ width: "20px" });

    // TextBoxes    
    $("#patient_jqxOtherDisabilitiesTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

}
function InitializeImmunization() {
    // Dropdown
    $("#patient_jqxImmunizationDdn").jqxDropDownList({ source: ImmunizationSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // TextBoxes    
    $("#patient_jqxVaccineNameTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
}
function InitializeLivingConditions() {
    // Dropdown
    $("#patient_jqxHealthRskFctorsDdn").jqxDropDownList({ source: HealthRskFctorsSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxKitchenVentFacDdn").jqxDropDownList({ source: KitchenVentilationfacilitiesSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxFuelTypeDdn").jqxDropDownList({ source: FuelTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxDrinkingWaterSrcDdn").jqxDropDownList({ source: DrinkingWaterSources, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxToiletsDdn").jqxDropDownList({ source: ToiletsSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#patient_jqxLivestockColumnsDdn").jqxDropDownList({ source: LivestockColumnSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
}
function InitializeBasicInfo() {
    InitializePersonalInfo();
    InitializeDescriptiveInfo();
    InitializeMedicalInfo();
    InitializeAllergens();
    InitializePersonalHistory();
    InitializeSurgery();
    InitializeTrauma();
    InitializeBloodTransfusion();
    InitializeHereditaryDiseaseHistory();
    InitializeFamilyHistoryofDiseases();
    InitializeDisability();
    InitializeImmunization();
    InitializeLivingConditions();

    // global BUttons
    // Buttons
    $("#patient_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#patient_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });

    // jqExpander
    $("#patient_jqxExpanderPersonalInfo").jqxExpander({ width: '100%', theme: "custom" });
    $("#patient_jqxExpanderDescriptiveInfo").jqxExpander({ width: '100%', theme: "custom" });
    $("#patient_jqxExpanderMedicalInfo").jqxExpander({ width: '100%', theme: "custom" });
    $('#patient_jqxExpanderPersonalInfo').jqxExpander('expand');
    $('#patient_jqxExpanderDescriptiveInfo').jqxExpander('collapse');
    $('#patient_jqxExpanderMedicalInfo').jqxExpander('collapse');
    $('#patient_jqxExpanderPersonalInfo').on('expanded', function () {
        $('#patient_jqxExpanderDescriptiveInfo').jqxExpander('collapse');
        $('#patient_jqxExpanderMedicalInfo').jqxExpander('collapse');
    });
    $('#patient_jqxExpanderDescriptiveInfo').on('expanded', function () {
        $('#patient_jqxExpanderPersonalInfo').jqxExpander('collapse');
        $('#patient_jqxExpanderMedicalInfo').jqxExpander('collapse');
    });
    $('#patient_jqxExpanderMedicalInfo').on('expanded', function () {
        $('#patient_jqxExpanderDescriptiveInfo').jqxExpander('collapse');
        $('#patient_jqxExpanderPersonalInfo').jqxExpander('collapse');
    });
}
function InitializeUI() {
    InitializeBasicInfo();

    // Buttons
    $("#patient_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#patient_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#patient_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#patient_jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });

    // Load Basic Info
    ShowPatientSection(0);

    // Data Adaptor
    BindData2Grid(screenData);


    // Grid
    $("#jqxPatientGrid").jqxGrid(
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
                  text: 'FILE NUMBER',
                  datafield: 'fileNumber',
                  width: "8%",
                  renderer: columnsrenderer
              },
              {
                  text: 'FILE DATE',
                  datafield: 'fileDate',
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
                  text: 'PATIENT ID',
                  datafield: 'id',
                  width: "10%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL INS CATG NAME',
                  datafield: 'medicalInsuranceCat',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MEDICAL CARD NUMBER',
                  datafield: 'medicareCardNumber',
                  width: "15%",
                  renderer: columnsrenderer
              },
              {
                  text: 'DATE OF BIRTH',
                  datafield: 'dateOfBirth',
                  width: "10%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PHONE NUMBER',
                  datafield: 'phoneNumber',
                  width: "10%",
                  renderer: columnsrenderer
              },
              {
                  text: 'EMAIL',
                  datafield: 'email',
                  width: "10%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    
    $("#jqxPatientGrid").bind('rowselect', function (event) {
        var date = "";
        selectedRowIndex = event.args.rowindex;
        $("#profileImgDtlGrid").attr("src", "/Images/doctorphoto2.png");
        $("#patient_jqxButtonUpload").css("display", "none");
        $("#sideTableID").text(screenData[selectedRowIndex]["id"]);

        // Personal Info
        $("#patient_jqxPatientIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#patient_jqxFileNumberTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["fileNumber"]);
        date = screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["fileDate"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxFileDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        $("#patient_jqxFirstNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["firstName"]);
        $("#patient_jqxLastNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["lastName"]);
        $("#patient_jqxMedInsCatgNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["medicalInsuranceCat"]);
        $("#patient_jqxMedicareCardNumberTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["medicareCardNumber"]);
        date = screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["dateOfBirth"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxDoBCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        $("#patient_jqxEmailTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["email"]);
        $("#smsAlert_" + screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["smsAlert"]).iCheck('check');
        $("#patient_jqxPermanentProvinceTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentProvince"]);
        $("#patient_jqxPermanentCityTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentCity"]);
        $("#patient_jqxPermanentDistrictDdn").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentDistrict"]);
        $("#patient_jqxPermanentStreetNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentStreetName"]);
        $("#patient_jqxPermanentStreetNumberTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentStreetNumber"]);
        $("#patient_jqxPermanentPostalCodeTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["permanentPostalCode"]);
        $("#patient_jqxMailingProvinceTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingProvince"]);
        $("#patient_jqxMailingCityTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingCity"]);
        $("#patient_jqxMailingDistrictDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingDistrict"], districtSource));
        $("#patient_jqxMailingStreetNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingtStreetName"]);
        $("#patient_jqxMailingStreetNumberTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingStreetNumber"]);
        $("#patient_jqxMailingPostalCodeTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["mailingPostalCode"]);
        $("#patient_jqxEthnicityDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["ethnicity"], ethnicityList));
        $("#patient_jqxMaritalStatusDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["maritalStatus"], maritalStatusSource));
        $("#headOfHouse_" + screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["headOfHouse"]).iCheck('check');
        $("#patient_jqxOcupationCategoryDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["occupatCateg"], occupationalCategories));
        $("#patient_jqxEducationDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["education"], educationList));
        $("#patient_jqxContactNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["contactName"]);
        $("#patient_jqxContactTelNumberTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["contactTelNumb"]);
        $("#patient_jqxFileManageAgencyTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["fileManageAgency"]);
        $("#patient_jqxCreatedByTxt").val(screenData[selectedRowIndex]["basicInfo"]["personalInfo"]["createdBy"]);
        
        // descriptInfo
        $("#patient_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["descriptInfo"]["gender"], genderSource));
        $("#patient_jqxHeightTxt").val(screenData[selectedRowIndex]["basicInfo"]["descriptInfo"]["height"]);
        $("#patient_jqxBloodTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["descriptInfo"]["bloodType"], BloodGroupTypeSource));
        $("#patient_jqxBloodGrpDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["descriptInfo"]["rhBloodGroup"], BloodGroupSource));

        // medicalInfo
        $("#patient_jqxCenterDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["center"], centerSource));
        $("#patient_jqxCenterAdminTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["centerAdmin"]);
        $("#patient_jqxSiteDdn").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["site"]);
        $("#patient_jqxRespDoctorDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["responsibleDoctor"], ResponsibleDoctorSource));
        $("#patient_jqxHealthEventNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["healthEventName"]);
        date = screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["healthDateOfIncident"].split('-');
        if (date != "" && date.length > 2)
                $("#patient_jqxHDoICal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        $("#patient_jqxHealthIncidentLocationTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["healthIncidentLocation"]);
        $("#patient_jqxPastObservProjNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["pastObservProjName"]);
        $("#patient_jqxPastObservMethNameTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["pastObservMethName"]);
        $("#patient_jqxpPastObserTxt").val(screenData[selectedRowIndex]["basicInfo"]["medicalInfo"]["pastObser"]);

        // allergens
        $("#patient_jqxHaveAllergiesChk").val(screenData[selectedRowIndex]["allergens"]["allergies"]);
        $("#patient_jqxAllergenDrugsDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["allergens"]["allergenDrugs"], AllergenDrugsSource));
        $("#patient_jqxAllergenFoodDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["allergens"]["allergenFood"], AllergenFoodSource));
        $("#patient_jqxAllergenSorroundingDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["allergens"]["allergenSurrounding"], AllergenSorroundingSource));
        $("#patient_jqxMixedAllergenChk").val(screenData[selectedRowIndex]["allergens"]["mixedAllergens"]);
        $("#patient_jqxOtherAllergensTxt").val(screenData[selectedRowIndex]["allergens"]["otherAllergens"]);

        // personalHistory
        $("#patient_jqxHaveMedicalHistoryChk").val(screenData[selectedRowIndex]["personalHistory"]["medHistory"]);
        date = screenData[selectedRowIndex]["personalHistory"]["hypertensionDt"].split('-');
        if (date != "" && date.length > 2)
                $("#patient_jqxHypertensionDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["diabetesDt"].split('-');
        if (date != "" && date.length > 2)
                $("#patient_jqxDiabetesDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["cornryHrtDiseaseDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxCorHrtDisDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["malignanciesDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxMalDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["mentalIllnessDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxSevMenIllDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["tbDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxTBDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["liverDiseaseDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxLivDisDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["pulmonDiseaseDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxChrObsPulDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["congenMalformDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxConMalDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["occupDiseaseDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxOccDisDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["kidneyDiseaseDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxKidDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["otherDiseasesDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxOThrNotDgnstDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);
        date = screenData[selectedRowIndex]["personalHistory"]["otherConfirmDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxOthrConfDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        // surgery
        $("#patient_jqxWithoutSurgeryChk").val(screenData[selectedRowIndex]["surgery"]["woSurgery"]);
        $("#patient_jqxNameofProcTxt").val(screenData[selectedRowIndex]["surgery"]["procedureName"]);
        date = screenData[selectedRowIndex]["surgery"]["surgeryDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxDtOfSurgeryCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        // trauma
        $("#patient_jqxHistOfTraumaChk").val(screenData[selectedRowIndex]["trauma"]["traumaHstry"]);
        $("#patient_jqxNameofTraumaTxt").val(screenData[selectedRowIndex]["trauma"]["traumaName"]);
        date = screenData[selectedRowIndex]["trauma"]["traumaBeginDt"].split('-');
        if (date != "" && date.length > 2)
            $("#patient_jqxTraumaBeginDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        // bloodtransfusion
        $("#patient_jqxHistOfBloodTranChk").val(screenData[selectedRowIndex]["bloodtransfusion"]["bloodTransfHstry"]);
        $("#patient_jqxTranReasonTxt").val(screenData[selectedRowIndex]["bloodtransfusion"]["transfusionRsons"]);
        date = screenData[selectedRowIndex]["bloodtransfusion"]["transfusionDt"].split('-');
        if (date != "" && date.length > 2)
                $("#patient_jqxTranDtCal").jqxDateTimeInput("setDate", date[0] + ", " + date[1] + ", " + date[2]);

        // hereditaryDiseaseHistory
        $("#patient_jqxHistOfFamilyGeneticsChk").val(screenData[selectedRowIndex]["hereditaryDiseaseHistory"]["familyGenHstry"]);
        $("#patient_jqxGeneticVDNameTxt").val(screenData[selectedRowIndex]["hereditaryDiseaseHistory"]["geneticVdName"]);

        // familyHistoryofDiseases
        $("#patient_jqxMedicalHistChk").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["medHstry"]);
        $("#patient_jqxHypertensionWithPatientTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["hypertnsnPnt"]);
        $("#patient_jqxDiabetesPatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["diabetesPntRel"]);
        $("#patient_jqxRelWithPatientWithCoronaryHrtDisTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["RelatPntCrnyHrtDis"]);
        $("#patient_jqxChronicObstructivePulmonarydisRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["chronObstPulmnryDis"]);
        $("#patient_jqxCancerPatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["cncrPntRel"]);
        $("#patient_jqxStrokePatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["stkePntRel"]);
        $("#patient_jqxPAtientWithSevMentIllRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["pntMntlIllness"]);
        $("#patient_jqxTBPatientTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["tbPnt"]);
        $("#patient_jqxLiverDisPatientrelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["lvrDisPatRel"]);
        $("#patient_jqxCogenetalMalPatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["cngntalMalfrmPntRel"]);
        $("#patient_jqxKidneyDisPatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["kdnyDisPntRel"]);
        $("#patient_jqxAnemiaPatientRelTxt").val(screenData[selectedRowIndex]["familyHistoryofDiseases"]["anmiaPntRel"]);

        // disability
        $("#patient_jqxWithoutDisablitiesChk").val(screenData[selectedRowIndex]["disability"]["woDisability"]);
        $("#patient_jqxVisualDisabilityChk").val(screenData[selectedRowIndex]["disability"]["visualDsblty"]);
        $("#patient_jqxHearingDisabilityChk").val(screenData[selectedRowIndex]["disability"]["hearDsblty"]);
        $("#patient_jqxSpeechDisabilityChk").val(screenData[selectedRowIndex]["disability"]["speechDsblty"]);
        $("#patient_jqxPhysicalDisabilityChk").val(screenData[selectedRowIndex]["disability"]["physDsblty"]);
        $("#patient_jqxIntellectualDisabilityChk").val(screenData[selectedRowIndex]["disability"]["intellDsblty"]);
        $("#patient_jqxMentalDisabilityChk").val(screenData[selectedRowIndex]["disability"]["mentalDsblty"]);
        $("#patient_jqxOtherDisabilitiesTxt").val(screenData[selectedRowIndex]["disability"]["otherDsblty"]);

        // immunization
        $("#patient_jqxImmunizationDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["immunization"]["immunization"], ImmunizationSource));
        $("#patient_jqxVaccineNameTxt").val(screenData[selectedRowIndex]["immunization"]["vaccineNm"]);

        // livingConditions
        $("#patient_jqxHealthRskFctorsDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["healthRskFctors"], HealthRskFctorsSource));
        $("#patient_jqxKitchenVentFacDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["ktchnVntltionFac"], KitchenVentilationfacilitiesSource));
        $("#patient_jqxFuelTypeDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["fuelType"], FuelTypeSource));
        $("#patient_jqxDrinkingWaterSrcDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["drnkngWtrSrcs"], DrinkingWaterSources));
        $("#patient_jqxToiletsDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["toilets"], ToiletsSource));
        $("#patient_jqxLivestockColumnsDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["livingConditions"]["livestckColmn"], LivestockColumnSource));

    }); 
}

function ShowPatientSection(index) {
    HideAllSections();
    switch (index) {
        //Basic Information
        case 0:
            $("#patient_sectionBasicInformation").show();
            break;
            // Allergens
        case 1:
            $("#patient_sectionAllergens").show();
            break;
            // Personal History
        case 2:
            $("#patient_sectionPersonalHistory").show();
            break;
            // Surgery
        case 3:
            $("#patient_sectionSurgery").show();
            break;
            // Trauma
        case 4:
            $("#patient_sectionTrauma").show();
            break;
            // Blood Transfusion 
        case 5:
            $("#patient_sectionBloodTransfusion").show();
            break;
            //  Hereditary Disease History
        case 6:
            $("#patient_sectionHereditaryDiseaseHistory").show();
            break;
            // Family History of Diseases
        case 7:
            $("#patient_sectionFamilyHistoryofDiseases").show();
            break;
            // Disability
        case 8:
            $("#patient_sectionDisability").show();
            break;
            // Immunization
        case 9:
            $("#patient_sectionImmunization").show();
            break;
            // Living Conditions
        case 10:
            $("#patient_sectionLivingConditions").show();
            break;

    }
}

function HideAllSections() {
    $("#patient_sectionBasicInformation").hide();
    $("#patient_sectionAllergens").hide();
    $("#patient_sectionPersonalHistory").hide();
    $("#patient_sectionSurgery").hide();
    $("#patient_sectionTrauma").hide();
    $("#patient_sectionBloodTransfusion").hide();
    $("#patient_sectionHereditaryDiseaseHistory").hide();
    $("#patient_sectionFamilyHistoryofDiseases").hide();
    $("#patient_sectionDisability").hide();
    $("#patient_sectionImmunization").hide();
    $("#patient_sectionLivingConditions").hide();
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
        datafields: [
                    {name:'id'},
                    { name: 'fileNumber', map: 'basicInfo>personalInfo>fileNumber' },
                    { name: 'fileDate', map: 'basicInfo>personalInfo>fileDate' },
                    { name: 'lastName', map: 'basicInfo>personalInfo>lastName' },
                    { name: 'firstName', map: 'basicInfo>personalInfo>firstName' },
                    { name: 'medicalInsuranceCat', map: 'basicInfo>personalInfo>medicalInsuranceCat' },
                    { name: 'medicareCardNumber', map: 'basicInfo>personalInfo>medicareCardNumber' },
                    { name: 'dateOfBirth', map: 'basicInfo>personalInfo>dateOfBirth' },
                    { name: 'phoneNumber', map: 'basicInfo>personalInfo>phoneNumber' },
                    { name: 'email', map: 'basicInfo>personalInfo>email' }
        ],
        pagesize: 10
    };
    dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (gridData) { },
        loadError: function (xhr, status, error) { }
    });

    $("#jqxPatientGrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}