<?php
header('Content-Type: application/json');
$headers[] = 'Reply-To: ' . $data['nome'] . ' <no-reply@' . $_SERVER['HTTP_HOST'] . '>';

// Configurações básicas de segurança
if($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die(json_encode(['success' => false, 'message' => 'Método não permitido']));
}

// Dados do formulário
$data = [
    'nome' => filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING),
    'telefone' => filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING),
    'assunto' => filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING) ?: 'Contato do Site',
    'mensagem' => filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING)
];

// Validação
foreach($data as $field => $value) {
    if(empty($value) && $field !== 'assunto') {
        echo json_encode(['success' => false, 'message' => "Preencha o campo {$field}"]);
        exit;
    }
}

// Configuração do e-mail
$to = 'ccups.cosmedefarias@gmail.com';
$subject = $data['assunto'];
$message = "
    <h2>Novo contato do site</h2>
    <p><strong>Nome:</strong> {$data['nome']}</p>
    <p><strong>Telefone:</strong> {$data['telefone']}</p>
    <p><strong>Mensagem:</strong></p>
    <p>{$data['mensagem']}</p>
";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: noreply@' . $_SERVER['HTTP_HOST'],
    'X-Mailer: PHP/' . phpversion()
];

// Envio do e-mail
$success = mail($to, $subject, $message, implode("\r\n", $headers));

echo json_encode([
    'success' => $success,
    'message' => $success ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem'
]);
?>