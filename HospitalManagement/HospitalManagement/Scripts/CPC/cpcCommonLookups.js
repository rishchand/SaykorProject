/**************************PROVIDER*******************************/
var emptySource = [
];
var providerTypeSource = [
    "Family Doctor",
    "Dieticians",
    "Preventative Care",
    "Chronic Disease Education",
    "Nurse",
    "Hypertension Specialist",
    "Diabetes Specialist",
    "Medicine",
    "Other"
];

var ownTypeSource = [
    "Family Doctor", 
    "Dieticians",
    "Preventative Care",
    "Chronic Disease Education",
    "Nurse",
    "Hypertension Specialist",
    "Diabetes Specialist",
    "Medicine",
    "Other"

];
var genderSource = [
    "Male",
    "Female"
];

var districtSource = [
    "Jiading District"
];

var centerSource = [
    "Ruijin Hospital Diabetes Center",
    "Juyuan Center",
    "Malu Center",
    "Nanxian Center",
    "Okazaki Center",
    "Jiading District Central Hospital",
    "Ruijin North Hospital"
];

var siteSource = [
    "111",
    "JuyuanCenter",
    "Site2",
    "NanxiangCenter",
    "OkazakiCenter",
    "ContinentalCommunityStation",
    "Outpatient",
    "Inpatient",
    "PackageBridgeTeam",
    "NorthTubeTeam",
    "WarehouseFieldTeam",
    "DayuTeam",
    "ChiaNewTeam",
    "JinmaTeam",
    "LeeTeam",
    "DoubleGoodTeam",
    "PegasusTeam",
    "YuLanTeam"
];

var servicesAvailSource = [
    "Self-Service Checkout",
    "Provider",
    "Both"
];

var maritalStatusSource = [
    "Unmarried",
    "Married",
    "Divorced,Widowed",
    "Unspecified Marital Status"
];

var titleSource = [
    "Primary (inpatient)",
    "Senior (director)",
    "Intermediate (Indications)"
];

var doctorReferralSource = [
    "Yes",
    "No"
];

var specializeSource = [
    "Chronic disease-diabetes",
    "Chronic diseases - hypertension",
    "Cardiovascular and cerebrovascular",
    "Pediatrics",
    "Obstretics and Gynecology",
    "TCM",
    "Digest",
    "Kidney",
    "General",
    "Medicine"
];

/**************************PATIENT*******************************/
var medicalInsuranceCategoryNameList = [
    "Basic Medical Insurance-urban workers",
    "Basic Medical Insurance-Urban residents",
    "New Rural Cooperative Medical Care",
    "Poverty Relief",
    "Commercial Health Relief",
    "All publicly funded",
    "Full Fee",
    "Other"
];
var ethnicityList = [
    "Han",
    "Manchu",
    "Zhuang",
    "Yi",
    "Hui"
];
var occupationalCategories = [
    "Enterprises and Institutions",
    "Profesional and technical",
    "Staff and Associated",
    "Commercial and Service",
    "Agriculture and Forestry",
    "Production and transport",
    "Soldier",
    "Inconvenience to Other Practitioners"
];
var educationList = [
    "Primary School",
    "Junior High School",
    "High School/Technical School/College",
    "College or above",
    "Illiterate and semi-illiterate",
    "Unknown"
];

var DataSectionsSource = [
    { html: "<div style='padding: 1px;font:16px verdana bold;'>Basic Information</div>", title: "Basic Information" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Allergens</div>", title: "Allergens" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Personal History</div>", title: "Personal History" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Surgery</div>", title: "Surgery" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Trauma</div>", title: "Trauma" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Blood Transfusion</div>", title: "Blood Transfusion" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Hereditary Disease History</div>", title: "Hereditary Disease History" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Family History of Diseases</div>", title: "Family History of Diseases" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Disability</div>", title: "Disability" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Immunization</div>", title: "Immunization" },
    { html: "<div style='padding: 1px;;font:16px verdana bold;'>Living Conditions</div>", title: "Living Conditions" }
];

var BloodGroupTypeSource = [
    "A",
    "AB",
    "O",
    "unknown"
];


var BloodGroupSource = [
    "Rh Positive",
    "Rh NEgative",
    "unkonwn"
];

var ResponsibleDoctorSource = [
    "Zhu JIllin",
    "Lee2"
];

var AllergenDrugsSource = [
    "Pencillin Antibiotics",
    "Sulfa Antibiotics",
    "Cephalosporins",
    "Iodine-containing Drugs",
    "Alchohol",
    "Anesthetic Sedation",
    "Other Drugs Allergens"
];

var AllergenFoodSource = [
    "Pork",
    "Lamb",
    "Beef",
    "Milk",
    "Eggs and egg products",
    "Chickens/Ducks and other poultry food",
    "Fish/Shrimp and other aquatic products",
    "Fruit(including shelled nuts)",
    "Other food allergens"
];

var AllergenSorroundingSource = [
    "Pollen",
    "Animal hair",
    "Airborne dust",
    "Other environmental allergens"
];
var ImmunizationSource = [
    "Never immunization",
    "Immunization one or more times",
    "Unknown"
];
var HealthRskFctorsSource = [
    "No",
    "Chemicals",
    "Poison",
    "Ray",
    "Unknown",
    "Other"
];
var KitchenVentilationfacilitiesSource = [
    "No",
    "Hood",
    "Ventilator",
    "Chimney"
];
var FuelTypeSource = [
    "LPG",
    "Coal",
    "Natural Gas",
    "Biogas",
    "Firewood",
    "Other"
];
var DrinkingWaterSources = [
    "Running Water",
    "Purified Filtered Water",
    "Well Water",
    "Lake and River",
    "Pond",
    "Other"
];
var ToiletsSource = [
    "Sanitary Latrines",
    "A Cell or Two Lagoon-Style Format",
    "Toilet",
    "Open Pit",
    "Jianyi Peng Toilet"
];
var LivestockColumnSource = [
    "Single Set",
    "Indoor",
    "Outdoor"
];


/**************************CENTERS*******************************/
var projectSource = [
    "Project 1 - Government",
    "Project 2 - Hospital",
    "Project 3 - University",
    "Project 4 - Corporate",
];

var provTeamNameSource = [
    "Team 1", 
    "Team 2",
    "Team 3",
    "Team 4"
];
var panelGrpSource = [
    "Panel 1",
    "Panel 2",
    "Panel 3", 
    "Panel 4"
];
var diseaseCatgSource = [
    "Chronic Diseases - Diabetes",
    "Chronic Disease - Hypertension",
    "Cardiovascular and cerebrovascular",
    "Pediatrics",
    "Obstretics and Gynecology",
    "TCM",
    "Digest",
    "Kidney",
    "General",
    "Medicine"
];

var prioritySource = [
    "Red",
    "Orange",
    "Green"
];

var worksheetLevelSource = [
    "Low-risk",
    "Dangerous",
    "High-risk"
];

var statusSource = [
    "Pending",
    "Open",
    "Resolved",
    "Closed",
    "Cancelled"
];

var genSourceSource = [
    "HIS",
    "Health Electronic Report",
    "Manuel",
    "Remote Device"
];

var reasonSource = [
    "Cardiovascular",
    "Malignancies",
    "Hepatitis",
    "Anemia",
    "Stroke",
    "Chronic obstructive pulmonary disease",
    "Other",
    "Glucose",
    "Severe mental illness",
    "Congenital malformations",
    "Coronary heart disease",
    "TB",
    "Occupational",
    "Kidney Disease"
];

var drugTypeSource = [
    "Opiates / Opioids",
    "Depressants",
    "Stimulants"
];

var intakeSource = [
    "Oral"
];

var formSource = [
    "Tablets",
    "Syrup"
];

var colorSource = [
    "White",
    "Off White", 
    "Clear",
    "Black",
    "Gray",
    "Brown",
    "Tan",
    "Red",
    "Pink",
    "Orange",
    "Peach",
    "Yellow",
    "Green",
    "Blue",
    "Purple"
];

var shapeSource = [
    "Round",
    "Oblong",
    "Oval",
    "Square",
    "Rectangle",
    "Diamond",
    "3 sided",
    "5 sided",
    "6 sided", 
    "7 sided", 
    "8 sided", 
    "Other"
];

var workgroupTypeSource = [
    "Research Group", 
    "Panel Group"
];

var goalTypeSource = [
    "Physical Activities",
    "Diet",
    "Medication",
    "Dr. Follow Up Appt.",
    "Blood Pressure",
    "Blood Glucose",
    "Weight Watch",
    "Stress Reduction"
];

var goalTypeSource = [
    "Physical Activities",
    "Diet",
    "Medication",
    "Dr. Follow Up Appt.",
    "Blood Pressure",
    "Blood Glucose",
    "Weight Watch",
    "Stress Reduction"
];

var goalStatusSource = [
    "Active",
    "Closed"
];

var gradeSource = [
    "Pass",
    "Fail"
];

var userRoleSource = [
    "Admin",
    "Provider",
    "Patient"
];
//----------------------------------------------------------
var pa_contentSource = ["steps"];
var pa_frequencySource = ["Daily","Weekly", "Monthly"];
var pa_confidenceSource = ["7",  "8",  "9", "10"];

var bg_contentSource = ["Fasting blood"];
var bg_frequencySource = ["Daily", "Weekly", "Monthly"];
var bg_confidenceSource = ["7", "8", "9", "10"];

var bp_contentSource = ["Normal Blood Pressure", "High Blood Pressure"];
var bp_frequencySource = ["Daily", "Weekly", "Monthly"];
var bp_confidenceSource = ["7", "8", "9", "10"];

var dt_contentSource = ["Diet"];
var dt_frequencySource = ["Daily", "Weekly", "Monthly"];
var dt_confidenceSource = ["7", "8", "9", "10"];

var da_contentSource = ["Dr Appt"];
var da_frequencySource = ["Daily", "Weekly", "Monthly"];
var da_confidenceSource = ["7", "8", "9", "10"];

var md_contentSource = ["Medication"];
var md_frequencySource = ["Daily", "Weekly", "Monthly"];
var md_confidenceSource = ["7", "8", "9", "10"];

var sr_contentSource = ["Stress Reduction"];
var sr_frequencySource = [ "Daily", "Weekly", "Monthly"];
var sr_confidenceSource = ["7",  "8",  "9", "10"];

var ww_contentSource = ["Body Weight"];
var ww_frequencySource = ["Daily", "Weekly", "Monthly"];
var ww_confidenceSource = ["7", "8", "9", "10"];

/***************************Medication Details Screen***************************************/
var commUsedDrugSource = [
    "Common Diabetes Drugs",
    "Hypertension commonly used drugs"
];

var commDiabetesDrugClassesSource = [
    "Regular Insulin",
    "Sulfonylureas",
    "Non-sulfonylurea",
    "Glucosidase inhibitors",
    "Glargine",
    "Thiazolidinedione",
    "Chinese medicine antidiabetic drugs",
    "GLP1 analogues",
    "DPP4 inhibitors",
    "Biguanide"
];

var hypertensionDrugClassesSource = [
    "Diuretics",
    "Calcium antagonists",
    "β-blockers",
    "Angiotensin-converting enzyme inhibitors",
    "Angiotensin II receptor blockers",
    "Other"
];

var regularInsulinDrugNameSource = [
    "Aspart",
    "Humalog",
    "Novolin",
    "Humulin",
    "Gansulin",
    "Neutral insulin injection",
    "Wan Surin",
    "Other"
];

var sulfonylureasDrugNameSource = [
    "Glibenclamide",
    "Diamicron",
    "Glipizide",
    "Excellent da Ling",
    "Rui Yi Ning",
    "Qin Su",
    "Mogadishu",
    "Off Courtenay",
    "Gliquidon",
    "McNair fitness",
    "Amaryl",
    "Amdo America",
    "Rueiping",
    "Erik",
    "Wan Su Ping",
    "D860 chip",
    "Other"
];

var nonsulfonylureaDrugNameSource = [
    "Repaglinide",
    "Corfu to Di",
    "Tang Li",
    "Other"
];

var glucosidaseInhibitorsDrugNameSource = [
    "Acarbose",
    "Carbonell flat",
    "Basen",
    "Other"
];

var glargineDrugNameSource = [
    "Lantus", 
    "Long Xiu-lin",
    "Other"
];

var thiazolidinedioneDrugNameSource = [
    "Avandia",
    "Man Damin",
    "Card Division level",
    "Yiting",
    "Other"
];

var chineseMedicineAtidiabeticDrugNameSource = [
    "Xiao Ke Wan",
    "Jin Qi metformin",
    "Other"
];

var GLP1AnaloguesDrugNameSource = [
    "Metformin"
];

var DPP4InhibitorsDrugNameSource = [
    "Compound reserpine"
];

var biguanideDrugNameSource = [

];

var diureticsDrugNameSource = [

];

var calciumAntagonistsDrugNameSource = [

];

var blockersDrugNameSource = [

];

var angiotensinConvertingEnzymeInhibitorsDrugNameSource = [

];

var angiotensiIIReceptorBlockersDrugNameSource = [

];

var otherDrugNameSource = [

];

var freqOfAdminSource = [
     "Once a day", 
     "Twice a day", 
     "Three times a day",
     "Four times a day",
     "Five times a day"
];

var medTimeSource = [
    "Before Meals",
    "Taking meal",
    "After meal",
    "Subcutaneous",
    "Bedtime"
];

var intakeSource = [
    "Oral"
];

/*****************************REferral Appointment Management***********************/
var timePeriodSource = [
    "Morning",
    "Afternoon"
];

var apptTypeSource = [
    "Followup Appointment",
    "Referral"
];
var serviceProvSource = [
     "Administrator", 
     "Hu Lifang",
     "Shi Jia", 
     "Dong Bin", 
     "Chen Yuhong", 
     "Small Zhuo",
     "Wang two",
     "Wang Jianghong"
];

var clinicHours = {
    "Administrator": { "ClinicHour": "Tuesday afternoon, Friday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "50" },
    "Hu Lifang": { "ClinicHour": "Tuesday afternoon, Friday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "10" },
    "Shi Jia": { "ClinicHour": "Wednesday morning, Wednesday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "10" },
    "Dong Bin": { "ClinicHour": "Monday morning, Tuesday morning, Wednesday morning, Thursday morning, Friday morning, Monday afternoon, Tuesday afternoon, Wednesday afternoon, Thursday afternoon, Friday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "10" },
    "Chen Yuhong": { "ClinicHour": "Friday morning, Friday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "20" },
    "Small Zhuo": { "ClinicHour": "Monday morning, Tuesday morning, Wednesday morning, Thursday morning, Friday morning, Saturday morning, Sunday morning, Monday afternoon, Tuesday afternoon, Wednesday afternoon, Thursday afternoon, Friday afternoon, Saturday afternoon, Sunday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "30" },
    "Wang two": { "ClinicHour": "Monday morning, Tuesday morning, Wednesday morning, Thursday morning, Friday morning, Monday afternoon, Tuesday afternoon, Wednesday afternoon, Thursday afternoon, Friday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "40" },
    "Wang Jianghong": { "ClinicHour": "Monday morning, Tuesday morning, Wednesday morning, Thursday morning, Friday morning, Saturday morning, Sunday morning, Monday afternoon, Tuesday afternoon, Wednesday afternoon, Thursday afternoon, Friday afternoon, Saturday afternoon, Sunday afternoon", "OutpatientCondition": "None", "OutpatientVisit": "10" },
};