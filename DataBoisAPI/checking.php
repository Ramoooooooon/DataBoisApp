<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("Asia/Manila");
$conn = mysqli_connect("localhost","root","","databois");

    $Username = $_POST['Username'];
    $OrderNumber = uniqid('DB');
    
    $UserID="";
    $get_db_course = "SELECT * FROM users WHERE Username = '".$Username."'";
    $res_db_course = $conn->query($get_db_course);
    if (!empty($res_db_course)) {
        if ($res_db_course->num_rows > 0) {
                 $row_array = $res_db_course->fetch_assoc();
                 $UserID = $row_array["UserID"];
            }
        }
    
    echo $UserID;
    echo $OrderNumber;

?>