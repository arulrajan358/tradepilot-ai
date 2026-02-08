import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // using CryptoCompare free API for news
        const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const data = await res.json();

        // Transform to our format
        const news = data.Data.map((item: any) => ({
            title: item.title,
            source: item.source,
            url: item.url,
            date: new Date(item.published_on * 1000).toISOString(),
            country: "Glbl" // Global
        })).slice(0, 10); // Top 10

        // Add forecast field for compatibility with exiting UI
        const newsWithForecast = news.map((item: any) => ({
            ...item,
            forecast: 'Medium'
        }));

        return NextResponse.json(newsWithForecast);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
