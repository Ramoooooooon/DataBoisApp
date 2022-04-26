<?php
header("Access-Control-Allow-Origin: *");

$conn = mysqli_connect("localhost", "root", "", "databois");

$Username= mysqli_real_escape_string($conn, $_POST['Username']);
$Password= mysqli_real_escape_string($conn, $_POST['Password']);

$db_password="";
$FullName="";
$ContactNumber="";
$Address="";
$get_db_password = "SELECT * FROM users WHERE Username = '".$Username."'";
$res_db_password = $conn->query($get_db_password);
if (!empty($res_db_password)) {
    if ($res_db_password->num_rows > 0) {
        $row_array = $res_db_password->fetch_assoc();
        $db_password = $row_array["Password"];
        $FullName = $row_array["FullName"];
        $ContactNumber = $row_array["ContactNumber"];
        $Address = $row_array["Address"];
    }
}

if($db_password==$Password){
    echo json_encode(array("confirm" => "Success", "FullName" => $FullName, "ContactNumber" => $ContactNumber, "Address" => $Address, "Username" => $Username));
}
else{
    echo json_encode(array("confirm" => "Unsuccessful"));
}
?>