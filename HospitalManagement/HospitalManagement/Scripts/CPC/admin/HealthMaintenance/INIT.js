var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var newRow = true;
var globalColumnWidth = "90%";
var self = this;
var theme = "custom";
/*****************************************************************************************************/
/***********************************ONLOAD FUNCTION***************************************************/
/*****************************************************************************************************/
$(document).ready(function () {
    // This Loads the Menu and other necessary common scripts from the CPCCommon.js
    InitializeCPCCommon();

    InitializeUI();

    InitializeTabSplitterExpander();

    InitializeGoalActiveGrid();

    InitializeGoalClosedGrid();

    InitializeAssGrid();
});

function InitializeUI() {
    // Buttons
    $("#goal_jqxButtonAdd").jqxButton({ width: '70', theme: "custom" });
    $("#goal_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#goal_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });

    $("#ass_jqxButtonAdd").jqxButton({ width: '70', theme: "custom" });
    $("#ass_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#ass_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });

    // Calendar
    $("#hm_jqx_gd_StrtDtCal").jqxDateTimeInput({ width: '140px', height: '25', theme: theme });
    $("#hm_jqx_gd_EndDtCal").jqxDateTimeInput({ width: '140px', height: '25', theme: theme });

    $("#hm_jqx_ass_assDtCal").jqxDateTimeInput({ width: '140px', height: '25', theme: theme });
    $("#hm_jqx_ass_startDtCal").jqxDateTimeInput({ width: '140px', height: '25', theme: theme });
    $("#hm_jqx_ass_endDtCal").jqxDateTimeInput({ width: '140px', height: '25', theme: theme });
    /**********************************************************************************************/
    // Textbox
    $("#hm_jqx_gd_goalIdTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gd_DescTxt").jqxInput({ width: '140px', height: '20', theme: theme });

    $("#hm_jqx_gc_goalCompTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gc_goalFreqTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gc_goalConfTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gc_goalTgtReadTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gc_goalLocConTxt").jqxInput({ width: '140px', height: '20', theme: theme });

    $("#hm_jqx_ass_patientIdTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_lastNameTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_firstNameTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_goalIdTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_goalDescTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_tgtReadTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_actReadTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_ass_comTxt").jqxInput({ width: '140px', height: '20', theme: theme });

    $("#hm_jqx_gc_goalTgtReadTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    $("#hm_jqx_gc_goalLocConTxt").jqxInput({ width: '140px', height: '20', theme: theme });
    /**********************************************************************************************/
    // Dropdown
    $("#hm_jqx_gd_goalTypeDdn").jqxDropDownList({ source: goalTypeSource, selectedIndex: -1, width: '140px', height: '20', theme: "custom" });
    $('#hm_jqx_gd_goalTypeDdn').on('select', function (event) {
        var args = event.args;
        var item = $('#hm_jqx_gd_goalTypeDdn').jqxDropDownList('getItem', args.index);
        SwitchGoalComponent(item.label);
    });
    $("#hm_jqx_gd_goalStatusDdn").jqxDropDownList({ source: goalStatusSource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    
    $("#hm_jqx_ass_genderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    $("#hm_jqx_ass_goalTypeDdn").jqxDropDownList({ source: goalTypeSource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    $("#hm_jqx_ass_statusDdn").jqxDropDownList({ source: goalStatusSource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    $("#hm_jqx_ass_gradeDdn").jqxDropDownList({ source: gradeSource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    
    $("#hm_jqx_gc_goalCompDdn").jqxDropDownList({ source: emptySource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    $("#hm_jqx_gc_goalFreqDdn").jqxDropDownList({ source: emptySource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    $("#hm_jqx_gc_goalConfDdn").jqxDropDownList({ source: emptySource, selectedIndex: 1, width: '140px', height: '20', theme: "custom" });
    /**********************************************************************************************/
}

function InitializeTabSplitterExpander() {
    // Tabs
    $('#goals_jqxTabs').jqxTabs({ height: '100%', position: 'top', theme: theme });

    // Splitter
    $('#mainSplitter1').jqxSplitter({ theme: theme, width: '100%', height: 600, panels: [{ size: '30%', min: '30%' }, { min: '30%', size: '30%' }] });
    $('#mainSplitter2').jqxSplitter({ theme: theme, width: '100%', height: 600, panels: [{ size: '50%', min: '50%' }, { min: '30%', size: '30%' }] });
    $('#goalSplitter').jqxSplitter({ width: '100%', height: '100%', theme: theme, orientation: 'horizontal', panels: [{ size: '40%', min: '30%', collapsible: true }, { min: '30%', collapsible: true }] });
    $('#assessmentSplitter').jqxSplitter({ width: '100%', height: '100%', theme: theme, orientation: 'horizontal', panels: [{ size: '40%', min: '30%', collapsible: true }, { min: '30%', collapsible: true }] });

    // MainSplitter1 --> Container1
    $("#patientExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
        initContent: function () {
            InitializePatientGrid();
        }
    });
    // Goal Splitter --> Container1
    $("#goalListExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme
    });
    // Goal Splitter --> Container2
    $("#goalDetailExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "40%", theme: theme
    });
    // Goal Splitter --> Container2
    $("#goalCompExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "60%", theme: theme
    });
    // Assessment Splitter --> Container1
    $("#assessmentListExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: theme,
        initContent: function () {
            InitializeAssGrid();
        }
    });
    // Assessment Splitter --> Container2
    $("#assessmentContentExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "90%", theme: theme
    });
}

// Initialize Patient grid
function InitializePatientGrid() {
    $('#hm_patient_jqxgrid').jqxGrid({
        theme: "custom",
        width: "170%",
        height: "100%",
        source: ptDataAdapter,
        sortable: true,
        filterable: true,
        pageable: true,
        pagerrenderer: PT_pagerrenderer,
        columns: [
          {
              text: 'PATIENT ID',
              datafield: 'id',
              width: "12%"
          },
          {
              text: 'LAST NAME',
              datafield: 'pntLstNm',
              width: "15%"
          },
          {
              text: 'FIRST NAME',
              datafield: 'pntFrstNm',
              width: "18%"
          },
          {
              text: 'GENDER',
              datafield: 'gndr',
              width: "13%"
          },
          {
              text: 'MED INS CATG NAME',
              datafield: 'medInsuranceCat',
              width: "18%"
          },
          {
              text: 'MEDICARE CARD NUMBER',
              datafield: 'medCardNmbr',
              width: "13%"
          },
          {
              text: 'DATE OF BIRTH',
              datafield: 'dateOfBirth',
              width: "13%"
          },
          {
              text: 'PHONE NUMBER',
              datafield: 'phoneNumber',
              width: "13%"
          },
          {
              text: 'EMAIL',
              datafield: 'email',
              width: "8%"
          },
          {
              text: 'PROVIDER LAST NAME',
              datafield: 'prvdrLstNm',
              width: "8%"
          },
          {
              text: 'PROVIDER FIRST NAME',
              datafield: 'prvdrFrstNm',
              width: "8%"
          },
          {
              text: 'PROVIDER TYPE',
              datafield: 'prvdrType',
              width: "8%"
          }
        ]
    });
}

// Initialize Goal Active grid
function InitializeGoalActiveGrid() {
    $('#hm_goalActive_jqxgrid').jqxGrid({
        theme: "custom",
        width: "99%",
        source: glDataAdapter,
        sortable: true,
        filterable: true,
        pageable: true,
        pagerrenderer: GLActivepagerrenderer,
        height:'99%',
        //autoheight: true,
        columns: [
            {
                text: 'GOAL ID',
                datafield: 'goalId',
                width: "25%"
            },
          {
              text: 'LAST NAME',
              datafield: 'pntLstNm',
              width: "29%"
          },
          {
              text: 'FIRST NAME',
              datafield: 'pntFrstNm',
              width: "29%"
          },
          {
              text: 'GENDER',
              datafield: 'gndr',
              width: "13%"
          }
        ]
    });
}

// Initialize Goal Closed grid
function InitializeGoalClosedGrid() {
    $('#hm_goalClosed_jqxgrid').jqxGrid({
        theme: "custom",
        width: "99%",
        source: glDataAdapter,
        sortable: true,
        filterable: true,
        pageable: true,
        pagerrenderer: GLClosedpagerrenderer,
        autoheight: true,
        columns: [
            {
                text: 'GOAL ID',
                datafield: 'goalId',
                width: "25%"
            },
          {
              text: 'LAST NAME',
              datafield: 'pntLstNm',
              width: "30%"
          },
          {
              text: 'FIRST NAME',
              datafield: 'pntFrstNm',
              width: "30%"
          },
          {
              text: 'GENDER',
              datafield: 'gndr',
              width: "13%"
          }
        ]
    });
}

// Initialize Assessment grid
function InitializeAssGrid() {
    $('#hm_ass_jqxgrid').jqxGrid({
        theme: "custom",
        width: "99%",
        source: assDataAdapter,
        sortable: true,
        filterable: true,
        pageable: true,
        pagerrenderer: Asspagerrenderer,
        height:'100%',
        //autoheight: true,
        columns: [
          {
              text: 'PATIENT ID',
              datafield: 'id',
              width: "20%"
          },
          {
              text: 'ASSESSMENT  DATE',
              datafield: 'assessDt',
              width: "20%"
          },
          {
              text: 'LAST NAME',
              datafield: 'pntLstNm',
              width: "20%"
          },
          {
              text: 'FIRST NAME',
              datafield: 'pntFrstNm',
              width: "20%"
          },
          {
              text: 'GENDER',
              datafield: 'gndr',
              width: "16%"
          }
        ]
    });
}

var PT_pagerrenderer = function () {
    var datainfo = $("#hm_patient_jqxgrid").jqxGrid('getdatainformation');
    return MakePaginationUI(datainfo, "#hm_patient_jqxgrid");
}

var GLActivepagerrenderer = function () {
    var datainfo = $("#hm_goalActive_jqxgrid").jqxGrid('getdatainformation');
    return MakePaginationUI(datainfo, "#hm_goalActive_jqxgrid");
}

var GLClosedpagerrenderer = function () {
    var datainfo = $("#hm_goalClosed_jqxgrid").jqxGrid('getdatainformation');
    return MakePaginationUI(datainfo, "#hm_goalClosed_jqxgrid");
}

var Asspagerrenderer = function () {
    var datainfo = $("#hm_ass_jqxgrid").jqxGrid('getdatainformation');
    return MakePaginationUI(datainfo, "#hm_ass_jqxgrid");
}

$("#hm_patient_jqxgrid").on('pagechanged', function () {
    var datainfo = $("#hm_patient_jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
});

$("#hm_goal_jqxgrid").on('pagechanged', function () {
    var datainfo = $("#hm_goal_jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
});


$("#hm_ass_jqxgrid").on('pagechanged', function () {
    var datainfo = $("#hm_ass_jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
});


$("#hm_ass_jqxgrid").on('pagechanged', function () {
    var datainfo = $("#hm_ass_jqxgrid").jqxGrid('getdatainformation');
    var paginginfo = datainfo.paginginformation;
    self.label.text(1 + paginginfo.pagenum * paginginfo.pagesize + "-" + Math.min(datainfo.rowscount, (paginginfo.pagenum + 1) * paginginfo.pagesize) + ' of ' + datainfo.rowscount);
});


function SwitchGoalComponent(goalType) {
    var newContentSource;
    var newfreqSource;
    var newConfidenceSource;
    switch (goalType) {
        case "Physical Activities":
            newContentSource = pa_contentSource;
            newfreqSource = pa_frequencySource;
            newConfidenceSource = pa_confidenceSource;
            break;
        case "Diet":
            newContentSource = dt_contentSource;
            newfreqSource = dt_frequencySource;
            newConfidenceSource = dt_confidenceSource;
            break;
        case "Medication":
            newContentSource = md_contentSource;
            newfreqSource = md_frequencySource;
            newConfidenceSource = md_confidenceSource;
            break;
        case "Dr. Follow Up Appt.":
            newContentSource = da_contentSource;
            newfreqSource = da_frequencySource;
            newConfidenceSource = da_confidenceSource;
            break;
        case "Blood Pressure":
            newContentSource = bp_contentSource;
            newfreqSource = bp_frequencySource;
            newConfidenceSource = bp_confidenceSource;
            break;
        case "Blood Glucose":
            newContentSource = bg_contentSource;
            newfreqSource = bg_frequencySource;
            newConfidenceSource = bg_confidenceSource;
            break;
        case "Weight Watch":
            newContentSource = ww_contentSource;
            newfreqSource = ww_frequencySource;
            newConfidenceSource = ww_confidenceSource;
            break;
        case "Stress Reduction":
            newContentSource = sr_contentSource;
            newfreqSource = sr_frequencySource;
            newConfidenceSource = sr_confidenceSource;
            break;
    }

    $("#hm_jqx_gc_goalCompDdn").jqxDropDownList({ source: newContentSource, selectedIndex: -1 });
    $("#hm_jqx_gc_goalFreqDdn").jqxDropDownList({ source: newfreqSource, selectedIndex: -1 });
    $("#hm_jqx_gc_goalConfDdn").jqxDropDownList({ source: newConfidenceSource, selectedIndex: -1 });
    $('#hm_jqx_gc_goalTgtReadTxt').jqxInput('val', '');
    $('#hm_jqx_gc_goalLocConTxt').jqxInput('val', '');
}

function MakePaginationUI(datainfo, gridName) {
    var element = $("<div style='margin-left: 10px; margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = datainfo.paginginformation;
    var leftButton = $("<div style='padding: 0px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
    leftButton.find('div').addClass('jqx-icon-arrow-left');
    leftButton.width(36);
    leftButton.jqxButton({ theme: theme });
    var rightButton = $("<div style='padding: 0px; margin: 0px 3px; float: left;'><div style='margin-left: 9px; width: 16px; height: 16px;'></div></div>");
    rightButton.find('div').addClass('jqx-icon-arrow-right');
    rightButton.width(36);
    rightButton.jqxButton({ theme: theme });
    leftButton.appendTo(element);
    rightButton.appendTo(element);
    var label = $("<div style='font-size: 11px; margin: 2px 3px; font-weight: bold; float: left;'></div>");
    label.text("1-" + paginginfo.pagesize + ' of ' + datainfo.rowscount);
    label.appendTo(element);
    self.label = label;
    // update buttons states.
    var handleStates = function (event, button, className, add) {
        button.on(event, function () {
            if (add == true) {
                button.find('div').addClass(className);
            }
            else button.find('div').removeClass(className);
        });
    }
    if (theme != '') {
        handleStates('mousedown', rightButton, 'jqx-icon-arrow-right-selected-' + theme, true);
        handleStates('mouseup', rightButton, 'jqx-icon-arrow-right-selected-' + theme, false);
        handleStates('mousedown', leftButton, 'jqx-icon-arrow-left-selected-' + theme, true);
        handleStates('mouseup', leftButton, 'jqx-icon-arrow-left-selected-' + theme, false);
        handleStates('mouseenter', rightButton, 'jqx-icon-arrow-right-hover-' + theme, true);
        handleStates('mouseleave', rightButton, 'jqx-icon-arrow-right-hover-' + theme, false);
        handleStates('mouseenter', leftButton, 'jqx-icon-arrow-left-hover-' + theme, true);
        handleStates('mouseleave', leftButton, 'jqx-icon-arrow-left-hover-' + theme, false);
    }

    rightButton.click(function () {
        $(gridName).jqxGrid('gotonextpage');
    });
    leftButton.click(function () {
        $(gridName).jqxGrid('gotoprevpage');
    });

    return element;
}