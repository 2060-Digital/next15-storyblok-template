import { useFormContext } from "react-hook-form"
import Error from "components/Form/Status"

export default function Radio({ name, label, options, className, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  return (
    <fieldset className="radio-group">
      <legend className="mb-2">{label}</legend>
      {options.map((option) => (
        <label key={option} className="block px-4 md:px-6" {...delegated} htmlFor={option}>
          <input className="mr-2 shadow-lg" {...register(name)} type="radio" name={name} value={option} id={option} />
          {option}
        </label>
      ))}
      <Error textAlign="left" error={errors[name]} isDirty={isDirty} isInvalid={isInvalid} />
    </fieldset>
  )
}
