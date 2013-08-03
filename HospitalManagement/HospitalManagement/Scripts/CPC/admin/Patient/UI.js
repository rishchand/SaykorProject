/*****************************************************************************************************/
/***********************************BUTTON CLICK EVENTS***********************************************/
/**********************************ADD/SAVE/DELETE/CANCEL*********************************************/
patientGridName = "#jqxPatientGrid";
// ADD
function AddPatientRecord() {
    $(jqxPatientGrid).jqxGrid("unselectrow");
    ClearDetailGrid();
}

// SAVE
function saveButtonClick() {
    ProgressBar('show');
    selectedRowIndex = $("#jqxPatientGrid").jqxGrid("getselectedrowindex");
    var id = "PNT?";
    newRow = true;

    if (selectedRowIndex != -1) {
        id = document.getElementById("patient_jqxPatientIdTxt").value;
        newRow = false;
    }
    alert($("#patient_jqxHaveAllergiesChk").val());
    var datacontent = {
        "type": "patient",

        "id": document.getElementById("patient_jqxPatientIdTxt").value,
        "basicInfo": {
            "personalInfo": {
                "fileNumber": $("#patient_jqxFileNumberTxt").val(),
                "fileDate": $("#patient_jqxFileDtCal").val(),
                "firstName": $("#patient_jqxFirstNameTxt").val(),
                "lastName": $("#patient_jqxLastNameTxt").val(),
                "medicalInsuranceCat": $("#patient_jqxMedInsCatgNameTxt").val(),
                "medicareCardNumber": $("#patient_jqxMedicareCardNumberTxt").val(),
                "dateOfBirth": $("#patient_jqxDoBCal").val(),
                "phoneNumber": "235235235",// <-- Not found in the UI 
                "email": $("#patient_jqxEmailTxt").val(),
                "smsAlert": $("input[name='smsAlertRdo']:checked").val(),
                "permanentProvince": $("#patient_jqxPermanentProvinceTxt").val(),
                "permanentCity": $("#patient_jqxPermanentCityTxt").val(),
                "permanentDistrict": $("#patient_jqxPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label,
                "permanentStreetName": $("#patient_jqxPermanentStreetNameTxt").val(),
                "permanentStreetNumber": $("#patient_jqxPermanentStreetNumberTxt").val(),
                "permanentPostalCode": $("#patient_jqxPermanentPostalCodeTxt").val(),
                "mailingProvince": $("#patient_jqxMailingProvinceTxt").val(),
                "mailingCity": $("#patient_jqxMailingCityTxt").val(),
                "mailingDistrict": $("#patient_jqxMailingDistrictDdn").jqxDropDownList('getSelectedItem').label,
                "mailingtStreetName": $("#patient_jqxMailingStreetNameTxt").val(),
                "mailingStreetNumber": $("#patient_jqxMailingStreetNumberTxt").val(),
                "mailingPostalCode": $("#patient_jqxMailingPostalCodeTxt").val(),
                "ethnicity": $("#patient_jqxEthnicityDdn").jqxDropDownList('getSelectedItem').label,
                "maritalStatus": $("#patient_jqxMaritalStatusDdn").jqxDropDownList('getSelectedItem').label,
                "headOfHouse": $("input[name='headOfHouseRdo']:checked").val(),
                "occupatCateg": $("#patient_jqxOcupationCategoryDdn").jqxDropDownList('getSelectedItem').label,
                "education": $("#patient_jqxEducationDdn").jqxDropDownList('getSelectedItem').label,
                "contactName": $("#patient_jqxContactNameTxt").val(),
                "contactTelNumb": $("#patient_jqxContactTelNumberTxt").val(),
                "fileManageAgency": $("#patient_jqxFileManageAgencyTxt").val(),
                "createdBy": $("#patient_jqxCreatedByTxt").val()
            },
            "descriptInfo": {
                "gender": $("#patient_jqxGenderDdn").jqxDropDownList('getSelectedItem').label,
                "height": $("#patient_jqxHeightTxt").val(),
                "bloodType": $("#patient_jqxBloodTypeDdn").jqxDropDownList('getSelectedItem').label,
                "rhBloodGroup": $("#patient_jqxBloodGrpDdn").jqxDropDownList('getSelectedItem').label
            },
            "medicalInfo": {
                "center": $("#patient_jqxCenterDdn").jqxDropDownList('getSelectedItem').label,
                "centerAdmin": $("#patient_jqxCenterAdminTxt").val(),
                "site": $("#patient_jqxSiteDdn").jqxDropDownList('getSelectedItem').label,
                "responsibleDoctor": $("#patient_jqxRespDoctorDdn").jqxDropDownList('getSelectedItem').label,
                "healthEventName": $("#patient_jqxHealthEventNameTxt").val(),
                "healthDateOfIncident": $("#patient_jqxHDoICal").val(),
                "healthIncidentLocation": $("#patient_jqxHealthIncidentLocationTxt").val(),
                "pastObservProjName": $("#patient_jqxPastObservProjNameTxt").val(),
                "pastObservMethName": $("#patient_jqxPastObservMethNameTxt").val(),
                "pastObser": $("#patient_jqxpPastObserTxt").val()
            }
        },
        "allergens": {
            "allergies": $("#patient_jqxHaveAllergiesChk").val(),
            "allergenDrugs": $("#patient_jqxAllergenDrugsDdn").jqxDropDownList('getSelectedItem').label,
            "allergenFood": $("#patient_jqxAllergenFoodDdn").jqxDropDownList('getSelectedItem').label,
            "allergenSurrounding": $("#patient_jqxAllergenSorroundingDdn").jqxDropDownList('getSelectedItem').label,
            "mixedAllergens": $("#patient_jqxMixedAllergenChk").val(),
            "otherAllergens": $("#patient_jqxOtherAllergensTxt").val()
        },
        "personalHistory": {
            "medHistory": $("#patient_jqxHaveMedicalHistoryChk").val(),
            "hypertensionDt": $("#patient_jqxHypertensionDtCal").val(),
            "diabetesDt": $("#patient_jqxDiabetesDtCal").val(),
            "cornryHrtDiseaseDt": $("#patient_jqxCorHrtDisDtCal").val(),
            "malignanciesDt": $("#patient_jqxMalDgnstDtCal").val(),
            "strokeDt": "2012-12-12", // <-- Not found in the UI
            "mentalIllnessDt": $("#patient_jqxSevMenIllDtCal").val(),
            "tbDt": $("#patient_jqxTBDgnstDtCal").val(),
            "liverDiseaseDt": $("#patient_jqxLivDisDgnstDtCal").val(),
            "pulmonDiseaseDt": $("#patient_jqxChrObsPulDgnstDtCal").val(),
            "congenMalformDt": $("#patient_jqxConMalDgnstDtCal").val(),
            "occupDiseaseDt": $("#patient_jqxOccDisDgnstDtCal").val(),
            "kidneyDiseaseDt": $("#patient_jqxKidDgnstDtCal").val(),
            "anemiaDt": "2012-12-12", // <-- Not found in the UI
            "otherDiseasesDt": $("#patient_jqxOThrNotDgnstDtCal").val(),
            "otherConfirmDt": $("#patient_jqxOthrConfDtCal").val()
        },
        "surgery": {
            "woSurgery": $("#patient_jqxWithoutSurgeryChk").val(),
            "procedureName": $("#patient_jqxNameofProcTxt").val(),
            "surgeryDt": $("#patient_jqxDtOfSurgeryCal").val()
        },
        "trauma": {
            "traumaHstry": $("#patient_jqxHistOfTraumaChk").val(),
            "traumaName": $("#patient_jqxNameofProcTxt").val(),
            "traumaBeginDt": $("#patient_jqxTraumaBeginDtCal").val()
        },
        "bloodtransfusion": {
            "bloodTransfHstry": $("#patient_jqxHistOfBloodTranChk").val(),
            "transfusionRsons": $("#patient_jqxTranReasonTxt").val(),
            "transfusionDt": $("#patient_jqxTranDtCal").val()
        },
        "hereditaryDiseaseHistory": {
            "familyGenHstry": $("#patient_jqxHistOfFamilyGeneticsChk").val(),
            "geneticVdName": $("#patient_jqxGeneticVDNameTxt").val()
        },
        "familyHistoryofDiseases": {
            "medHstry": $("#patient_jqxMedicalHistChk").val(),
            "hypertnsnPnt": $("#patient_jqxHypertensionWithPatientTxt").val(),
            "diabetesPntRel": $("#patient_jqxDiabetesPatientRelTxt").val(),
            "RelatPntCrnyHrtDis": $("#patient_jqxRelWithPatientWithCoronaryHrtDisTxt").val(),
            "chronObstPulmnryDis": $("#patient_jqxChronicObstructivePulmonarydisRelTxt").val(),
            "cncrPntRel": $("#patient_jqxCancerPatientRelTxt").val(),
            "stkePntRel": $("#patient_jqxStrokePatientRelTxt").val(),
            "pntMntlIllness": $("#patient_jqxPAtientWithSevMentIllRelTxt").val(),
            "tbPnt": $("#patient_jqxTBPatientTxt").val(),
            "lvrDisPatRel": $("#patient_jqxLiverDisPatientrelTxt").val(),
            "cngntalMalfrmPntRel": $("#patient_jqxCogenetalMalPatientRelTxt").val(),
            "kdnyDisPntRel": $("#patient_jqxKidneyDisPatientRelTxt").val(),
            "anmiaPntRel": $("#patient_jqxAnemiaPatientRelTxt").val()
        },
        "disability": {
            "woDisability": $("#patient_jqxWithoutDisablitiesChk").val(),
            "visualDsblty": $("#patient_jqxVisualDisabilityChk").val(),
            "hearDsblty": $("#patient_jqxHearingDisabilityChk").val(),
            "speechDsblty": $("#patient_jqxSpeechDisabilityChk").val(),
            "physDsblty": $("#patient_jqxPhysicalDisabilityChk").val(),
            "intellDsblty": $("#patient_jqxIntellectualDisabilityChk").val(),
            "mentalDsblty": $("#patient_jqxMentalDisabilityChk").val(),
            "otherDsblty": $("#patient_jqxOtherDisabilitiesTxt").val()
        },
        "immunization": {
            "immunization": $("#patient_jqxImmunizationDdn").jqxDropDownList('getSelectedItem').label,
            "vaccineNm": $("#patient_jqxVaccineNameTxt").val()
        },
        "livingConditions": {
            "healthRskFctors": $("#patient_jqxHealthRskFctorsDdn").jqxDropDownList('getSelectedItem').label,
            "ktchnVntltionFac": $("#patient_jqxKitchenVentFacDdn").jqxDropDownList('getSelectedItem').label,
            "fuelType": $("#patient_jqxFuelTypeDdn").jqxDropDownList('getSelectedItem').label,
            "drnkngWtrSrcs": $("#patient_jqxDrinkingWaterSrcDdn").jqxDropDownList('getSelectedItem').label,
            "toilets": $("#patient_jqxToiletsDdn").jqxDropDownList('getSelectedItem').label,
            "livestckColmn": $("#patient_jqxLivestockColumnsDdn").jqxDropDownList('getSelectedItem').label
        }
    };
    alert(JSON.stringify(datacontent));
    CreateNewPatientRecord(id, newRow, datacontent);
}

function getCheckedValue(groupName) {
    var radios = document.getElementsByName(groupName);
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

// DELETE
function deletePatientBtnClick() {
    ProgressBar('show');
    var patientID = $("#patient_jqxPatientIdTxt").val();
    DeletePatientRecord(patientID);
}

// CANCEL
function CancelRowEdit() {
    if (selectedRowIndex == "") {
        selectedRowIndex = 0;
    }
    $(patientGridName).jqxGrid("selectrow", selectedRowIndex);
}

/*****************************************************************************************************/
/***********************************UI Helper Methods*************************************************/
/*****************************************************************************************************/
// Update grid
function UpdateGridData(patientId) {
    var newdata = {};
    newdata["id"] = patientId;
    // Personal Info
    newdata["basicInfo"] = {};
    newdata["basicInfo"]["personalInfo"] = {};
    newdata["basicInfo"]["personalInfo"]["fileNumber"] = $("#patient_jqxFileNumberTxt").val();
    newdata["basicInfo"]["personalInfo"]["fileDate"] = $("#patient_jqxFileDtCal").val();
    newdata["basicInfo"]["personalInfo"]["firstName"] = $("#patient_jqxFirstNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["lastName"] = $("#patient_jqxLastNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["medicalInsuranceCat"] = $("#patient_jqxMedInsCatgNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["medicareCardNumber"] = $("#patient_jqxMedicareCardNumberTxt").val();
    newdata["basicInfo"]["personalInfo"]["dateOfBirth"] = $("#patient_jqxDoBCal").val();
    newdata["basicInfo"]["personalInfo"]["email"] = $("#patient_jqxEmailTxt").val();
    newdata["basicInfo"]["personalInfo"]["smsAlert"] = $("input[name='smsAlertRdo']:checked").val();
    newdata["basicInfo"]["personalInfo"]["permanentProvince"] = $("#patient_jqxPermanentProvinceTxt").val();
    newdata["basicInfo"]["personalInfo"]["permanentCity"] = $("#patient_jqxPermanentCityTxt").val();
    newdata["basicInfo"]["personalInfo"]["permanentDistrict"] = $("#patient_jqxPermanentDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["permanentStreetName"] = $("#patient_jqxPermanentStreetNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["permanentStreetNumber"] = $("#patient_jqxFileNumberTxt").val();
    newdata["basicInfo"]["personalInfo"]["permanentPostalCode"] = $("#patient_jqxPermanentPostalCodeTxt").val();
    newdata["basicInfo"]["personalInfo"]["mailingProvince"] = $("#patient_jqxMailingProvinceTxt").val();
    newdata["basicInfo"]["personalInfo"]["mailingCity"] = $("#patient_jqxMailingCityTxt").val();
    newdata["basicInfo"]["personalInfo"]["mailingDistrict"] = $("#patient_jqxMailingDistrictDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["mailingtStreetName"] = $("#patient_jqxMailingStreetNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["mailingStreetNumber"] = $("#patient_jqxMailingStreetNumberTxt").val();
    newdata["basicInfo"]["personalInfo"]["mailingPostalCode"] = $("#patient_jqxMailingPostalCodeTxt").val();
    newdata["basicInfo"]["personalInfo"]["ethnicity"] = $("#patient_jqxEthnicityDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["maritalStatus"] = $("#patient_jqxMaritalStatusDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["headOfHouseRdo"] = $("input[name='headOfHouseRdo']:checked").val();
    newdata["basicInfo"]["personalInfo"]["occupatCateg"] = $("#patient_jqxOcupationCategoryDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["education"] = $("#patient_jqxEducationDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["personalInfo"]["contactName"] = $("#patient_jqxContactNameTxt").val();
    newdata["basicInfo"]["personalInfo"]["contactTelNumb"] = $("#patient_jqxContactTelNumberTxt").val();
    newdata["basicInfo"]["personalInfo"]["fileManageAgency"] = $("#patient_jqxFileManageAgencyTxt").val();
    newdata["basicInfo"]["personalInfo"]["createdBy"] = $("#patient_jqxCreatedByTxt").val();

    // descript Info
    newdata["basicInfo"]["descriptInfo"] = {};
    newdata["basicInfo"]["descriptInfo"]["gender"] = $("#patient_jqxGenderDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["descriptInfo"]["height"] = $("#patient_jqxHeightTxt").val();
    newdata["basicInfo"]["descriptInfo"]["bloodType"] = $("#patient_jqxBloodTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["descriptInfo"]["rhBloodGroup"] = $("#patient_jqxBloodGrpDdn").jqxDropDownList('getSelectedItem').label;

    // medical info
    newdata["basicInfo"]["medicalInfo"] = {};
    newdata["basicInfo"]["medicalInfo"]["center"] = $("#patient_jqxCenterDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["medicalInfo"]["centerAdmin"] = $("#patient_jqxCenterAdminTxt").val();
    newdata["basicInfo"]["medicalInfo"]["site"] = $("#patient_jqxSiteDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["medicalInfo"]["responsibleDoctor"] = $("#patient_jqxRespDoctorDdn").jqxDropDownList('getSelectedItem').label;
    newdata["basicInfo"]["medicalInfo"]["healthEventName"] = $("#patient_jqxHealthEventNameTxt").val();
    newdata["basicInfo"]["medicalInfo"]["healthDateOfIncident"] = $("#patient_jqxHDoICal").val();
    newdata["basicInfo"]["medicalInfo"]["healthIncidentLocation"] = $("#patient_jqxHealthIncidentLocationTxt").val();
    newdata["basicInfo"]["medicalInfo"]["pastObservProjName"] = $("#patient_jqxPastObservProjNameTxt").val();
    newdata["basicInfo"]["medicalInfo"]["pastObservMethName"] = $("#patient_jqxPastObservMethNameTxt").val();
    newdata["basicInfo"]["medicalInfo"]["pastObser"] = $("#patient_jqxpPastObserTxt").val();

    // allergens
    newdata["allergens"] = {};
    newdata["allergens"]["allergies"] = $("#patient_jqxHaveAllergiesChk").val();
    newdata["allergens"]["allergenDrugs"] = $("#patient_jqxAllergenDrugsDdn").jqxDropDownList('getSelectedItem').label;
    newdata["allergens"]["allergenFood"] = $("#patient_jqxAllergenFoodDdn").jqxDropDownList('getSelectedItem').label;
    newdata["allergens"]["allergenSurrounding"] = $("#patient_jqxAllergenSorroundingDdn").jqxDropDownList('getSelectedItem').label;
    newdata["allergens"]["mixedAllergens"] = $("#patient_jqxMixedAllergenChk").val();
    newdata["allergens"]["otherAllergens"] = $("#patient_jqxOtherAllergensTxt").val();

    // personalHistory
    newdata["personalHistory"] = {};
    newdata["personalHistory"]["medHistory"] = $("#patient_jqxHaveMedicalHistoryChk").val();
    newdata["personalHistory"]["hypertensionDt"] = $("#patient_jqxHypertensionDtCal").val();
    newdata["personalHistory"]["diabetesDt"] = $("#patient_jqxDiabetesDtCal").val();
    newdata["personalHistory"]["cornryHrtDiseaseDt"] = $("#patient_jqxCorHrtDisDtCal").val();
    newdata["personalHistory"]["malignanciesDt"] = $("#patient_jqxMalDgnstDtCal").val();
    newdata["personalHistory"]["mentalIllnessDt"] = $("#patient_jqxSevMenIllDtCal").val();
    newdata["personalHistory"]["tbDt"] = $("#patient_jqxTBDgnstDtCal").val();
    newdata["personalHistory"]["liverDiseaseDt"] = $("#patient_jqxLivDisDgnstDtCal").val();
    newdata["personalHistory"]["pulmonDiseaseDt"] = $("#patient_jqxChrObsPulDgnstDtCal").val();
    newdata["personalHistory"]["congenMalformDt"] = $("#patient_jqxConMalDgnstDtCal").val();
    newdata["personalHistory"]["occupDiseaseDt"] = $("#patient_jqxOccDisDgnstDtCal").val();
    newdata["personalHistory"]["kidneyDiseaseDt"] = $("#patient_jqxKidDgnstDtCal").val();
    newdata["personalHistory"]["otherDiseasesDt"] = $("#patient_jqxOThrNotDgnstDtCal").val();
    newdata["personalHistory"]["otherConfirmDt"] = $("#patient_jqxOthrConfDtCal").val();

    // surgery
    newdata["surgery"] = {};
    newdata["surgery"]["woSurgery"] = $("#patient_jqxWithoutSurgeryChk").val();
    newdata["surgery"]["procedureName"] = $("#patient_jqxNameofProcTxt").val();
    newdata["surgery"]["surgeryDt"] = $("#patient_jqxDtOfSurgeryCal").val();

    // trauma
    newdata["trauma"] = {};
    newdata["trauma"]["traumaHstry"] = $("#patient_jqxHistOfTraumaChk").val();
    newdata["trauma"]["traumaName"] = $("#patient_jqxNameofTraumaTxt").val();
    newdata["trauma"]["traumaBeginDt"] = $("#patient_jqxTraumaBeginDtCal").val();

    // bloodtransfusion
    newdata["bloodtransfusion"] = {};
    newdata["bloodtransfusion"]["bloodTransfHstry"] = $("#patient_jqxHistOfBloodTranChk").val();
    newdata["bloodtransfusion"]["transfusionRsons"] = $("#patient_jqxTranReasonTxt").val();
    newdata["bloodtransfusion"]["transfusionDt"] = $("#patient_jqxTranDtCal").val();

    // hereditaryDiseaseHistory
    newdata["hereditaryDiseaseHistory"] = {};
    newdata["hereditaryDiseaseHistory"]["familyGenHstry"] = $("#patient_jqxHistOfFamilyGeneticsChk").val();
    newdata["hereditaryDiseaseHistory"]["geneticVdName"] = $("#patient_jqxGeneticVDNameTxt").val();

    // familyHistoryofDiseases
    newdata["familyHistoryofDiseases"] = {};
    newdata["familyHistoryofDiseases"]["medHstry"] = $("#patient_jqxMedicalHistChk").val();
    newdata["familyHistoryofDiseases"]["hypertnsnPnt"] = $("#patient_jqxHypertensionWithPatientTxt").val();
    newdata["familyHistoryofDiseases"]["diabetesPntRel"] = $("#patient_jqxDiabetesPatientRelTxt").val();
    newdata["familyHistoryofDiseases"]["RelatPntCrnyHrtDis"] = $("#patient_jqxRelWithPatientWithCoronaryHrtDisTxt").val();
    newdata["familyHistoryofDiseases"]["chronObstPulmnryDis"] = $("#patient_jqxChronicObstructivePulmonarydisRelTxt").val();
    newdata["familyHistoryofDiseases"]["cncrPntRel"] = $("#patient_jqxCancerPatientRelTxt").val();
    newdata["familyHistoryofDiseases"]["stkePntRel"] = $("#patient_jqxStrokePatientRelTxt").val();
    newdata["familyHistoryofDiseases"]["pntMntlIllness"] = $("#patient_jqxPAtientWithSevMentIllRelTxt").val();
    newdata["familyHistoryofDiseases"]["tbPnt"] = $("#patient_jqxTBPatientTxt").val();
    newdata["familyHistoryofDiseases"]["lvrDisPatRel"] = $("#patient_jqxLiverDisPatientrelTxt").val();
    newdata["familyHistoryofDiseases"]["cngntalMalfrmPntRel"] = $("#patient_jqxCogenetalMalPatientRelTxt").val();
    newdata["familyHistoryofDiseases"]["kdnyDisPntRel"] = $("#patient_jqxKidneyDisPatientRelTxt").val();
    newdata["familyHistoryofDiseases"]["anmiaPntRel"] = $("#patient_jqxAnemiaPatientRelTxt").val();

    // disability
    newdata["disability"] = {};
    newdata["disability"]["woDisability"] = $("#patient_jqxWithoutDisablitiesChk").val();
    newdata["disability"]["visualDsblty"] = $("#patient_jqxVisualDisabilityChk").val();
    newdata["disability"]["hearDsblty"] = $("#patient_jqxHearingDisabilityChk").val();
    newdata["disability"]["speechDsblty"] = $("#patient_jqxSpeechDisabilityChk").val();
    newdata["disability"]["physDsblty"] = $("#patient_jqxPhysicalDisabilityChk").val();
    newdata["disability"]["intellDsblty"] = $("#patient_jqxIntellectualDisabilityChk").val();
    newdata["disability"]["mentalDsblty"] = $("#patient_jqxMentalDisabilityChk").val();
    newdata["disability"]["otherDsblty"] = $("#patient_jqxOtherDisabilitiesTxt").val();

    // immunization
    newdata["immunization"] = {};
    newdata["immunization"]["immunization"] = $("#patient_jqxImmunizationDdn").jqxDropDownList('getSelectedItem').label;
    newdata["immunization"]["vaccineNm"] = $("#patient_jqxVaccineNameTxt").val();

    // livingConditions
    newdata["livingConditions"] = {};
    newdata["livingConditions"]["healthRskFctors"] = $("#patient_jqxHealthRskFctorsDdn").jqxDropDownList('getSelectedItem').label;
    newdata["livingConditions"]["ktchnVntltionFac"] = $("#patient_jqxKitchenVentFacDdn").jqxDropDownList('getSelectedItem').label;
    newdata["livingConditions"]["fuelType"] = $("#patient_jqxFuelTypeDdn").jqxDropDownList('getSelectedItem').label;
    newdata["livingConditions"]["drnkngWtrSrcs"] = $("#patient_jqxDrinkingWaterSrcDdn").jqxDropDownList('getSelectedItem').label;
    newdata["livingConditions"]["toilets"] = $("#patient_jqxToiletsDdn").jqxDropDownList('getSelectedItem').label;
    newdata["livingConditions"]["livestckColmn"] = $("#patient_jqxLivestockColumnsDdn").jqxDropDownList('getSelectedItem').label;

    // add row
    if (newRow) {
        newdata["id"] = patientId;
        screenData[screenData.length] = newdata;
        BindData2Grid(screenData);
        //var commit = $(patientGridName).jqxGrid('addrow', screenData.length, newdata);
        //$(patientGridName).jqxGrid("selectrow", screenData.length - 1);
    }
    else {
        // update row
        var selectedRow = $(patientGridName).jqxGrid('getselectedrowindex');
        screenData[selectedRow] = newdata;
        //$(patientGridName).jqxGrid('updaterow', selectedRow, newdata);
        BindData2Grid(screenData);
    }

    ProgressBar('hide');
}

function DeleteFromGrid() {
    var rowscount = $(patientGridName).jqxGrid('getdatainformation').rowscount;
    if (selectedRowIndex >= 0 && selectedRowIndex < rowscount) {
        var rowId = $(patientGridName).jqxGrid('getrowid', selectedRowIndex);
        var commit = $(patientGridName).jqxGrid('deleterow', rowId);
    }
    ClearDetailGrid();
}

// clear detail table content
function ClearDetailGrid() {
    selectedRowIndex = "";
    $("#sideTableID").text("");
    $("#profileImgDtlGrid").attr("src", "/Images/imagePlaceHolder.png");
    $("#patient_jqxButtonUpload").css("display", "");

    document.getElementById("patient_jqxPatientIdTxt").value = "";
    // personal info
    $("#patient_jqxFileNumberTxt").val("");
    $("#patient_jqxFileDtCal").val("");
    $("#patient_jqxFirstNameTxt").val("");
    $("#patient_jqxLastNameTxt").val("");
    $("#patient_jqxMedInsCatgNameTxt").val("");
    $("#patient_jqxMedicareCardNumberTxt").val("");
    $("#patient_jqxDoBCal").val("");
    $("#patient_jqxEmailTxt").val("");

    $("#headOfHouse_yes").iCheck('check');
    $("#smsAlert_yes").iCheck('check');

    $("#patient_jqxPermanentProvinceTxt").val("");
    $("#patient_jqxPermanentCityTxt").val("");
    $("#patient_jqxPermanentDistrictDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxPermanentStreetNameTxt").val("");
    $("#patient_jqxFileNumberTxt").val("");
    $("#patient_jqxPermanentPostalCodeTxt").val("");
    $("#patient_jqxMailingProvinceTxt").val("");
    $("#patient_jqxMailingCityTxt").val("");
    $("#patient_jqxMailingDistrictDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxMailingStreetNameTxt").val("");
    $("#patient_jqxMailingStreetNumberTxt").val("");
    $("#patient_jqxMailingPostalCodeTxt").val("");
    $("#patient_jqxEthnicityDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxMaritalStatusDdn").jqxDropDownList('selectIndex', 0);

    $("#patient_jqxOcupationCategoryDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxEducationDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxContactNameTxt").val("");
    $("#patient_jqxContactTelNumberTxt").val("");
    $("#patient_jqxFileManageAgencyTxt").val("");
    $("#patient_jqxCreatedByTxt").val("");


    // descriptInfo
    $("#patient_jqxGenderDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxHeightTxt").val("");
    $("#patient_jqxBloodTypeDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxBloodGrpDdn").jqxDropDownList('selectIndex', 0);

    // medicalInfo
    $("#patient_jqxCenterDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxCenterAdminTxt").val("");
    $("#patient_jqxSiteDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxRespDoctorDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxHealthEventNameTxt").val("");
    $("#patient_jqxHDoICal").val("");
    $("#patient_jqxHealthIncidentLocationTxt").val("");
    $("#patient_jqxPastObservProjNameTxt").val("");
    $("#patient_jqxPastObservMethNameTxt").val("");
    $("#patient_jqxpPastObserTxt").val("");
    // allergens
    $("#patient_jqxHaveAllergiesChk").val("");
    $("#patient_jqxAllergenDrugsDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxAllergenFoodDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxAllergenSorroundingDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxMixedAllergenChk").val("");
    $("#patient_jqxOtherAllergensTxt").val("");

    // personalHistory
    $("#patient_jqxHaveMedicalHistoryChk").val("");
    $("#patient_jqxHypertensionDtCal").val("");
    $("#patient_jqxDiabetesDtCal").val("");
    $("#patient_jqxCorHrtDisDtCal").val("");
    $("#patient_jqxMalDgnstDtCal").val("");
    //"2012-12-12", // <-- Not found in the UI
    $("#patient_jqxSevMenIllDtCal").val("");
    $("#patient_jqxTBDgnstDtCal").val("");
    $("#patient_jqxLivDisDgnstDtCal").val("");
    $("#patient_jqxChrObsPulDgnstDtCal").val("");
    $("#patient_jqxConMalDgnstDtCal").val("");
    $("#patient_jqxOccDisDgnstDtCal").val("");
    $("#patient_jqxKidDgnstDtCal").val("");
    //"2012-12-12", // <-- Not found in the UI
    $("#patient_jqxOThrNotDgnstDtCal").val("");
    $("#patient_jqxOthrConfDtCal").val("");

    // surgery
    $("#patient_jqxWithoutSurgeryChk").val("");
    $("#patient_jqxNameofProcTxt").val("");
    $("#patient_jqxDtOfSurgeryCal").val("");

    // trauma
    $("#patient_jqxHistOfTraumaChk").val("");
    $("#patient_jqxNameofProcTxt").val("");
    $("#patient_jqxTraumaBeginDtCal").val("");

    // bloodtransfusion
    $("#patient_jqxHistOfBloodTranChk").val("");
    $("#patient_jqxTranReasonTxt").val("");
    $("#patient_jqxTranDtCal").val("");

    // hereditaryDiseaseHistory
    $("#patient_jqxHistOfFamilyGeneticsChk").val("");
    $("#patient_jqxGeneticVDNameTxt").val("");

    // familyHistoryofDiseases
    $("#patient_jqxMedicalHistChk").val("");
    $("#patient_jqxHypertensionWithPatientTxt").val("");
    $("#patient_jqxDiabetesPatientRelTxt").val("");
    $("#patient_jqxRelWithPatientWithCoronaryHrtDisTxt").val("");
    $("#patient_jqxChronicObstructivePulmonarydisRelTxt").val("");
    $("#patient_jqxCancerPatientRelTxt").val("");
    $("#patient_jqxStrokePatientRelTxt").val("");
    $("#patient_jqxPAtientWithSevMentIllRelTxt").val("");
    $("#patient_jqxTBPatientTxt").val("");
    $("#patient_jqxLiverDisPatientrelTxt").val("");
    $("#patient_jqxCogenetalMalPatientRelTxt").val("");
    $("#patient_jqxKidneyDisPatientRelTxt").val("");
    $("#patient_jqxAnemiaPatientRelTxt").val("");

    // disability
    $("#patient_jqxWithoutDisablitiesChk").val("");
    $("#patient_jqxVisualDisabilityChk").val("");
    $("#patient_jqxHearingDisabilityChk").val("");
    $("#patient_jqxSpeechDisabilityChk").val("");
    $("#patient_jqxPhysicalDisabilityChk").val("");
    $("#patient_jqxIntellectualDisabilityChk").val("");
    $("#patient_jqxMentalDisabilityChk").val("");
    $("#patient_jqxOtherDisabilitiesTxt").val("");

    // immunization
    $("#patient_jqxImmunizationDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxVaccineNameTxt").val("");

    // livingConditions
    $("#patient_jqxHealthRskFctorsDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxKitchenVentFacDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxFuelTypeDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxDrinkingWaterSrcDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxToiletsDdn").jqxDropDownList('selectIndex', 0);
    $("#patient_jqxLivestockColumnsDdn").jqxDropDownList('selectIndex', 0);
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