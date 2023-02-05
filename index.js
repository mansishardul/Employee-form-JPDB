/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var contoken = "90938077|-31949268713321395|90953047";
var dbname = "EMPLOYEE1";
var dbrel = "Emp_data";
var createTime=false;
var updateTime=false;
function save_rectoLS(res)
{
    var lvdata=JSON.parse(res.data);
    localStorage.SetItem('recno',lvdata.id);
    
}
function GetempID_AsJsonobj()
{
    var empId=$('#id').val();
    var jsonStr={
        id:empId
    };
    return JSON.stringify(jsonStr);
}
function  filldata(res)
{
    save_rectoLS(res);
    var data=JSON.parse(res.data).record;
    $('#name').val(data.name);
    $('#email').val(data.email);
    $('#sal').val(data.sal);
    $('#DA').val(data.DA);
    $('#det').val(data.det);
    
}
function getemp()
{
    var obj = GetempID_AsJsonobj();
    var getrequest = createGET_BY_KEYRequest(contoken, dbname, dbrel, obj,createTime, updateTime);
    jQuery.ajaxSetup({async: false});
    var res = executeCommandAtGivenBaseUrl(getrequest, "http://api.login2explore.com:5577", "/api/iml");

    jQuery.ajaxSetup({async: true});
    if (res.status === 400)
    {
        $('#submit').prop('disabled', false);

        $('#reset').prop('disabled', false);

    }
    else if (res.status === 200)
    {
        filldata(res);
        $('#change').prop('disabled', false);

        $('#reset').prop('disabled', false);
       $('#id').focus();
    }



}
function validate_form()
{
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var regsal = /^\d{5}$/;
    var regName = /\d+$/g;
    var Eid, Ename, Email, EDA, Esal, Edet;
    Eid = $('#id').val();
    Ename = $('#name').val();
    Email = $('#email').val();
    Esal = $('#sal').val();
    EDA = $('#DA').val();
    Edet = $('#det').val();
    if (Eid === "" || regName.test(Eid)) {
        alert("Please enter correct Employee id ");
        $("#id").focus();
        return "";
    }
    if (Ename === "" || regName.test(Ename)) {
        alert("Please enter correct Employee name ");
        $("#name").focus();
        return "";
    }

    if (Email === "" || !regEmail.test(Email)) {
        alert("Enter correct Employee Email");
        $("#email").focus();
        return "";
    }
    if (Esal === "" || !regsal.test(Esal)) {
        alert("Enter Salary correctly!!");
        $("#sal").focus();
        return "";
    }
    if (EDA === "") {
        alert("Employee DA Required Value");
        $("#empId").focus();
        return "";
    }
    if (Edet === "") {
        alert("Employee Deduction Required Value");
        $("#det").focus();
        return "";
    }
    var jsonStrObj = {
        Eid: Eid,
        Ename: Ename,
        Email: Email,
        Esal: Esal,
        EDA: EDA,
        Edet: Edet

    };
    return JSON.stringify(jsonStrObj);

}


function save()
{
    var json_valid = validate_form();
    if (json_valid === '')
        return '';
    var putrequest = createPUTRequest(contoken, json_valid, dbname, dbrel);
    jQuery.ajaxSetup({async: false});
    executeCommandAtGivenBaseUrl(putrequest, "http://api.login2explore.com:5577", "/api/iml");

    jQuery.ajaxSetup({async: true});
    reset();

    alert('Data saved sucessfully');
    $('#id').focus();
}
function reset()
{
    $('#id').val("");
    $('#name').val("");
    $('#email').val("");
    $('#sal').val("");
    $('#DA').val("");
    $('#det').val("");
    $('#submit').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $('#change').prop('disabled', true);
    $('#id').focus();
}
function change()
{
    $('#change').prop('disabled', true);
    var jsonobj = validate_form();
    var updateRequest = createUPDATERecordRequest(contoken, jsonobj, dbname, dbrel, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var res = executeCommandAtGivenBaseUrl(updateRequest, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    console.log(res);
    reset();

    alert('Data Updated sucessfully');
    $('#id').focus();
}

/*function getdata() {
    var rec = $('#id').val();
    //alert(rec);
    /*var json_valid = validate_form();
     if (json_valid === '')
     return '';
    var getrequest = createGET_RECORDRequest(contoken, dbname, dbrel, rec);
    jQuery.ajaxSetup({async: false});
    var record = executeCommandAtGivenBaseUrl(getrequest, "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});
    alert(record);
    $('#id').val(record.id);
    $('#name').val(record.name);
    $('#email').val(record.email);
    $('#sal').val(record.sal);
    $('#DA').val(record.DA);
    $('#det').val(record.det);


    $('#id').focus();

}*/
