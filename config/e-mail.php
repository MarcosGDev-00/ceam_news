<?php
include_once 'conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];

    $sql = "INSERT INTO denuncias (titulo, descricao, categoria) VALUES ('$titulo', '$descricao', '$categoria')";
    if ($conn->query($sql) === TRUE) {
        echo "Denúncia enviada com sucesso!";
    } else {
        echo "Erro ao enviar a denúncia: " . $conn->error;
    }

    $conn->close();
}