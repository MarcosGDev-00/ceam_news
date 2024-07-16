<?php
include_once 'conn.php';

// Header
$select_sql = "SELECT * FROM header ORDER BY id DESC LIMIT 1";
$select_result = $conn->query($select_sql);

if ($select_result->num_rows > 0) {
    $header = $select_result->fetch_assoc();
} else {
    $header = array();
}

// Menu
$sql_menu = "SELECT * FROM menu_header";
$result_menu = $conn->query($sql_menu);

$menuItems = array();

if ($result_menu->num_rows > 0) {
    while ($row = $result_menu->fetch_assoc()) {
        $menuItems[] = $row;
    }
}

// Footer
$sql_menu_footer = "SELECT * FROM menu_footer";
$result_menu_footer = $conn->query($sql_menu_footer);

$menuFooter = array();

if ($result_menu_footer->num_rows > 0) {
    while ($row = $result_menu_footer->fetch_assoc()) {
        $menuFooter[] = $row;
    }
}

$conn->close();

$data = array(
    'header' => $header,
    'menu' => $menuItems,
    'menu_footer' => $menuFooter
);

echo json_encode($data);