<?php
include_once 'conn.php';

function fetchNoticias($sql) {
    global $conn;
    $result = $conn->query($sql);
    $noticias = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $noticias[] = $row;
        }
    }
    return $noticias;
}

$sql_card = "SELECT * FROM content_home ORDER BY id DESC LIMIT 4 OFFSET 4";
$noticias_card = fetchNoticias($sql_card);

$sql_noticias = "SELECT * FROM content_home ORDER BY id DESC";
$noticias_todas = fetchNoticias($sql_noticias);

$sql_lat = "SELECT * FROM content_home ORDER BY id DESC LIMIT 4 OFFSET 8";
$noticias_lat = fetchNoticias($sql_lat);

$sql_geral = "SELECT * FROM content_home ORDER BY id DESC LIMIT 1 OFFSET 12";
$noticias_geral = fetchNoticias($sql_geral);

$conn->close();

$output = array(
    "card" => $noticias_card,
    "noticias" => $noticias_todas,
    "lat" => $noticias_lat,
    "geral" => $noticias_geral
);

echo json_encode($output);
