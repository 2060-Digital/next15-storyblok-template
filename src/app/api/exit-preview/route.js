import { NextResponse } from "next/server"
import { draftMode } from "next/headers"

export async function GET(req) {
  const d = await draftMode()
  d.disable()

  const referer = req.headers.get("referer")
  return NextResponse.redirect(referer || process.env.NEXT_PUBLIC_SITE_URL || "/")
}
