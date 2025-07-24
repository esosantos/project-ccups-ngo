<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'PHPMailer.php';
require_once 'SMTP.php';
require_once 'Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = $_POST['nome'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $email = $_POST['email'] ?? '';
    $assunto = $_POST['assunto'] ?? '';
    $descricao = $_POST['descricao'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // Configurações SMTP do Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'ccups.cosmedefarias@gmail.com';
        $mail->Password = 'SENHA_DE_APP_DO_GMAIL';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Remetente e destinatário
        $mail->setFrom('ccups.cosmedefarias@gmail.com', 'Formulário ONG CCUPS');
        $mail->addAddress('ccups.cosmedefarias@gmail.com');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = "Nova mensagem do site: $assunto";
        $mail->Body = "
            <strong>Nome:</strong> $nome<br>
            <strong>Telefone:</strong> $telefone<br>
            <strong>Email:</strong> $email<br>
            <strong>Assunto:</strong> $assunto<br>
            <strong>Mensagem:</strong><br>$descricao
        ";

        $mail->send();
        echo "OK";
    } catch (Exception $e) {
        echo "Erro ao enviar: " . $mail->ErrorInfo;
    }
} else {
    echo "Requisição inválida.";
}
