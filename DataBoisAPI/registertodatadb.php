<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Asia/Manila");
$con = mysqli_connect("localhost","root","","databois");


if (!empty($_POST['FullName']))  {
    
    $Code = rand(1,99999);
    $UserID = "DB-".$Code;

    $FullName = $_POST['FullName'];
    $Username = $_POST['Username'];
    $ContactNumber = $_POST['ContactNumber'];
    $Address = $_POST['Address'];
    $Email = $_POST['Email'];
    $Password = $_POST['Password'];
    $CardNumber = $_POST['CardNumber'];
    $CVV = $_POST['CVV'];
    $ExpirationDate = $_POST['ExpirationDate'];
    $GCash = $_POST['GCash'];

    $db_query = "INSERT INTO users (UserID, FullName, Username, ContactNumber, Address, Email, Password, CardNumber, CVV, ExpirationDate, GCash) VALUES('".$UserID."', '".$FullName."', '".$Username."', '".$ContactNumber."', '".$Address."', '".$Email."', '".$Password."', '".$CardNumber."', '".$CVV."', '".$ExpirationDate."', '".$GCash."')";
    
    
    $V = $con->query($db_query);
    
    if ($V) {
    	$Message = "Success";
        
    } else {
    	$Message = "something's wrong";
    }
    
    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);

}
?>