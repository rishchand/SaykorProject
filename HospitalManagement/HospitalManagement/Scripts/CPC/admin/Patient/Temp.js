function InitializeData() {

    var fileNumber =
        [
            "262362", "243623626", "436346346"
        ];
    var fileDate =
        [
            "12/12/2009", "12/12/2010", "12/12/2011"
        ];
    var firstName =
        [
            "Yujud", "lokif", "poir"
        ];
    var lastName =
        [
            "utyda", "jidr", "oitud"
        ];
    var patientId =
        [
            "0005783", "0028745", "0028458"
        ];
    var medicalInsuranceCategoryName =
        [
            medicalInsuranceCategoryNameList[0], medicalInsuranceCategoryNameList[1], medicalInsuranceCategoryNameList[2]
        ];
    var medicareCardNumber =
        [
            "948329", "393930", "389393"
        ];
    var dateOfBirth =
        [
            "1/1/1987", "2/2/1987", "3/3/1972"
        ];
    var phoneNumber =
        [
            "2235235235", "235235235", "235235235"
        ];
    var email =
        [
            "", "", ""
        ];
    var smsAlert =
        [
            "yes", "no", "yes"
        ];
    var permanentProvince =
        [
            "Gansu", "Guangdong", "Hunan"
        ];
    var permanentCity =
        [
            "Beijing", "Huangshan", "Longhai"
        ];
    var permanentDistrict =
        [
            districtSource[0], districtSource[0], districtSource[0]
        ];
    var permanentStreetName =
        [
            "Cambridge St", "Otis Street", "Waler Street"
        ];
    var permanentStreetNumber =
        [
            "201", "102", "302"
        ];
    var permanentPostalCode =
        [
            "528000", "528002", "528003"
        ];
    var mailingProvince =
        [
            "Gansu", "Guangdong", "Hunan"
        ];
    var mailingCity =
        [
            "Beijing", "Huangshan", "Longhai"
        ];
    var mailingDistrict =
        [
            districtSource[0], districtSource[0], districtSource[0]
        ];
    var mailingtStreetName =
        [
            "Cambridge St", "Otis Street"
        ];
    var mailingStreetNumber =
        [
            "201", "102", "302"
        ];
    var mailingPostalCode =
        [
            "528000", "528002", "528003"
        ];
    var ethnicity =
        [
            ethnicityList[0], ethnicityList[1], ethnicityList[2]
        ];
    var maritalStatus =
        [
            maritalStatusSource[0], maritalStatusSource[1], maritalStatusSource[0]
        ];
    var headOfHouse =
        [
            "yes", "no", "yes"
        ];
    var occupatCateg =
        [
            occupationalCategories[0], occupationalCategories[2], occupationalCategories[1]
        ];
    var education =
        [
            educationList[0], educationList[1], educationList[2]
        ];
    var contactName =
        [
            "kiksu", "akikdi", "palsioa"
        ];
    var contactTelNumb =
        [
            "23523525", "2352523525", "2525235235"
        ];
    var fileManageAgency =
        [
            "Agency1", "Agency2", "Agency3"
        ];
    var createdBy =
        [
            "ikais", "oaslsj", "palsoa"
        ];
    
    for (var i = 0; i < 3; i++) {
        var row = {};
        row["type"] = "patient";
        row["photo"] = "~/Images/doctorphoto2.png";
        row["fileNumber"] = fileNumber[i];
        row["fileDate"] = fileDate[i];
        row["firstName"] = firstName[i];
        row["lastName"] = lastName[i];
        row["id"] = patientId[i];
        row["medicalInsuranceCat"] = medicalInsuranceCategoryName[i];
        row["medicareCardNumber"] = medicareCardNumber[i];
        row["dateOfBirth"] = dateOfBirth[i];
        row["phoneNumber"] = phoneNumber[i];
        row["email"] = email[i];
        row["smsAlert"] = smsAlert[i];
        row["permanentProvince"] = permanentProvince[i];
        row["permanentCity"] = permanentCity[i];
        row["permanentDistrict"] = permanentDistrict[i];
        row["permanentStreetName"] = permanentStreetName[i];
        row["permanentStreetNumber"] = permanentStreetNumber[i];
        row["permanentPostalCode"] = permanentPostalCode[i];
        row["mailingProvince"] = mailingProvince[i];
        row["mailingCity"] = mailingCity[i];
        row["mailingDistrict"] = mailingDistrict[i];
        row["mailingtStreetName"] = mailingtStreetName[i];
        row["mailingStreetNumber"] = mailingStreetNumber[i];
        row["mailingPostalCode"] = mailingPostalCode[i];
        row["ethnicity"] = ethnicity[i];
        row["maritalStatus"] = maritalStatus[i];
        row["headOfHouse"] = headOfHouse[i];
        row["occupatCateg"] = occupatCateg[i];
        row["education"] = education[i];
        row["contactName"] = contactName[i];
        row["contactTelNumb"] = contactTelNumb[i];
        row["fileManageAgency"] = fileManageAgency[i];
        row["createdBy"] = createdBy[i];

        screenData[i] = row;
    }
}