<?php
header("Content-Type: application/json");

// Caminho do arquivo JSON
$file = "questions.json";

// Permitir requisições de outros domínios se necessário
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Carregar dados
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo json_encode([]);
    }
    exit;
}

// Salvar dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(["error" => "Dados inválidos."]);
        exit;
    }

    file_put_contents($file, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode(["success" => true]);
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Método não permitido."]);
