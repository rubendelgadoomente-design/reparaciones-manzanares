import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
  try {
    const keyPath = path.join(process.cwd(), "gsc-credentials.json");
    if (!fs.existsSync(keyPath)) {
      return NextResponse.json({ error: "Credentials not found" }, { status: 404 });
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    const searchconsole = google.searchconsole({ version: "v1", auth });
    
    const sites = await searchconsole.sites.list({});
    const siteEntries = sites.data.siteEntry || [];
    
    const matchedSite = siteEntries.find(s => s.siteUrl?.includes("reparacionesmanzanares"));
    
    if (!matchedSite || !matchedSite.siteUrl) {
      return NextResponse.json({ error: "No se encontro la propiedad en GSC." }, { status: 403 });
    }
    
    const siteUrl = matchedSite.siteUrl;

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(today);

    // 1. Datos globales totales
    const totalsRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        // sin dimensions para que devuelva el total agregado
      },
    });

    // 2. Top Queries
    const queriesRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 10,
      },
    });

    // 3. Top Pages
    const pagesRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 10,
      },
    });

    return NextResponse.json({
      siteUrl,
      totals: totalsRes.data.rows ? totalsRes.data.rows[0] : { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      queries: queriesRes.data.rows || [],
      pages: pagesRes.data.rows || [],
    });
  } catch (error: any) {
    console.error("GSC API Error:", error.message || error);
    return NextResponse.json({ error: error.message || "Failed to fetch GSC data" }, { status: 500 });
  }
}
