<?php
include_once 'conn.php';

function fetchAbout($sql) {
    global $conn;
    $result = $conn->query($sql);
    $about = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $about[] = $row;
        }
    }
    return $about;
}

$sql_initial = "SELECT * FROM content_about";
$about_card = fetchAbout($sql_initial);

$sql_services = "SELECT * FROM content_about ORDER BY id DESC LIMIT 4";
$about_services = fetchAbout($sql_services);

$sql_members = "SELECT * FROM content_about WHERE id != 1 ORDER BY id LIMIT 6";
$about_members = fetchAbout($sql_members);

$conn->close();

$output = array(
    "about" => $about_card,
    "services" => $about_services,
    "members" => $about_members
);

echo json_encode($output);
