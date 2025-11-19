"use client"

import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Input from "@/components/Form/Input"
import Textarea from "@/components/Form/Textarea"
import Radio from "@/components/Form/Radio"
import Checkbox from "@/components/Form/Checkbox"
import { track } from "@/utilities/track"
import encode from "@/utilities/encode"

function Form({
  name,
  config: { onSubmit: submitMiddleware, SuccessStatus, ErrorStatus, schema, ...restOfConfig },
  children,
  ...delegated
}) {
  const methods = useForm({
    ...restOfConfig,
    resolver: yupResolver(schema),
  })

  const [status, setStatus] = useState("initial")
  const [trackedBegun, setTrackedBegun] = useState(false)

  const onSubmit = async (values) => {
    try {
      if (typeof submitMiddleware === "function") await submitMiddleware(values)
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": name, ...values }),
      })
      setStatus("success")
      track({ type: "submit", name })
    } catch (error) {
      setStatus("failed")
      console.error("Fetch Error: ", error)
      console.info("Form Field errors: ", errors)
    }
  }

  useEffect(() => {
    if (methods.formState.isDirty && !trackedBegun) {
      track({ type: "begin_form", name })
      setTrackedBegun(true)
    }
  }, [methods.formState.isDirty, trackedBegun, name])

  switch (status) {
    case "success":
      return (
        SuccessStatus || (
          <div className="form-status">
            <h2>Success!</h2>
            <div className="status">{"We've received your submission."}</div>
          </div>
        )
      )
    case "error":
      return (
        ErrorStatus || (
          <div className="form-status">
            <h2>Submission Failed</h2>
            <div className="status">An error has occurred.</div>
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

export { Form, Input, Textarea, Radio, Checkbox }
