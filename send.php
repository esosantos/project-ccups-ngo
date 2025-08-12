<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método não permitido"]);
    exit;
}

$name    = clean($_POST['name'] ?? '');
$phone   = clean($_POST['phone'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
$subject = clean($_POST['subject'] ?? 'Sem assunto');
$message = clean($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
    echo json_encode(["success" => false, "message" => "Preencha nome, email e mensagem"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ccups.cosmedefarias@gmail.com';
    $mail->Password   = 'jquowofgtyaxepbt'; // sua senha de app
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL seguro
    $mail->Port       = 465; // Porta SSL padrão do Gmail

    // Configurações do email
    $mail->setFrom('ccups.cosmedefarias@gmail.com', 'Contato ONG');
    $mail->addAddress('ccups.cosmedefarias@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "Contato: $subject";

    $mail->Body = "
        <strong>Nome:</strong> {$name}<br>
        <strong>Telefone:</strong> {$phone}<br>
        <strong>Email:</strong> {$email}<br>
        <strong>Mensagem:</strong><br>" . nl2br($message);

    $mail->SMTPDebug = 0; // desligado (mude para 2 pra debug)

    if ($mail->send()) {
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao enviar: {$mail->ErrorInfo}"]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Exceção: " . $e->getMessage()]);
}
