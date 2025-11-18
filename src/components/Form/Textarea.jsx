import cn from "classnames"
import { useFormContext } from "react-hook-form"
import Error from "components/Form/Status"

export default function Textarea({ name, label, className, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  const textareaClasses = cn({
    "border-2 w-full block px-3 py-2 focus:border-tertiary font-body font-medium": true,
    "text-valid outline-valid": !isInvalid,
    "border-valid outline-valid": isDirty && !isInvalid,
    "border-invalid text-invalid outline-invalid": isInvalid,
  })

  const labelClasses = cn({
    "font-body font-semibold w-full text-gray-light": true,
    "text-invalid": isInvalid,
    "text-valid": isDirty && !isInvalid,
  })

  return (
    <div className={className}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <textarea rows="4" cols="50" className={textareaClasses} id={name} {...register(name)} {...delegated}></textarea>
      <Error error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} />
    </div>
  )
}
