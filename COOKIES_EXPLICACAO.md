# 🍪 Como Funciona o Banner de Cookies - Natur

## 📋 Resumo do Sistema

O banner de cookies da Natur está **COMPLETO** e funcional, utilizando a biblioteca **Klaro** para gerenciar consentimentos de forma compatível com **LGPD** e **GDPR**.

---

## 🎯 O Que Está Sendo Coletado

### 1. **Google Tag Manager (GTM)**
- **Cookies coletados**: `_ga`, `_gid`, `_gat`, `_dc_gtm_UA-*`
- **Finalidade**: Analytics e Marketing
- **O que faz**: Gerencia tags de rastreamento e eventos do site

### 2. **Google Analytics 4 (GA4)**
- **Cookies coletados**: `_ga`, `_gid`
- **Finalidade**: Analytics
- **O que faz**: Coleta métricas de uso (páginas visitadas, tempo na página, taxa de rejeição, etc.)

### 3. **Meta Pixel (Facebook/Instagram)**
- **Cookies coletados**: `_fbp`, `_fbc`, `fr`
- **Finalidade**: Marketing
- **O que faz**: Rastreia visitantes para otimizar anúncios e criar públicos personalizados

---

## 🔒 Como Funciona o Bloqueio

### Antes do Consentimento:
1. **Scripts bloqueados**: Os scripts do GTM e Meta Pixel são carregados com `type="text/plain"` em vez de `type="text/javascript"`
2. **Navegador não executa**: Scripts com `text/plain` não são executados pelo navegador
3. **Nenhum dado coletado**: Nenhum cookie é criado, nenhum evento é enviado

### Após Aceitar Cookies:
1. **Klaro converte scripts**: O Klaro muda `type="text/plain"` para `type="text/javascript"`
2. **Scripts executam**: GTM e Meta Pixel começam a funcionar normalmente
3. **Cookies são criados**: Os cookies de rastreamento são estabelecidos
4. **Eventos são enviados**: Rastreamento automático começa a funcionar

### Se Recusar Cookies:
1. **Scripts permanecem bloqueados**: Continuam com `type="text/plain"`
2. **Nenhum cookie criado**: Nenhum dado de rastreamento é coletado
3. **Site funciona normalmente**: Apenas funcionalidades não essenciais ficam desativadas

---

## 📊 O Que Muda Quando Você Aceita/Rejeita

### ✅ **Aceitar Todos os Cookies**
- GTM é ativado → Rastreamento completo ativo
- GA4 é ativado → Analytics completo funcionando
- Meta Pixel é ativado → Rastreamento do Facebook/Instagram ativo
- **Cookies criados**: Todos os cookies listados acima
- **Eventos rastreados**: Scroll, cliques, tempo na página, formulários, etc.

### ❌ **Recusar Todos os Cookies**
- GTM não carrega → Nenhum rastreamento
- GA4 não carrega → Nenhuma análise
- Meta Pixel não carrega → Nenhum rastreamento de anúncios
- **Cookies criados**: Apenas o cookie de consentimento (`klaro-consent`)
- **Eventos rastreados**: Nenhum

### ⚙️ **Personalizar Cookies**
Você pode escolher:
- ✅ **Apenas Analytics**: Ativa GA4 e GTM, mas bloqueia Meta Pixel
- ✅ **Apenas Marketing**: Ativa Meta Pixel, mas bloqueia GA4
- ✅ **Combinar**: Escolher quais serviços ativar individualmente

---

## 🎨 Interface do Banner

### Banner Inferior (Notificação):
- Aparece na parte inferior da tela
- Design moderno com cores da Natur (azul gradiente)
- 3 botões:
  1. **"Aceitar todos"** - Aceita todos os cookies
  2. **"Recusar todos"** - Rejeita todos os cookies opcionais
  3. **"Personalizar Cookies"** - Abre modal de configuração

### Modal de Personalização:
- Lista todos os serviços de cookies
- Explica cada categoria (Analytics, Marketing, Funcional)
- Permite ativar/desativar cada serviço individualmente
- Link para Política de Privacidade
- Botões: "Aceitar selecionados" e "Recusar todos"

---

## 🔧 Funcionalidades Implementadas

### ✅ **Completo e Funcional**:
- [x] Banner de consentimento visível
- [x] Bloqueio real de scripts antes do consentimento
- [x] Opção de aceitar todos
- [x] Opção de recusar todos
- [x] Opção de personalizar por categoria
- [x] Cookie de consentimento salvo (válido por 365 dias)
- [x] Verificação de consentimento antes de enviar eventos
- [x] Design customizado com cores da Natur
- [x] Responsivo (mobile e desktop)
- [x] Textos em português
- [x] Link para Política de Privacidade
- [x] Conformidade com LGPD

### 📝 **Detalhes Técnicos**:

1. **Armazenamento**: Consentimento salvo em cookie `klaro-consent` (válido por 1 ano)
2. **Verificação**: Função `hasConsent()` verifica antes de enviar qualquer evento
3. **Estratégia de carregamento**: Scripts usam `lazyOnload` para melhor performance
4. **Bloqueio**: Scripts com `type="text/plain"` não executam até serem convertidos pelo Klaro

---

## 🎯 Conformidade LGPD

O sistema está em conformidade com a LGPD porque:
- ✅ Solicita consentimento explícito antes de coletar dados
- ✅ Permite recusar cookies não essenciais
- ✅ Informa claramente quais cookies são usados
- ✅ Permite personalizar preferências
- ✅ Link para Política de Privacidade completa
- ✅ Cookie de consentimento documentado
- ✅ Respeita a escolha do usuário (não envia dados se recusado)

---

## 📈 Eventos Rastreados (apenas se consentir)

1. **Page View** - Visualização de página
2. **Scroll Depth** - Profundidade de rolagem (25%, 50%, 75%, 100%)
3. **Button Click** - Cliques em botões
4. **Form Start** - Início de preenchimento de formulário
5. **Form Submit** - Envio de formulário
6. **Form Error** - Erros em formulários
7. **Time on Page** - Tempo gasto na página
8. **Link Click** - Cliques em links externos

**Todos esses eventos SÓ são enviados se o usuário consentir!**

---

## 🚀 Status Atual

**✅ SISTEMA COMPLETO E FUNCIONAL**

O banner de cookies está totalmente implementado e funcionando. Não está apenas básico - está com todas as funcionalidades necessárias para conformidade LGPD/GDPR e uma boa experiência do usuário.

### Melhorias Implementadas Recentemente:
1. ✅ Estilos customizados com design da Natur
2. ✅ Textos mais descritivos e informativos
3. ✅ Verificação de consentimento antes de enviar eventos
4. ✅ Bloqueio real de scripts (não apenas simulação)
5. ✅ Interface responsiva e moderna
6. ✅ Categorização clara dos cookies por finalidade

---

## 💡 Como Testar

1. **Limpe os cookies** do site no navegador
2. **Recarregue a página** - O banner deve aparecer
3. **Teste "Recusar todos"** - Verifique que nenhum cookie de rastreamento é criado
4. **Teste "Aceitar todos"** - Verifique que os cookies são criados
5. **Teste "Personalizar"** - Teste ativar/desativar serviços individualmente
6. **Recarregue a página** - O banner não deve aparecer novamente (consentimento salvo)

---

## 📝 Notas Importantes

- O consentimento é salvo por **365 dias**
- Usuário pode **alterar preferências** a qualquer momento (através do modal)
- Se a configuração mudar, o banner pode aparecer novamente para atualização
- Scripts essenciais do site **não são bloqueados** (apenas cookies de rastreamento)

---

**Última atualização**: Implementação completa e funcional ✅

