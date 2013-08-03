var pt_id =
[
    "PT_30512057", "PT_30513357", "PT_3432057"
];
var pntLstNm =
[
    "Peterson", "Larsen", "Fragman"
];
var pntFrstNm =
[
    "Andrew", "Nancy", "Shelley"
];
var gndr =
[
    "Male", "Female", "Female"
];
var medInsuranceCat =
[
    "catg1", "catg2", "catg3"
];
var medCardNmbr =
[
    "225", "2435235", "235235"
];
var dateOfBirth =
[
    "12/12/2013", "12/12/2000", "12/12/2001"
];
var phoneNumber =
[
    "9292929292", "9292919292", "001ID_Shelley"
];
var email =
[
    "afka@sdnghsw.com", "afka@sdnghsw.com", "afka@sdnghsw.com"
];
var prvdrLstNm =
[
    "Andrew", "Nancy", "Shelley"
];
var prvdrFrstNm =
[
    "001ID_Andrew", "001ID_Nancy", "001ID_Shelley"
];
var prvdrType =
[
    "type1", "type2", "type3"
];

var hm_patient_data = new Array();
for (var i = 0; i < 3; i++) {
    var row = {};
    row["photo"] = "~/Images/doctorphoto2.png";
    row["id"] = pt_id[i];
    row["pntLstNm"] = pntLstNm[i];
    row["pntFrstNm"] = pntFrstNm[i];
    row["gndr"] = gndr[i];
    row["medInsuranceCat"] = medInsuranceCat[i];
    row["medCardNmbr"] = medCardNmbr[i];
    row["dateOfBirth"] = dateOfBirth[i];
    row["phoneNumber"] = phoneNumber[i];
    row["email"] = email[i];
    row["prvdrLstNm"] = prvdrLstNm[i];
    row["prvdrFrstNm"] = prvdrFrstNm[i];
    row["prvdrType"] = prvdrType[i];

    hm_patient_data[i] = row;
}
var ptSource =
    {
        localdata: hm_patient_data,
        datatype: "array",
        pagesize: 10
    };
var ptDataAdapter = new $.jqx.dataAdapter(ptSource, {
    loadComplete: function (gridData) { },
    loadError: function (xhr, status, error) { }
});
//==========================================================================================
var goalId =
[
    "GL_30512057", "GL_30513357", "GL_3432057"
];
var glType =
[
    "GL_type1", "GL_type2", "GL_type3"
];
var goalDesc =
[
    "GL_Desc1", "GL_Desc2", "GL_Desc3"
];
var srtDt =
[
    "12/12/2001", "12/12/2002", "12/12/2003"
];
var endDt =
[
    "12/12/2002", "12/12/2003", "12/12/2004"
];
var status =
[
    "active", "closed", "active"
];
var hm_goal_data = new Array();
for (var i = 0; i < 3; i++) {
    var row = {};
    row["photo"] = "~/Images/doctorphoto2.png";
    row["id"] = pt_id[i];
    row["pntLstNm"] = pntLstNm[i];
    row["pntFrstNm"] = pntFrstNm[i];
    row["gndr"] = gndr[i];
    row["goalId"] = goalId[i];
    row["glType"] = glType[i];
    row["goalDesc"] = goalDesc[i];
    row["srtDt"] = srtDt[i];
    row["endDt"] = endDt[i];
    row["status"] = status[i];

    hm_goal_data[i] = row;
}
var glSource =
    {
        localdata: hm_goal_data,
        datatype: "array",
        pagesize: 10
    };
var glDataAdapter = new $.jqx.dataAdapter(glSource, {
    loadComplete: function (gridData) { },
    loadError: function (xhr, status, error) { }
});
//================================================================================================================
var assessDt =
[
    "12/12/2001", "12/12/2002", "12/12/2003"
];
var trgtRead =
[
    "read", "read", "actreadive"
];
var actRead =
[
    "write", "write", "write"
];
var grd =
[
    "pass", "fail", "pass"
];
var hm_ass_data = new Array();
for (var i = 0; i < 3; i++) {
    var row = {};
    row["photo"] = "~/Images/doctorphoto2.png";
    row["id"] = pt_id[i];
    row["assessDt"] = assessDt[i];
    row["pntLstNm"] = pntLstNm[i];
    row["pntFrstNm"] = pntFrstNm[i];
    row["gndr"] = gndr[i];
    row["goalId"] = goalId[i];
    row["glType"] = glType[i];
    row["goalDesc"] = goalDesc[i];
    row["srtDt"] = srtDt[i];
    row["endDt"] = endDt[i];
    row["status"] = status[i];
    row["trgtRead"] = status[i];
    row["actRead"] = status[i];
    row["grd"] = status[i];

    hm_ass_data[i] = row;
}
var assSource =
    {
        localdata: hm_ass_data,
        datatype: "array",
        pagesize: 10
    };
var assDataAdapter = new $.jqx.dataAdapter(assSource, {
    loadComplete: function (gridData) { },
    loadError: function (xhr, status, error) { }
});