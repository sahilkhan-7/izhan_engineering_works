import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const about = await prisma.aboutContent.findUnique({
      where: { id: "singleton" },
    });
    return NextResponse.json(about || { mainDescription: "", stats: "[]", features: "[]" });
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const about = await prisma.aboutContent.upsert({
      where: { id: "singleton" },
      update: {
        mainDescription: body.mainDescription,
        stats: JSON.stringify(body.stats),
        features: JSON.stringify(body.features)
      },
      create: {
        id: "singleton",
        mainDescription: body.mainDescription,
        stats: JSON.stringify(body.stats),
        features: JSON.stringify(body.features)
      }
    });

    return NextResponse.json(about);
  } catch (error) {
    console.error("Error saving about:", error);
    return NextResponse.json({ error: "Failed to save about" }, { status: 500 });
  }
}
