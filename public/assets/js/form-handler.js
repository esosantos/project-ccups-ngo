document.addEventListener('DOMContentLoaded', function() {
    // Formatação automática do telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let phone = this.value.replace(/\D/g, '');
            
            // Formatação: (00) 00000-0000
            if (phone.length > 0) {
                phone = phone.replace(/^(\d{0,2})/, '($1) ');
            }
            if (phone.length > 9) {
                phone = phone.replace(/(\d{5})(\d{0,4})/, '$1-$2');
            }
            
            this.value = phone.substring(0, 15);
        });
    }

    // Validação e envio do formulário
    const form = document.getElementById('formContact');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const msgStatus = document.getElementById('msgStatus');
            const submitBtn = form.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const spinner = submitBtn.querySelector('.spinner-border');

            // Validação do formulário
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Configura estado de carregamento
            submitText.textContent = 'Enviando...';
            spinner.classList.remove('d-none');
            submitBtn.disabled = true;
            msgStatus.classList.add('d-none');

            try {
                const response = await fetch('assets/php/send.php', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                const data = await response.json();
                
                if (!response.ok) throw new Error(data.message || "Erro no servidor");
                
                // Feedback de sucesso
                showStatusMessage(msgStatus, data.message, 'success');
                form.reset();
                form.classList.remove('was-validated');
                
                // Rolagem suave para a home após 2 segundos
                setTimeout(() => {
                    document.getElementById('home').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 2000);
                
            } catch (error) {
                showStatusMessage(msgStatus, error.message, 'danger');
            } finally {
                submitText.textContent = 'Enviar Mensagem';
                spinner.classList.add('d-none');
                submitBtn.disabled = false;
            }
        });
    }

    function showStatusMessage(element, message, type) {
        element.textContent = message;
        element.classList.remove('d-none', 'alert-success', 'alert-danger');
        element.classList.add(`alert-${type}`);
    }
});