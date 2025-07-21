<?php
header('Content-Type: application/json');

// Dados do formulário
$dados = [
    'nome' => filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING),
    'telefone' => filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING),
    'email' => filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL),
    'assunto' => filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING),
    'descricao' => filter_input(INPUT_POST, 'descricao', FILTER_SANITIZE_STRING)
];

// Validação
foreach ($dados as $campo => $valor) {
    if (empty($valor)) {
        echo json_encode(['success' => false, 'message' => "Preencha o campo $campo"]);
        exit;
    }
}

// Configuração do email
$para = 'ccups.cosmedefarias@gmail.com';
$assunto = $dados['assunto'];

// Corpo do email em HTML
$corpo = "
    <h2>Nova mensagem do site CCUPS</h2>
    <p><strong>Nome:</strong> {$dados['nome']}</p>
    <p><strong>Telefone:</strong> {$dados['telefone']}</p>
    <p><strong>Email:</strong> {$dados['email']}</p>
    <p><strong>Mensagem:</strong></p>
    <p>{$dados['descricao']}</p>
    <p><small>Enviado em: " . date('d/m/Y H:i') . "</small></p>
";

// Cabeçalhos
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: ' . $dados['nome'] . ' <' . $dados['email'] . '>',
    'Reply-To: ' . $dados['email'],
    'X-Mailer: PHP/' . phpversion()
];

// Envio do email
$enviado = mail($para, $assunto, $corpo, implode("\r\n", $headers));

// Resposta JSON
echo json_encode([
    'success' => $enviado,
    'message' => $enviado ? 'Mensagem enviada com sucesso!' : 'Erro ao enviar mensagem'
]);
?>