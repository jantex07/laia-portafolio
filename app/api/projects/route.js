import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/drive';

export const revalidate = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'ca';
  try {
    const projects = await getProjects(lang);
    return NextResponse.json(projects);
  } catch (err) {
    console.error('Error llegint Drive:', err);
    return NextResponse.json([], { status: 500 });
  }
}
