<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Asia/Manila");
$conn = mysqli_connect("localhost","root","","elective");


if (!empty($_POST['FullName']))  {
    
    $AccountNumber = $_POST['AccountNumber'];
    $FullName = $_POST['FullName'];
    $Address = $_POST['Address'];

    $db_query = "INSERT INTO userinfo (AccountNumber, FullName, Address) VALUES('".$AccountNumber."', '".$FullName."', '".$Address."')";
    
    
    $V = $conn->query($db_query);
    
    if ($V) {
    	$Message = "Success";
        
    } else {
    	$Message = "something's wrong";
    }
    
    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);

}
?>