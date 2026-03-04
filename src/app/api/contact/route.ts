import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_KEY || '');
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Envia o email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Natur Marketing <contato@resend.dev>', // Email padrão do Resend para testes
      to: ['gabrielcaliari15@gmail.com'], // Email cadastrado no Resend (modo teste)
      subject: `Novo Contato: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #0066A1;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #0066A1;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 3px;
              }
              .footer {
                margin-top: 20px;
                text-align: center;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📧 Novo Contato do Site</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">👤 Nome:</span>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="label">📧 Email:</span>
                  <div class="value">${email}</div>
                </div>
                
                ${phone ? `
                <div class="field">
                  <span class="label">📱 Telefone:</span>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <span class="label">💬 Mensagem:</span>
                  <div class="value">${message}</div>
                </div>
                
                <div class="footer">
                  <p>Este email foi enviado através do formulário de contato do site Natur Marketing</p>
                  <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email enviado com sucesso!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no processamento:', error);
    return NextResponse.json(
      { error: 'Erro no servidor' },
      { status: 500 }
    );
  }
}

