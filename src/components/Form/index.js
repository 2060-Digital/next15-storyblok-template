import Script from "next/script"
import { useState, useEffect, useRef } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import CallToAction from "components/CallToAction"

import Input from "components/Form/Input"
import Textarea from "components/Form/Textarea"
import Radio from "components/Form/Radio"
import Checkbox from "components/Form/Checkbox"
import Select from "components/Form/Select"
import File from "components/Form/File"
import track from "utilities/track"

function Form({
  name,
  isLinkedIn,
  gtmPrefix,
  config: { onSubmit: submitMiddleware, SuccessStatus, ErrorStatus, schema, ...restOfConfig },
  currentStep,
  steps,
  children,
  next,
  prev,
  ...delegated
}) {
  const methods = useForm({
    ...restOfConfig,
    resolver: yupResolver(schema),
  })

  const [text, setText] = useState(
    "Federal News Network is 25! I just voted for the top 5 transformative government moments of the last 25 years.",
  )
  const textareaRef = useRef(null)
  const formRef = useRef()

  const copyToClipboard = async () => {
    if (navigator.clipboard && textareaRef.current) {
      try {
        await navigator.clipboard.writeText(textareaRef.current.value)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    } else {
      console.error("Clipboard API is not supported or textarea ref is not available.")
    }
  }

  const errors = methods.formState.errors

  const [status, setStatus] = useState("initial")
  const [trackedBegun, setTrackedBegun] = useState(false)

  const onSubmit = async (values) => {
    try {
      if (typeof submitMiddleware === "function") await submitMiddleware(values)
      await fetch("/", {
        method: "POST",
        body: new FormData(formRef.current),
      })

      if (name === "top-moments") {
        navigator.sendBeacon(`/.netlify/functions/submitMoments`, JSON.stringify(values))
      }
      setStatus("success")
      track({ event: `${gtmPrefix}_form_submission`, options: { name } })
    } catch (error) {
      setStatus("failed")
      console.error("Fetch Error: ", error)
      console.info("Form Field errors: ", errors)
    }
  }

  useEffect(() => {
    if (methods.formState.isDirty && !trackedBegun) {
      track({ event: "begin_form", options: { name } })
      setTrackedBegun(true)
    }
  }, [methods.formState.isDirty, trackedBegun, name])

  switch (status) {
    case "success":
      return (
        SuccessStatus || (
          <div className="form-status flex h-full flex-col items-center justify-center lg:pb-5 text-gray-light">
            <h2>Success!</h2>
            <div className="status">{"We've received your submission."}</div>
            {isLinkedIn && (
              <div className="h-full flex flex-col gap-4 py-2">
                <textarea
                  rows="4"
                  cols="75"
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  id="linked-post"
                  className="text-charcoal-dark border-2 w-full block px-3 py-2 focus:border-tertiary font-body font-medium"
                >
                  {text}
                </textarea>
                <CallToAction
                  href={`https://www.linkedin.com/feed/?shareActive=true&text=${text} %23FNN25`}
                  className="primary-link"
                  onClick={() => {
                    copyToClipboard()
                    track({ event: "post_to_linkedin" })
                  }}
                >
                  COPY TEXT & POST TO LINKEDIN
                </CallToAction>
              </div>
            )}
          </div>
        )
      )
    case "error":
      return (
        ErrorStatus || (
          <div className="form-status">
            <h2>Submission Failed</h2>
            <div className="status">An error has occurred.</div>``
          </div>
        )
      )
    default:
      return (
        <FormProvider {...methods}>
          <form
            name={name}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={methods.handleSubmit(onSubmit)}
            method="POST"
            ref={formRef}
            encType="multipart/form-data"
            {...delegated}
          >
            <input type="hidden" name="form-name" value={name} />
            <label className="hidden">
              {"Don’t fill this out if you're human:"} <input name="bot-field" />
            </label>
            {children}
          </form>
        </FormProvider>
      )
  }
}

export { Form, Input, Textarea, Radio, Checkbox, Select, File }
