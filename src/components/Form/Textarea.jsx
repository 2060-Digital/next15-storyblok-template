import cn from "classnames"
import { useFormContext } from "react-hook-form"
import Error from "@/components/Form/Status"

export default function Textarea({ name, label, className, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  const textareaClasses = cn({
    [className]: className && true,
    "border-2 block w-full resize-none": true,
    "border-green": isDirty && !isInvalid,
    "border-2 border-red-500": isInvalid,
  })

  const labelClasses = cn({
    "text-red-500": isInvalid,
    "text-green": isDirty && !isInvalid,
  })

  return (
    <>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <textarea className={textareaClasses} {...register(name)} name={name} id={name} {...delegated}></textarea>
      <Error error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} />
    </>
  )
}
