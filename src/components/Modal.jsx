"use client"
import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"

export default function Modal({ open, onClose, children }) {
  const ref = useRef(null)

  // Focus the modal container when it opens
  useEffect(() => {
    if (open && ref.current) {
      ref.current.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div aria-hidden="true" onClick={onClose} className="fixed inset-0 z-[9998] bg-black opacity-50" />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
        className="fixed top-1/2 left-1/2 z-[9999] w-full max-w-full lg:max-w-screen-xl max-h-[100dvh] -translate-x-1/2 -translate-y-1/2 bg-primary rounded-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="fixed top-2 right-2 lg:top-4 lg:right-4 lg:text-lg hover:text-secondary"
        >
          &#9587;
        </button>

        <div className="w-full h-full max-h-[100vh] lg:h-auto lg:block overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body,
  )
}
