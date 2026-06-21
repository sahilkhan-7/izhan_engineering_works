import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const contact = await prisma.contactSettings.findUnique({
      where: { id: "singleton" },
    });
    
    return NextResponse.json(contact || {
      email: '',
      phone1: '',
      phone2: '',
      address: '',
      mapUrl: '',
      whatsapp: '',
      instagram: '',
      facebook: ''
    });
  } catch (error) {
    console.error("Error fetching contact settings:", error);
    return NextResponse.json({ error: "Failed to fetch contact settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const contact = await prisma.contactSettings.upsert({
      where: { id: "singleton" },
      update: {
        email: body.email || '',
        phone1: body.phone1 || '',
        phone2: body.phone2 || '',
        address: body.address || '',
        mapUrl: body.mapUrl || '',
        whatsapp: body.whatsapp || '',
        instagram: body.instagram || '',
        facebook: body.facebook || ''
      },
      create: {
        id: "singleton",
        email: body.email || '',
        phone1: body.phone1 || '',
        phone2: body.phone2 || '',
        address: body.address || '',
        mapUrl: body.mapUrl || '',
        whatsapp: body.whatsapp || '',
        instagram: body.instagram || '',
        facebook: body.facebook || ''
      }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error saving contact settings:", error);
    return NextResponse.json({ error: "Failed to save contact settings" }, { status: 500 });
  }
}
