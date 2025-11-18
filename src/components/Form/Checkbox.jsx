import cn from "classnames"
import { useFormContext } from "react-hook-form"
import Error from "components/Form/Status"

export default function Checkbox({ name, label, options = [], className, useOwnError, ...delegated }) {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext()

  const isInvalid = errors[name] && true
  const isDirty = dirtyFields[name]

  return (
    <fieldset className={cn("checkbox-group")}>
      <legend className="mb-2">{label}</legend>
      <div className="grid lg:grid-cols-2">
        {options.map((option = []) => (
          <div
            key={option}
            className="text-gray-light flex pb-2
           items-center "
          >
            <input
              className="appearance-none min-w-6 min-h-6 border-2 border-gray-light mr-2 shadow-lg leading-tight text-gray-light cursor-pointer relative peer"
              {...register(name)}
              type="checkbox"
              name={name}
              value={option}
              id={option}
            />
            {option}
            <svg
              className="absolute w-8 h-8 mb-1 hidden peer-checked:block pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4737"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <label className="block px-4 md:px-6 text-gray-light" {...delegated}></label>
          </div>
        ))}
      </div>
      <Error
        textAlign="left"
        error={useOwnError ? { message: "Please provide your consent." } : errors[name]}
        isDirty={isDirty}
        isInvalid={isInvalid}
      />
    </fieldset>
  )
}
