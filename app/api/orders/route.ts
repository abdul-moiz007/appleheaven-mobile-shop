import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, address, city, items, totalAmount, paymentMethod } = body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required order details' },
        { status: 400 }
      );
    }

    const newOrder = {
      id: 'AG-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      phone,
      address,
      city: city || 'Rawalpindi',
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      status: 'PENDING_DISPATCH',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully! We will contact you for dispatch.',
      order: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
