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

        // 2. Get live prices
        // Optimized: Fetch once for BTC (since most are BTC). 
        // In a real app, we'd collect all unique symbols and fetch their prices.
        let btcPrice = 0;
        try {
            const priceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            const priceData = await priceRes.json();
            btcPrice = parseFloat(priceData.price);
        } catch (e) {
            console.error("Failed to fetch BTC price", e);
        }

        // 3. Calculate P/L
        const monitoredTrades = trades.map((trade: any) => {
            let currentPrice = trade.current_price;

            // Update price if it matches our fetched symbol
            // Handling common formats: BTC/USDT, BTCUSDT
            const pair = trade.pair.replace('/', '').toUpperCase();

            if (pair === 'BTCUSDT' && btcPrice > 0) {
                currentPrice = btcPrice;
            }

            // Fallback if no live price
            if (!currentPrice) currentPrice = trade.entry_price;

            // Calculate Profit %: ((Current - Entry) / Entry) * 100
            const entryPrice = parseFloat(trade.entry_price);
            const profitPercent = ((currentPrice - entryPrice) / entryPrice) * 100;

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
