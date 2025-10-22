# 🚀 Setup Rápido - Sistema de Rastreamento

Guia rápido para configurar o sistema de rastreamento em 5 minutos.

## ✅ Checklist de Configuração

### 1. Instalar Dependências (Já feito! ✓)

```bash
npm install klaro
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Copie o .env.example
cp .env.example .env.local
```

Edite `.env.local` e adicione seus IDs:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id
META_CONVERSION_API_TOKEN=seu_token_secreto
```

### 3. Obter os IDs Necessários

#### Google Tag Manager (GTM)

1. Acesse: https://tagmanager.google.com/
2. Crie um container Web
3. Copie o ID (formato: `GTM-XXXXXXX`)

#### Google Analytics 4 (GA4)

1. Acesse: https://analytics.google.com/
2. Crie uma propriedade GA4
3. Em **Admin** → **Data Streams** → copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)

#### Meta Pixel

1. Acesse: https://business.facebook.com/
2. Vá em **Events Manager**
3. Crie um Pixel
4. Copie o **Pixel ID** (número)

#### Meta Conversion API Token

1. No **Events Manager**, selecione seu Pixel
2. **Settings** → **Conversions API**
3. Clique em **Generate Access Token**
4. Copie o token (guarde com segurança!)

### 4. Configurar GTM (Importante!)

No Google Tag Manager, você precisa criar as tags:

#### Tag 1: Google Analytics 4

1. No GTM, vá em **Tags** → **New**
2. **Tag Configuration** → **Google Analytics: GA4 Configuration**
3. Cole seu **Measurement ID** (`G-XXXXXXXXXX`)
4. **Triggering** → **All Pages**
5. Salve

#### Tag 2: GA4 Event (Para eventos customizados)

1. **Tags** → **New**
2. **Tag Configuration** → **Google Analytics: GA4 Event**
3. **Configuration Tag**: selecione a tag GA4 criada acima
4. **Event Name**: `{{Event}}`
5. **Event Parameters**:
   - Adicione todos os parâmetros do dataLayer
6. **Triggering** → **Custom Event** → Nome do evento: `.+` (regex para todos)
7. Salve

#### Tag 3: Meta Pixel Base (Opcional, já temos no código)

Você não precisa adicionar o Meta Pixel no GTM, pois já está implementado diretamente no código. Mas se quiser centralizar tudo no GTM:

1. **Tags** → **New**
2. **Tag Configuration** → **Custom HTML**
3. Cole o código do Meta Pixel
4. **Triggering** → **All Pages**
5. Salve

### 5. Publicar no GTM

1. Clique em **Submit** (canto superior direito)
2. Dê um nome à versão (ex: "Initial Setup")
3. Clique em **Publish**

### 6. Testar

```bash
npm run dev
```

Abra http://localhost:3000 e:

1. **Verifique o Console**: Não deve ter erros relacionados a GTM/GA4/Meta
2. **Teste o Banner de Cookies**: Deve aparecer ao carregar a página
3. **Aceite os Cookies**
4. **Abra DevTools → Network**: Procure por requisições para:
   - `googletagmanager.com`
   - `google-analytics.com`
   - `facebook.net`

### 7. Testar Eventos

#### No Google Analytics 4:

1. Acesse GA4 → **Admin** → **DebugView**
2. Interaja com seu site (scroll, cliques, formulários)
3. Veja os eventos em tempo real

#### No Meta:

1. Acesse **Events Manager**
2. Selecione seu Pixel
3. Vá em **Test Events**
4. Interaja com seu site
5. Veja os eventos chegando (client e server-side)

---

## 🎯 Próximos Passos

### Adicionar Tracking em Novos Componentes

#### Em um Botão:

```tsx
import { Button } from '@/components/Button';

<Button trackName="nome_do_botao">
  Clique Aqui
</Button>
```

#### Em um Formulário:

```tsx
import { trackFormStart, trackFormSubmit } from '@/lib/analytics';
import { useState } from 'react';

function MeuForm() {
  const [started, setStarted] = useState(false);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      trackFormSubmit('meu_form', true);
    }}>
      <input 
        onFocus={() => {
          if (!started) {
            setStarted(true);
            trackFormStart('meu_form');
          }
        }}
      />
    </form>
  );
}
```

#### Evento Customizado:

```tsx
import { trackEvent } from '@/lib/analytics';

trackEvent('video_play', {
  video_name: 'intro',
  duration: 120,
});
```

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- **[TRACKING.md](./TRACKING.md)** - Documentação completa
- **[.env.example](./.env.example)** - Exemplo de variáveis

---

## ⚠️ Avisos Importantes

1. **Nunca commite o `.env.local`** - Ele contém tokens secretos
2. **O `.env.example` pode ser commitado** - É apenas um template
3. **Meta Conversion API Token** - É secreto, guarde com segurança
4. **GTM_ID e PIXEL_ID** - Podem ser públicos (começam com NEXT_PUBLIC_)
5. **Publique suas mudanças no GTM** - Mudanças no GTM só funcionam após publicar

---

## 🐛 Problemas Comuns

### "GTM_ID não configurado"

- Verifique se criou o `.env.local`
- Reinicie o servidor Next.js (`npm run dev`)

### "Eventos não aparecem no GA4"

- Verifique se configurou as tags no GTM
- Publique as mudanças no GTM
- Aguarde alguns minutos (pode ter delay)

### "Meta Pixel não rastreia"

- Verifique o Pixel ID
- Aceite os cookies no banner
- Desative adblockers

### "Conversion API retorna erro"

- Verifique o Access Token
- Certifique-se que `META_CONVERSION_API_TOKEN` está no `.env.local`
- Regenere o token no Meta Business

---

**Precisa de ajuda?** Consulte o [TRACKING.md](./TRACKING.md) completo!


