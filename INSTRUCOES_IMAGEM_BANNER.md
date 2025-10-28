# 📸 Instruções para Adicionar a Imagem do Banner de Consultoria

## Como Adicionar a Imagem

1. **Salve a imagem** que você enviou (banner com o texto "Solicite sua consultoria gratuita")

2. **Renomeie o arquivo** para: `consultoria-banner.png`

3. **Copie o arquivo** para o diretório:
   ```
   public/img/resource/consultoria-banner.png
   ```

## Estrutura do Diretório

```
naturmarketing/
└── public/
    └── img/
        └── resource/
            └── consultoria-banner.png  ← Coloque a imagem aqui
```

## Alternativa: Usar Imagem Online

Se preferir usar uma imagem hospedada online, edite o arquivo:

**`src/app/public/home/_components/ConsultoriaBanner/index.tsx`**

Linha 15-20, troque:
```tsx
style={{
  backgroundImage: 'url(/img/resource/consultoria-banner.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '400px'
}}
```

Por:
```tsx
style={{
  backgroundImage: 'url(SUA_URL_AQUI)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '400px'
}}
```

## Verificação

Após adicionar a imagem:
1. Recarregue a página
2. Role até o banner de "Consultoria Gratuita" (antes da seção de contato)
3. A imagem deve aparecer como fundo do banner

## Nota

O componente já está configurado com:
- ✅ Link WhatsApp: +55 35 99806-7432
- ✅ Tracking do botão
- ✅ Design responsivo
- ✅ Overlay para legibilidade

Só falta adicionar a imagem!

