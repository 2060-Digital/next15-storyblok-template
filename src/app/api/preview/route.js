import { NextResponse } from "next/server"
import { draftMode } from "next/headers"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug") || "/"

  if (process.env.STORYBLOK_PREVIEW_SECRET && secret !== process.env.STORYBLOK_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  const d = await draftMode()
  d.enable()

  return NextResponse.redirect(new URL(slug, req.url))
}
