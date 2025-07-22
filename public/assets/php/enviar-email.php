<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['nome']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $email = htmlspecialchars($_POST['email']);
    $assunto = htmlspecialchars($_POST['assunto']);
    $descricao = htmlspecialchars($_POST['descricao']);

    // Email de destino
    $para = "ccups.cosmedefarias@gmail.com ";  // <-- ALTERAR PARA O EMAIL DA ONG OU SEU GMAIL

    // Corpo do email
    $mensagem = "
        <h2>Mensagem do Formulário</h2>
        <p><strong>Nome:</strong> {$nome}</p>
        <p><strong>Telefone:</strong> {$telefone}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Mensagem:</strong><br>{$descricao}</p>
    ";

    // Cabeçalhos
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: {$nome} <{$email}>" . "\r\n";

    // Envia
    if (mail($para, $assunto, $mensagem, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Método inválido";
}
