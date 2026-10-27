import { NextRequest, NextResponse } from 'next/server';
import { META_SERVER_EVENTS } from '@/lib/analytics';
import { isMetaConfigured, sendConversionEvent } from '@/lib/meta-conversion';

function str(value: unknown, max: number): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value.slice(0, max) : undefined;
}

export async function POST(request: NextRequest) {
  if (!isMetaConfigured()) {
    return NextResponse.json(
      { error: 'Meta Conversion API não configurada' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    const eventName = str(body?.eventName, 50);
    const eventId = str(body?.eventId, 100);
    const sourceUrl = str(body?.sourceUrl, 2000);

    // Lista fechada: sem ela a rota viraria um proxy aberto para o nosso Pixel
    if (!eventName || !eventId || !sourceUrl || !META_SERVER_EVENTS.has(eventName)) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios ausentes ou evento não permitido' },
        { status: 400 }
      );
    }

    // IP e User-Agent vêm do request; a Meta rejeita IP inválido, então só
    // envia quando o header existe.
    const clientIp = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '')
      .split(',')[0]
      .trim();

    const customData =
      body?.customData && typeof body.customData === 'object' ? body.customData : {};

    const result = await sendConversionEvent(
      eventName,
      eventId,
      sourceUrl,
      {
        fbp: str(body?.userData?.fbp, 200),
        fbc: str(body?.userData?.fbc, 500),
        clientIpAddress: clientIp || undefined,
        clientUserAgent: request.headers.get('user-agent') || undefined,
      },
      customData
    );

    if (result.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: result.error }, { status: 502 });
  } catch (error) {
    console.error('Erro ao processar evento de conversão:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
