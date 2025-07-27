<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

// Verificação de requisição AJAX
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Acesso direto não permitido']));
}

// Verifica o método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Método não permitido']));
}

// Validação dos campos obrigatórios
$requiredFields = ['name', 'email', 'subject', 'message'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        die(json_encode(['success' => false, 'message' => "O campo {$field} é obrigatório"]));
    }
}

// Formata e valida o telefone
$phone = '';
if (!empty($_POST['phone'])) {
    $phone = preg_replace('/\D/', '', $_POST['phone']);
    if (strlen($phone) < 10 || strlen($phone) > 11) {
        http_response_code(400);
        die(json_encode(['success' => false, 'message' => 'Telefone inválido (use DDD + número)']));
    }
    $phone = preg_replace('/(\d{2})(\d{5})(\d{4})/', '($1) $2-$3', $phone);
}

try {
    $mail = new PHPMailer(true);
    
    // Configuração SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'ccups.cosmedefarias@gmail.com';
    $mail->Password   = 'jquowofgtyaxepbt';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Remetente e destinatário
    $mail->setFrom('ccups.cosmedefarias@gmail.com', 'EMAIL DO FORMULARIO DO SITE');
    $mail->addAddress('ccups.cosmedefarias@gmail.com');
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    // Conteúdo do email
    $mail->isHTML(true);
    $mail->Subject = "Contato: " . ($_POST['subject'] ?? 'Sem assunto');
    $mail->Body    = "
        <h3>Novo contato recebido</h3>
        <p><strong>Nome:</strong> {$_POST['name']}</p>
        <p><strong>Telefone:</strong> {$phone}</p>
        <p><strong>Email:</strong> {$_POST['email']}</p>
        <p><strong>Assunto:</strong> {$_POST['subject']}</p>
        <p><strong>Mensagem:</strong></p>
        <p>{$_POST['message']}</p>
    ";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso!']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem: ' . $e->getMessage()]);
}