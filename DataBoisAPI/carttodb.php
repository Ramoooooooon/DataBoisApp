<?php

header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Asia/Manila");
$conn = mysqli_connect("localhost","root","","databois");


if (!empty($_POST['ProductName']))  {
    
    $ProductName = $_POST['ProductName'];
    $Price = $_POST['Price'];
    $ActualPrice = $_POST['ActualPrice'];

    $db_query = "INSERT INTO addtocart (ProductName, Price, ActualPrice) VALUES('".$ProductName."', '".$Price."', '".$ActualPrice."')";
    
    
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