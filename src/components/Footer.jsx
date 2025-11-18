import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-tertiary py-3">
      <div className="container text-sm text-center">
        &copy; {new Date().getFullYear()} Site Name | All rights reserved. <br className="lg:hidden" />
        <span className="hidden lg:inline">|</span>{" "}
        <Link href="https://art19.com/privacy" target="_blank" className="text-secondary hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
