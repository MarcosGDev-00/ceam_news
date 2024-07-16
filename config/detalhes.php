<?php
include 'conn.php';

if(isset($_GET['id'])) {
    $id = $_GET['id'];

    if($id !== null) {
        $sql = "SELECT * FROM content_home WHERE id=$id";
        $resultado = $conn->query($sql);

        if ($resultado->num_rows > 0) {
            $row = $resultado->fetch_assoc();
            $row['links'] = json_decode($row['links'], true);
            header('Content-Type: application/json');
            echo json_encode($row);
        } else {
            header('Content-Type: application/json');
            echo json_encode((object) []);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'ID is null'));
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'ID not provided'));
}