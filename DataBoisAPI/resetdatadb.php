<?php

header("Access-Control-Allow-Origin: *");
$conn=mysqli_connect("localhost","root","","databois");

$select_query = "DELETE FROM addtocart";
$result = $conn->query($select_query);
  
    if ($result) {
    	$Message = "Data Has Been Reset!";
        
    } else {
    	$Message = "something's wrong";
    }
    
    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);


?>