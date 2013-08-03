$(function () {
    $( "#dialog-save" ).dialog({
        autoOpen:false,
        modal: true,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });

    var progressbar = $( "#progressbar" ),
        progressLabel = $( ".progress-label" );

    progressbar.progressbar({
        value: false,
        change: function() {
            progressLabel.text( progressbar.progressbar( "value" ) + "%" );
        },
        complete: function() {
            progressLabel.text( "Complete!" );
        }
    });

    function progress() {
        var val = progressbar.progressbar( "value" ) || 0;
        progressbar.progressbar( "value", val + 10 );
        if ( val < 100 ) {
            setTimeout( progress, 100 );
        }else{
            progressbar.progressbar( "value",0 );
            progressbar.hide(500);
            $('#front').hide();
        }
    }

    $('.date-field').datepicker();
    $('button.calculate').button().click(function () {
            $('#front').show();
            progressbar.show();
            progressbar.css('top','50%');
            progress();
    });
    $('button.save').button().click(function () {
        $( "#dialog-save").dialog('open');
    });
    $('button.clear').button().click(function () {
        $(':text').val('');
    });
    $( "#dialog-modal" ).dialog({
        height: 140,
        modal: true
    });
});