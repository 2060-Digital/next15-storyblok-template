import cn from "classnames"
import { useFormContext } from "react-hook-form"
import Status from "components/Form/Status"

export default function Select({ name, label, showSuccessStatus, options, className, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  const inputClasses = cn({
    "appearance-none border-2 border-primary w-full block bg-[url(/assets/chevron-down.svg)] bg-[right_.5rem_center] bg-no-repeat px-3 py-2 leading-[19px] focus:border-valid": true,
    "text-valid outline-valid": !isInvalid,
    "border-valid": isDirty && !isInvalid,
    "border-invalid text-invalid": isInvalid,
  })

  const labelClasses = cn({
    "font-medium": true,
    "text-invalid": isInvalid,
    "text-valid": isDirty && !isInvalid,
  })

  return (
    <div className={`relative ${className}`}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <select id={name} defaultValue="Select your option" className={inputClasses} {...register(name)} {...delegated}>
        <option value="">Select your option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <Status error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} showSuccessStatus={showSuccessStatus} />
    </div>
  )
}
