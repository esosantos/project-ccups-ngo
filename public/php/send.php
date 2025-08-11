<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json'); 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = $_POST['name'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $email   = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ccups.cosmedefarias@gmail.com';
        $mail->Password   = 'jquowofgtyaxepbt';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('ccups.cosmedefarias@gmail.com', 'Contato ONG');
        $mail->addAddress('ccups.cosmedefarias@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = "Contato: $subject";
        $mail->Body    = "
          <strong>Nome:</strong> $name<br>
          <strong>Telefone:</strong> $phone<br>
          <strong>Email:</strong> $email<br>
          <strong>Mensagem:</strong><br>$message
        ";

        $mail->send();
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
        exit;
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Erro ao enviar: {$mail->ErrorInfo}"]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Método não permitido"]);
exit;