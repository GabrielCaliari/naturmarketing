# 📊 Sistema de Rastreamento - Documentação

Este projeto utiliza um sistema completo de rastreamento com **Google Tag Manager (GTM)**, **Google Analytics 4 (GA4)**, **Meta Pixel** (client-side e server-side via Conversion API) e gerenciamento de consentimento de cookies conforme LGPD/GDPR.

## 📋 Índice

- [Configuração Inicial](#configuração-inicial)
- [Arquitetura](#arquitetura)
- [Eventos Implementados](#eventos-implementados)
- [Como Usar](#como-usar)
- [Como Testar](#como-testar)
- [Troubleshooting](#troubleshooting)

---

## ⚙️ Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Analytics 4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Meta Pixel (Public - usado no client)
NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id

# Meta Conversion API (Privado - usado apenas no servidor)
META_CONVERSION_API_TOKEN=seu_token_secreto
```

### 2. Como Obter os IDs

#### Google Tag Manager (GTM)

1. Acesse [Google Tag Manager](https://tagmanager.google.com/)
2. Crie uma conta e um container (tipo Web)
3. Copie o ID do container (formato: `GTM-XXXXXXX`)
4. No GTM, configure:
   - **Tag de GA4**: New Tag → Google Analytics: GA4 Configuration
   - **Triggers**: Configure para disparar em todas as páginas

#### Google Analytics 4 (GA4)

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4
3. Copie o Measurement ID (formato: `G-XXXXXXXXXX`)
4. Em GA4, vá em Admin → Data Streams → selecione seu stream
5. Copie o Measurement ID

#### Meta Pixel

1. Acesse [Meta Business Manager](https://business.facebook.com/)
2. Vá em **Events Manager**
3. Clique em **Connect Data Sources** → **Web** → **Meta Pixel**
4. Copie o **Pixel ID** (formato numérico)

#### Meta Conversion API Access Token

1. No **Events Manager**, selecione seu Pixel
2. Vá em **Settings** → **Conversions API**
3. Role até **Generate Access Token**
4. Clique em **Generate** e copie o token
5. **⚠️ IMPORTANTE**: Este token é secreto, nunca exponha publicamente

---

## 🏗️ Arquitetura

### Fluxo de Dados

```
Usuário interage com a página
        ↓
[AutoTrack] - Detecta scroll, tempo na página, cliques
        ↓
[analytics.ts] - Funções de tracking
        ↓
    ┌───────┴────────┐
    ↓                ↓
[GTM/GA4]      [Meta Pixel]
(dataLayer)    (client + server)
```

### Componentes Principais

| Componente | Descrição |
|------------|-----------|
| `CookieConsent` | Banner LGPD/GDPR com Klaro |
| `GTMScript` | Inicializa Google Tag Manager |
| `MetaPixel` | Inicializa Meta Pixel (client-side) |
| `AutoTrack` | Rastreamento automático de comportamento |
| `analytics.ts` | Biblioteca de funções de tracking |
| `meta-conversion.ts` | Helpers para Conversion API |
| `/api/meta-conversion` | Endpoint server-side para Meta |

### Consent Manager (Klaro)

O sistema só carrega GTM, GA4 e Meta Pixel **após** o usuário consentir. O usuário pode:
- Aceitar todos os cookies
- Rejeitar todos os cookies
- Personalizar por categoria (Analytics, Marketing)

---

## 📊 Eventos Implementados

### 1. **Page View** (Visualização de Página)

**Quando dispara**: Automaticamente ao carregar/mudar de página

**Dados enviados**:
- `page_url`: URL da página
- `event_id`: ID único para deduplicação

**Destinos**: GTM → GA4, Meta Pixel (client + server)

---

### 2. **Scroll Depth** (Profundidade de Rolagem)

**Quando dispara**: Usuário atinge 25%, 50%, 75% ou 100% da página

**Dados enviados**:
- `scroll_percentage`: 25, 50, 75 ou 100

**Destinos**: GTM → GA4, Meta Pixel

**Por que é importante**: Indica engajamento e qualidade do conteúdo

---

### 3. **Form Start** (Início de Formulário)

**Quando dispara**: Usuário foca no primeiro campo do formulário

**Dados enviados**:
- `form_name`: Nome do formulário (ex: `contact_form`)

**Destinos**: GTM → GA4, Meta Pixel

**Por que é importante**: Mede intenção de conversão

---

### 4. **Form Submit** (Envio de Formulário)

**Quando dispara**: Usuário envia o formulário com sucesso

**Dados enviados**:
- `form_name`: Nome do formulário
- `success`: true

**Destinos**: GTM → GA4, Meta Pixel (como evento "Lead")

**Por que é importante**: Conversão direta, essencial para otimização

---

### 5. **Form Error** (Erro em Formulário)

**Quando dispara**: Validação falha ou erro no envio

**Dados enviados**:
- `form_name`: Nome do formulário
- `error_message`: Descrição do erro

**Destinos**: GTM → GA4, Meta Pixel

**Por que é importante**: Identifica problemas de UX

---

### 6. **Button Click** (Clique em Botão)

**Quando dispara**: Usuário clica em botão com `trackName` definido

**Dados enviados**:
- `button_name`: Nome do botão
- `location`: Página onde ocorreu o clique

**Destinos**: GTM → GA4, Meta Pixel

**Como usar**:
```tsx
<Button trackName="cta_hero_section">
  Fale Conosco
</Button>
```

---

### 7. **Link Click** (Clique em Link Externo)

**Quando dispara**: Usuário clica em link que sai do domínio

**Dados enviados**:
- `link_url`: URL de destino
- `link_text`: Texto do link
- `is_external`: true

**Destinos**: GTM → GA4, Meta Pixel

**Por que é importante**: Rastreia saídas do site

---

### 8. **Time on Page** (Tempo na Página)

**Quando dispara**: 
- A cada 30 segundos (se usuário ativo)
- Quando usuário sai da página
- Quando troca de aba

**Dados enviados**:
- `duration_seconds`: Tempo em segundos
- `page_url`: URL da página

**Destinos**: GTM → GA4, Meta Pixel

**Por que é importante**: Mede engajamento real

---

## 🚀 Como Usar

### Rastrear Eventos Personalizados

```tsx
import { trackEvent, trackButtonClick, trackFormSubmit } from '@/lib/analytics';

// Evento genérico
trackEvent('custom_event', {
  category: 'engagement',
  action: 'video_play',
  label: 'intro_video'
});

// Clique em botão
trackButtonClick('download_brochure', '/services');

// Envio de formulário
trackFormSubmit('newsletter_form', true);
```

### Adicionar Tracking em Componentes

#### Botões

```tsx
import { Button } from '@/components/Button';

// Basta adicionar o prop trackName
<Button trackName="cta_pricing_section">
  Ver Planos
</Button>
```

#### Formulários

```tsx
import { trackFormStart, trackFormSubmit } from '@/lib/analytics';
import { useState } from 'react';

function MyForm() {
  const [formStarted, setFormStarted] = useState(false);

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('my_form');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... validação
    trackFormSubmit('my_form', true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFocus} />
      {/* ... */}
    </form>
  );
}
```

---

## 🧪 Como Testar

### 1. **Google Tag Manager (Debug Mode)**

1. Acesse seu site
2. Instale a extensão [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
3. Ative o modo de debug
4. Interaja com o site e veja os eventos sendo disparados

**Ou use o Preview Mode nativo do GTM:**
1. No GTM, clique em **Preview**
2. Digite a URL do seu site
3. Veja em tempo real os eventos e variáveis

### 2. **Google Analytics 4 (Debug View)**

1. Em GA4, vá em **Admin** → **DebugView**
2. Abra seu site em modo de desenvolvimento (`localhost`)
3. Veja os eventos chegando em tempo real

**Ou use a extensão Google Analytics Debugger:**
1. Instale [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Ative a extensão
3. Abra o console do navegador e veja os logs

### 3. **Meta Pixel (Events Manager Test Events)**

1. Acesse **Events Manager** no Facebook Business
2. Selecione seu Pixel
3. Vá em **Test Events**
4. Abra seu site em uma nova aba
5. Interaja com a página e veja os eventos chegando em tempo real

**Verificar Conversion API:**
- Os eventos server-side aparecem com um ícone de servidor
- Eventos client + server devem ser deduplicated automaticamente (mesmo `event_id`)

### 4. **Testar Consentimento de Cookies**

1. Limpe os cookies do site
2. Recarregue a página
3. Você deve ver o banner do Klaro
4. Abra DevTools → Application → Cookies
5. Verifique que GTM/GA4/Meta não carregam até consentir
6. Aceite os cookies e verifique que os scripts carregam

---

## 🐛 Troubleshooting

### Eventos não aparecem no GTM

**Possíveis causas**:
1. GTM_ID não configurado no `.env.local`
2. Usuário não deu consentimento (verifique banner Klaro)
3. Adblocker bloqueando

**Solução**:
- Verifique o console do navegador
- Teste com adblocker desativado
- Verifique `window.dataLayer` no console

### Meta Pixel não rastreia

**Possíveis causas**:
1. PIXEL_ID incorreto
2. Consentimento não dado
3. Adblocker ativo

**Solução**:
- Verifique se `window.fbq` existe no console
- Use Test Events do Facebook
- Teste em navegador anônimo

### Conversion API retorna erro

**Possíveis causas**:
1. Access Token inválido ou expirado
2. Pixel ID incorreto
3. Formato de dados incorreto

**Solução**:
- Verifique logs do servidor (console do Next.js)
- Regenere o Access Token no Meta Business
- Verifique se `META_CONVERSION_API_TOKEN` está no `.env.local`

### Eventos duplicados

**Possíveis causas**:
1. GTM configurado errado (trigger em duplicidade)
2. Evento manual + automático

**Solução**:
- Revise triggers no GTM
- Use `event_id` único para deduplicação

---

## 📝 Boas Práticas

### 1. **Nomes de Eventos Consistentes**

Use convenção snake_case e seja descritivo:
- ✅ `form_submit`, `button_click`, `video_play`
- ❌ `Submit`, `click1`, `evt`

### 2. **Tracking Names em Botões**

Seja específico e inclua contexto:
- ✅ `cta_hero_contact`, `pricing_plan_premium`, `footer_social_instagram`
- ❌ `button1`, `click`, `cta`

### 3. **Não Rastreie PII (Informações Pessoais)**

**Nunca envie** sem hash/criptografia:
- ❌ Email, CPF, telefone em parâmetros de evento
- ✅ Use a Conversion API que já faz hash automático

### 4. **Teste Antes de Produção**

- Use Test Events do Meta
- Verifique Preview Mode do GTM
- Confirme no DebugView do GA4

---

## 📚 Recursos Úteis

- [Google Tag Manager - Documentação](https://support.google.com/tagmanager)
- [Google Analytics 4 - Eventos](https://support.google.com/analytics/answer/9322688)
- [Meta Conversion API - Setup](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Klaro Cookie Consent](https://kiprotect.com/docs/klaro)
- [LGPD - Lei Geral de Proteção de Dados](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

---

## 🤝 Suporte

Se tiver dúvidas ou problemas:

1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Consulte os logs do navegador (F12 → Console)
3. Verifique os logs do servidor Next.js
4. Use as ferramentas de debug mencionadas acima

---

**Última atualização**: Outubro 2025


