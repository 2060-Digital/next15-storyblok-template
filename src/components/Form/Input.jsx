import cn from "classnames"
import { useFormContext } from "react-hook-form"
import Status from "@/components/Form/Status"

export default function Input({ name, label, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  const inputClasses = cn({
    "border-2 w-full block p-3": true,
    "text-valid outline-valid": !isInvalid,
    "border-valid": isDirty && !isInvalid,
    " border-invalid text-invalid": isInvalid,
  })

  const labelClasses = cn({
    "text-invalid": isInvalid,
    "text-valid": isDirty && !isInvalid,
  })

  return (
    <>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <input {...delegated} id={name} className={inputClasses} {...register(name)} />
      <Status error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} />
    </>
  )
}
