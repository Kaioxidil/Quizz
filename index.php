<?php
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

$routes = [
    'home' => 'index.html',
    'login' => 'pages/login.html',
    'quiz' => 'pages/app.html',
    'admin' => 'pages/admin.html'
];

if(array_key_exists($page, $routes)) {
    include($routes[$page]);
} else {
    echo "<h1>Página não encontrada</h1>";
}
?>
