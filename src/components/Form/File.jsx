import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import Status from "./Status"
import cn from "classnames"

export default function File({ name, label, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const [inputLabel, setInputLabel] = useState("No File Chosen")

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  const ghostInputClasses =
    "border-4 border-tertiary px-6 py-3 text-tertiary hover:bg-tertiary hover:text-white font-bold hover:bg-tertiary transition-all duration-300 cursor-pointer"

  const inputClasses = cn({
    "font-semibold ": true,
    "border-2 w-full block p-2": delegated.type !== "file",
    "text-valid outline-valid": !isInvalid,
    "border-blue-valid": isDirty && !isInvalid,
    "border-red-danger text-invalid": isInvalid,
    "ghost-input": delegated.type === "file",
  })

  useEffect(() => {
    const input = document.querySelector("#File")
    input.addEventListener("input", (e) => {
      setInputLabel(input.value.replace(/^.*\\/, ""))
    })
  }, [inputLabel])

  return (
    <div className="text-gray-light">
      <div className="mb-4 flex flex-col lg:flex-row">
        <div>Upload Media</div>
        <div className="lg:pl-1">File Size Limit: 8Mb (Accepts All File Types) </div>
      </div>

      <div className="border px-2 pb-6 pt-6 lg:pt-0 border-gray">
        <label className={ghostInputClasses} htmlFor={name}>
          {label}
        </label>
        <div className=" text-white mt-6 md:inline-block md:pl-2 ">{inputLabel}</div>
      </div>

      <input {...delegated} id={name} className={inputClasses} {...register(name)} accept="*" />
      {delegated.type !== "file" ? <Status error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} /> : null}
    </div>
  )
}
