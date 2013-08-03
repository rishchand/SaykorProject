
var source2;
var dataAdapter2;
var source3;
var dataAdapter3;



function InitializeCronicleDiseaseUI() {

    // alert("in InitializeCronicleDiseaseUI");
    $("#ticket_tab").jqxTabs({ theme: "custom" });

    var data = new Array();
    source2 =
       {
           localdata: data,
           datatype: "array",
           pagesize: 10
       };
    dataAdapter2 = new $.jqx.dataAdapter(source2);

    $("#ticket_clinicInfoGrid").jqxGrid(
       {
           theme: "custom",
           width: "99%",
           height: "120",
           source: dataAdapter2,
           selectionmode: 'singlecell',
           columns: [

             {
                 text: '2013/01 ~ 2013/12',
                 datafield: 'time',
                 width: "130",

                 renderer: columnsrenderer
             },
             {
                 text: 'Clinical Information',
                 datafield: 'clinicalInfo',
                 width: "130",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },
             {
                 text: 'Medical Report',
                 datafield: 'medicalReport',
                 width: "120",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },

             {
                 text: 'Vaccine Records',
                 datafield: 'caccineRecords',
                 width: "120",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },
             {
                 text: 'Radiography',
                 datafield: 'radiography',
                 width: "100",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },
             {
                 text: 'Report questionnaire',
                 datafield: 'reportQuestionnaire',
                 width: "140",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },
             {
                 text: 'Medication Records',
                 datafield: 'medicationRecords',
                 width: "120",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             },
             {
                 text: 'Pathology Report',
                 datafield: 'pathologyReport',
                 width: "120",
                 columntype: 'checkbox',
                 renderer: columnsrenderer
             }

           ]
       });
    BindData2ClinicalGrid(null);


    var data3 = new Array();
    source3 =
       {
           localdata: data3,
           datatype: "array",
           pagesize: 10
       };

    var initrowdetails = function (index, parentElement, gridElement, datarecord) {
        var tabsdiv = null;
        var information = null;
        var notes = null;
        tabsdiv = $($(parentElement).children()[0]);

        if (tabsdiv != null) {
            information = tabsdiv.find('.information');
            notes = tabsdiv.find('.notes');
            var title = tabsdiv.find('.title');
            title.text("体重(kg)");
            var tab2 = tabsdiv.find('.tab2');
            tab2.text("BMI(体重 kg/身高 m2)");

            var container = $('<div style="margin: 5px;"></div>')
            container.appendTo($(information));

            var leftcolumn = $('<div style="float: left; width: 45%;"></div>');
            var rightcolumn = $('<div style="float: left; width: 40%;"></div>');

            container.append(leftcolumn);
            container.append(rightcolumn);

            var dateLabel = "<div style='margin: 10px;'><b>Date:</b></div>";
            var date = "<div style='margin: 10px;'><b>2013-06-14</b></div>";
            $(leftcolumn).append(dateLabel);
            $(leftcolumn).append(date);
            var date = "<div style='margin: 10px;'><b>2013-06-20</b></div>";
            $(leftcolumn).append(date);

            var name = "<div style='margin: 10px;'><b>体重(kg):</b> " + "</div>";
            var measure1 = "<div style='margin: 10px;'><b>99</b></div>";
            $(rightcolumn).append(name);
            $(rightcolumn).append(measure1);
            var measure1 = "<div style='margin: 10px;'><b>98</b></div>";
            $(rightcolumn).append(measure1);

            // var notescontainer = $('<div style="white-space: normal; margin: 5px;"><span>' + "" + '</span></div>');
            var notescontainer = $('<div style="margin: 5px;"></div>');
            notescontainer.appendTo($(notes));
            var leftcolumn = $('<div style="float: left; width: 45%;"></div>');
            var rightcolumn = $('<div style="float: left; width: 40%;"></div>');

            notescontainer.append(leftcolumn);
            notescontainer.append(rightcolumn);

            var dateLabel = "<div style='margin: 10px;'><b>Date:</b></div>";
            var date = "<div style='margin: 10px;'><b>2013-06-14</b></div>";
            $(leftcolumn).append(dateLabel);
            $(leftcolumn).append(date);

            var name = "<div style='margin: 10px;'><b>BMI(体重 kg/身高 m2):</b> " + "</div>";
            var measure1 = "<div style='margin: 10px;'><b>26.5</b></div>";
            $(rightcolumn).append(name);
            $(rightcolumn).append(measure1);

            $(tabsdiv).jqxTabs({ width: "90%", height: 170, theme: "custom" });
        }
    }
    dataAdapter3 = new $.jqx.dataAdapter(source3);

    $("#ticket_clinicInfoGrid2").jqxGrid(
       {
           theme: "custom",
           width: "99%",
           height: "400",
           source: dataAdapter3,
           showheader: false,
           rowdetails: true,
           scrollmode: 'logical',
           rowdetailstemplate: { rowdetails: "<div style='margin: 10px;'><ul style='margin-left: 30px;'><li class='title'></li><li class='tab2'></li></ul><div class='information'></div><div class='notes'></div></div>", rowdetailsheight: 200 },
           initrowdetails: initrowdetails,
           columns: [

             {
                 datafield: 'clinicalInfo1',
                 width: "250",

             },
             {
                 datafield: 'clinicalInfo1_numbers',
                 width: "100",

             },
             {
                 datafield: 'clinicalInfo2',
                 width: "250",

             },
              {
                  datafield: 'clinicalInfo2_numbers',
                  width: "100",

              },
           ]
       });

    $("#ticket_clinicInfoGrid").bind('cellselect', function (event) {
        var row = event.args.rowindex;
        var columnheader = $("#ticket_clinicInfoGrid").jqxGrid('getcolumn', event.args.datafield).text;
        //alert(row);
        // alert(columnheader);
        if (columnheader == "Clinical Information") {
            $("#ticket_clinical_mark").css("display", "");
            BindData2ClinicalGrid2(row, columnheader);
        }
    });

}


function BindData2ClinicalGrid(gridData) {
    // source.localdata = gridData;
    var data = new Array();
    var row = {};
    row["time"] = "2013/06/01-/06/30";
    row["clinicalInfo"] = true;
    row["medicalReport"] = false;
    row["caccineRecords"] = false;
    row["radiography"] = false;
    row["reportQuestionnaire"] = false;
    row["medicationRecords"] = false;
    row["pathologyReport"] = false;
    data[0] = row;

    source2.localdata = data;
    dataAdapter2 = new $.jqx.dataAdapter(source2, {
        loadComplete: function (gridData) { },
        loadError: function (xhr, status, error) { }
    });


    $("#ticket_clinicInfoGrid").jqxGrid("updatebounddata");
    ProgressBar('hide');
}

function BindData2ClinicalGrid2(row, columnheader) {

    //get data from the server
    // source.localdata = gridData;
    var data = new Array();
    var row = {};

    row["clinicalInfo1"] = "体重(kg)";
    row["clinicalInfo1_numbers"] = 97;
    row["clinicalInfo2"] = "BMI(体重 kg/身高 m2)";
    row["clinicalInfo2_numbers"] = 26.85;
    data[0] = row;

    var row = {};
    row["clinicalInfo1"] = "收缩压/舒张压(mmHg)";
    row["clinicalInfo1_numbers"] = "149/86";
    row["clinicalInfo2"] = "脉搏(次/分钟)";
    row["clinicalInfo2_numbers"] = "68";
    data[1] = row;

    var row = {};
    row["clinicalInfo1"] = "空腹血糖(mmol/L)（毛细血糖)";
    row["clinicalInfo1_numbers"] = 5.90;
    row["clinicalInfo2"] = "餐后 2 小时血糖(mmol/L)（毛细血糖";
    row["clinicalInfo2_numbers"] = 9.5;
    data[2] = row;

    source3.localdata = data;
    dataAdapter3 = new $.jqx.dataAdapter(source3, {
        loadComplete: function (gridData) { },
        loadError: function (xhr, status, error) { }
    });


    $("#ticket_clinicInfoGrid2").jqxGrid("updatebounddata");
    ProgressBar('hide');
}




