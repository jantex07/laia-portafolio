import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/drive';

export const revalidate = 60; // refresca cada 60 segundos

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('Error llegint Drive:', err);
    return NextResponse.json([], { status: 500 });
  }
}
