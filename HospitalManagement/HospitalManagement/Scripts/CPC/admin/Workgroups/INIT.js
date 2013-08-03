var source;
var dataAdapter;
var loginSessionContext;
var role = "";
var selectedRowIndex = "-1";
var screenData = new Array();
var newRow = true;
var globalColumnWidth = "90%";
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

    // Initialize PAtientList Grids
    InitializeProviderGrid();

    // Go to Add New Mode by default
    ClearDetailGrid();

});

function InitializeProviderGrid() {
    // Grid
    $("#wg_provider_jqxgrid").jqxGrid(
        {
            theme: "custom",
            width: "200%",
            height: '99%',
            //source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer,
            columns: [
              {
                  text: '&nbsp;USER NAME',
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

    // Grid
    $("#wg_jqxAllProviderGrid").jqxGrid(
        {
            theme: "custom",
            width: "200%",
            height: '99%',
            //source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer,
            columns: [
              {
                  text: '',
                  datafield: 'check',
                  cellsrenderer: allProvider_cellsrenderer,
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
}

function InitializeSplitters() {
    $('#mainSplitter1').jqxSplitter({ theme: "custom", width: '99.8%', height: 600, panels: [{ size: '40%', min: '30%', collapsible: false }, { min: '30%', size: '60%' }] });
    $('#mainSplitter2').jqxSplitter({ theme: "custom", width: '100%', height: 600, panels: [{ size: '40%', min: '60%' }, { min: '40%', size: '40%' }] });
    $("#workGrpGridExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: "custom",
    });
    $("#workGrpDtlExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: "custom",
    });
    $("#workGrpProviderExpander").jqxExpander({
        toggleMode: 'none', showArrow: false, width: "100%", height: "100%", theme: "custom",
    });
}

/*****************************************************************************************************/
/***********************************INITIALIZE UI*****************************************************/
// 1. Init Buttons, Textboxes, dropdowns, grid
// 2. Bind Grid Events
/*****************************************************************************************************/
function InitializeUI() {
    // Buttons
    $("#WorkGroup_jqxButtonAdd").jqxButton({ width: '80', theme: "custom" });
    $("#WorkGroup_jqxButtonEdit").jqxButton({ width: '80', theme: "custom" });
    $("#WorkGroup_jqxButtonDelete").jqxButton({ width: '70', theme: "custom" });
    $("#WorkGroup_jqxButtonCancel").jqxButton({ width: '70', theme: "custom" });
    $("#WorkGroup_jqxButtonSave").jqxButton({ width: '70', theme: "custom" });
    $("#WorkGroup_jqxButtonUpload").jqxButton({ width: '70', theme: "custom" });
    $("#WorkGroup_jqxButtonSelectProvider").jqxButton({ width: '120', theme: "custom" });


    // TextBoxes    
    $("#WorkGroup_jqxIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxNmRsrchGrpTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxDescriptTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxOwnIdTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxOwnerTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxMobPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxWrkPhoneTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxCenterAdminTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxPatientsTxt").jqxInput({ width: globalColumnWidth, height: '20px' });
    $("#WorkGroup_jqxProvidersTxt").jqxInput({ width: globalColumnWidth, height: '20px' });

    // Dropdown
    $("#WorkGroup_jqxWorkgroupTypeTxtDdn").jqxDropDownList({ source: workgroupTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxOwnTypeTxtDdn").jqxDropDownList({ source: ownTypeSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxGenderDdn").jqxDropDownList({ source: genderSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxPrjctDdn").jqxDropDownList({ source: projectSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxCenterDdn").jqxDropDownList({ source: centerSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxSiteDdn").jqxDropDownList({ source: siteSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });
    $("#WorkGroup_jqxServicesAvailDdn").jqxDropDownList({ source: servicesAvailSource, selectedIndex: 1, width: globalColumnWidth, height: '20', theme: "custom" });

    // Window
    $("#selectProviderPopUp").dialog({
        autoOpen: false,
        height: 530,
        width: 700,
        modal: true,
        buttons: {
            "Select Providers": function () {

            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
        }
    });

    // Data Adaptor
    BindData2Grid(screenData);

    // Grid
    $("#WorkGroup_jqxgrid").jqxGrid(
        {
            theme: "custom",
            width: "200%",
            height: "99%",
            source: dataAdapter,
            sortable: true,
            filterable: true,
            pageable: true,
            rowsheight: 50,
            pagerrenderer: pagerrenderer,
            columns: [
              {
                  text: '',
                  datafield: 'photo',
                  cellsrenderer: cellsrenderer,
                  width: "5%",
                  height: "100"
              },
              {
                  text: 'WORKGROUP ID',
                  datafield: 'id',
                  width: "11%",
                  renderer: columnsrenderer
              },
              {
                  text: 'WORKGROUP TYPE',
                  datafield: 'wrkgrpType',
                  width: "11%",
                  renderer: columnsrenderer
              },
              {
                  text: 'WORKGROUP NAME',
                  datafield: 'NmRsrchGrp',
                  width: "11%",
                  renderer: columnsrenderer
              },
              {
                  text: 'WORKGROUP DESCRIPTION',
                  datafield: 'descript',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'OWNER TYPE',
                  datafield: 'ownType',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'OWNER ID',
                  datafield: 'ownId',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'OWNER',
                  datafield: 'owner',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'MOBILE PHONE',
                  datafield: 'mobPhone',
                  width: "11%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PATIENTS',
                  datafield: 'patients',
                  width: "12%",
                  renderer: columnsrenderer
              },
              {
                  text: 'PROVIDERS',
                  datafield: 'providers',
                  width: "12%",
                  renderer: columnsrenderer
              }
            ]
        });

    // Event Binding
    $("#WorkGroup_jqxgrid").bind('rowselect', function (event) {
        selectedRowIndex = event.args.rowindex;
        $("#WorkGroup_profileImgDtlGrid").attr("src", "/Images/doctorphoto2.png");
        $("#WorkGroup_jqxButtonUpload").css("display", "none");
        $("#WorkGroup_sideTableID").text(screenData[selectedRowIndex]["id"]);

        $("#WorkGroup_jqxIdTxt").val(screenData[selectedRowIndex]["id"]);
        $("#WorkGroup_jqxNmRsrchGrpTxt").val(screenData[selectedRowIndex]["NmRsrchGrp"]);
        $("#WorkGroup_jqxDescriptTxt").val(screenData[selectedRowIndex]["descript"]);
        $("#WorkGroup_jqxOwnIdTxt").val(screenData[selectedRowIndex]["ownId"]);
        $("#WorkGroup_jqxOwnerTxt").val(screenData[selectedRowIndex]["owner"]);
        $("#WorkGroup_jqxMobPhoneTxt").val(screenData[selectedRowIndex]["mobPhone"]);
        $("#WorkGroup_jqxWrkPhoneTxt").val(screenData[selectedRowIndex]["wrkPhone"]);
        $("#WorkGroup_jqxCenterAdminTxt").val(screenData[selectedRowIndex]["centerAdmin"]);
        $("#WorkGroup_jqxPatientsTxt").val(screenData[selectedRowIndex]["patients"]);
        $("#WorkGroup_jqxProvidersTxt").val(screenData[selectedRowIndex]["providers"]);

        $("#WorkGroup_jqxWorkgroupTypeTxtDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["wrkgrpType"], workgroupTypeSource));
        $("#WorkGroup_jqxOwnTypeTxtDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["ownType"], ownTypeSource));
        $("#WorkGroup_jqxGenderDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["gender"], genderSource));
        $("#WorkGroup_jqxPrjctDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["prjct"], projectSource));
        $("#WorkGroup_jqxCenterDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["center"], centerSource));
        $("#WorkGroup_jqxSiteDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["site"], siteSource));
        $("#WorkGroup_jqxServicesAvailDdn").jqxDropDownList('selectIndex', jQuery.inArray(screenData[selectedRowIndex]["servicesAvail"], servicesAvailSource));
    });
}

var pagerrenderer = function () {
    var element = $("<div style='margin-top: 5px; width: 100%; height: 100%;'></div>");
    var paginginfo = $("#WorkGroup_jqxgrid").jqxGrid('getpaginginformation');
    for (i = 0; i < paginginfo.pagescount; i++) {
        // add anchor tag with the page number for each page.
        var anchor = $("<a style='padding: 5px;' href='#" + i + "'>" + i + "</a>");
        anchor.appendTo(element);
        anchor.click(function (event) {
            // go to a page.
            var pagenum = parseInt($(event.target).text());
            $("#WorkGroup_jqxgrid").jqxGrid('gotopage', pagenum);
        });
    }
    return element;
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

    $("#WorkGroup_jqxgrid").jqxGrid("updatebounddata", "cells");
    ProgressBar('hide');
}

// Grid Events Functions
var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<img src='/Images/doctorphoto2.png' width='40px' height='40px' style='margin: 5px;border:0px solid #fff' />";
}
var columnsrenderer = function (value) {
    return '<div style="text-align: left; margin-top: 5px;">' + value + '</div>';
}
var allProvider_cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
    return "<input type='checkbox'/>";
}