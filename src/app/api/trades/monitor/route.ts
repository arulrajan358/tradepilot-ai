import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    try {
        // 1. Fetch user trades
        const { data: trades, error } = await supabase
            .from('trades')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!trades || trades.length === 0) return NextResponse.json([]);

        // 2. Get live prices (Simpler: just fetch BTC for now, or loop if multiple pairs)
        // For this MVP, we will assume most trades are BTC/USDT or ETH/USDT
        // We will fetch BTC price from Binance
        const priceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const priceData = await priceRes.json();
        const btcPrice = parseFloat(priceData.price);

        // 3. Calculate P/L
        const monitoredTrades = trades.map((trade: any) => {
            let currentPrice = trade.current_price;

            // Update price if it matches our fetched symbol (naive implementation for MVP)
            if (trade.pair === 'BTC/USDT' || trade.pair === 'BTCUSD') {
                currentPrice = btcPrice;
            }

            // If we don't have a live price source for the pair, use the stored current_price or entry_price
            if (!currentPrice) currentPrice = trade.entry_price;

            const profitPercent = ((currentPrice - trade.entry_price) / trade.entry_price) * 100;

            let status = 'neutral';
            if (profitPercent > 0) status = 'profit';
            if (profitPercent < 0) status = 'loss';

            return {
                ...trade,
                current_price: currentPrice,
                profit_percent: profitPercent.toFixed(2),
                status
            };
        });

        return NextResponse.json(monitoredTrades);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
