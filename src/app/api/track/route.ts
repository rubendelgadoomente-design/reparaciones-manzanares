import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const statsFilePath = path.join(process.cwd(), 'data', 'stats.json');

export async function POST(request: Request) {
  try {
    const { type, service, location } = await request.json();
    
    // Read current stats
    let statsData;
    try {
      const fileData = await fs.readFile(statsFilePath, 'utf8');
      statsData = JSON.parse(fileData);
    } catch (error) {
      // Default stats if file doesn't exist
      statsData = {
        totalLeads: 0,
        calls: 0,
        whatsapp: 0,
        daily: {},
        services: {},
        locations: {}
      };
    }

    // Update global counters
    statsData.totalLeads += 1;
    if (type === 'call') {
      statsData.calls += 1;
    } else if (type === 'whatsapp') {
      statsData.whatsapp += 1;
    }

    // Update daily stats (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    statsData.daily[today] = (statsData.daily[today] || 0) + 1;

    // Update service/location specific stats
    if (service) {
      statsData.services[service] = (statsData.services[service] || 0) + 1;
    }
    if (location) {
      statsData.locations[location] = (statsData.locations[location] || 0) + 1;
    }

    // Save back to file
    await fs.writeFile(statsFilePath, JSON.stringify(statsData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to record event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fileData = await fs.readFile(statsFilePath, 'utf8');
    const statsData = JSON.parse(fileData);
    return NextResponse.json(statsData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read stats' }, { status: 500 });
  }
}
