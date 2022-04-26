<?php

header("Access-Control-Allow-Origin: *");
$conn = mysqli_connect("localhost","root","","databois");

$select_query = "SELECT * FROM addtocart";

$result = $conn->query($select_query);
$info = array();

if ($result-> num_rows> 0){
    while ($row = $result->fetch_assoc()){
        $ProductName = $row ["ProductName"];
        $Price = $row ["Price"];
        $ActualPrice = $row ["ActualPrice"];
        $Quantity = $row ["Quantity"];

    array_push ($info, array("ProductName"=>$ProductName, "Price"=>$Price, "ActualPrice"=>$ActualPrice, "Quantity"=>$Quantity));

    }
}

echo json_encode ($info);

?>