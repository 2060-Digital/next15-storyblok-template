export default function Status({ error, isDirty, isInvalid }) {
  return (
    <div className="pt-2 pb-3 text-right mb-4 h-4">
      {isDirty ? (
        isInvalid ? (
          <Error>{error.message}</Error>
        ) : (
          <span className={isInvalid ? "text-invalid pt-2" : "text-valid"}>Great!</span>
        )
      ) : isInvalid ? (
        <Error>{error.message}</Error>
      ) : null}
    </div>
  )
}

function Error({ children }) {
  return <span className="text-error">{children}</span>
}
