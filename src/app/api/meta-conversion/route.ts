import { NextRequest, NextResponse } from 'next/server';
import { sendConversionEvent } from '@/lib/meta-conversion';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      eventName,
      eventId,
      sourceUrl,
      userData = {},
      customData = {},
    } = body;

    // Validação básica
    if (!eventName || !eventId || !sourceUrl) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios ausentes' },
        { status: 400 }
      );
    }

    // Adiciona IP e User-Agent do servidor
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const enrichedUserData = {
      ...userData,
      clientIpAddress: clientIp.split(',')[0].trim(),
      clientUserAgent: userAgent,
    };

    // Envia para Meta Conversion API
    const result = await sendConversionEvent(
      eventName,
      eventId,
      sourceUrl,
      enrichedUserData,
      customData
    );

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar evento de conversão:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}


