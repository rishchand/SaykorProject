var activewin;

function closeLoginWin() {

    //alert('in close login');

    var role = "";

    $.epic.login($("#username").attr('value'), $("#password").attr('value'), function (data) {
        console.log(data.response.success);
        //alert(data.response.success);
        if (data.response.success) {

            $("#classContent").unload("Home/Login");

           // alert(data.response.result);

            role = data.response.result;
            if (role == "DOCTOR") {
               // alert("Doctor");
                $("#classContent").load("Provider/Management");
            }
            if (role == "PATIENT") {
               // alert("patient");
                $("#classContent").load("patient/Management");
            }
            if (role == "ADMIN") {
                //$("#classContent").load("Provider/Management");
                //alert("Admin/Providers");
                openWindow("Admin/Providers");
            }
            loginSessionContext = data.response.sessionContext;
        }
        else {
            alert("Login error: " + $("#username").attr('value') + ":" + $("#password").attr('value'));
            $("#username").val("");
            $("#password").val("");
            $("#username").focus();
        }
    });
}

function openWindow(winname) {
    if (activewin) {
        $("#classContent").unload(activewin);
    }

    activewin = winname;
    $("#classContent").load(winname);


}