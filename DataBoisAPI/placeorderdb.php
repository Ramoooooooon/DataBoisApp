<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Asia/Manila");
$conn = mysqli_connect("localhost","root","","databois");

    $Username = $_POST['Username'];
    $Product = $_POST['Product'];
    $TotalPrice = $_POST['TotalPrice'];
    $OrderNumber = uniqid('DB');
    $Date = date('Y-m-d H:i:s');
    $ModePayment = $_POST['ModePayment'];
    
    $UserID="";
    $get_db_course = "SELECT * FROM users WHERE Username = '".$Username."'";
    $res_db_course = $conn->query($get_db_course);
    if (!empty($res_db_course)) {
        if ($res_db_course->num_rows > 0) {
                 $row_array = $res_db_course->fetch_assoc();
                 $UserID = $row_array["UserID"];
            }
        }
    

    $db_query = "INSERT INTO placeorder (UserID, Product, TotalPrice, OrderNumber, Date, ModePayment) VALUES('".$UserID."', '".$Product."', '".$TotalPrice."', '".$OrderNumber."', '".$Date."', '".$ModePayment."')";
    
    
    $V = $conn->query($db_query);
    
    if ($V) {
    	$Message = "Success";
        
    } else {
    	$Message = "something's wrong";
    }
    
    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);


?>