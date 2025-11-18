export default function Status({ error, isDirty, isInvalid }) {
  return (
    <div className="pt-2 pb-3 text-right mb-4 h-8 text-secondary">
      {isDirty ? (
        isInvalid ? (
          <Error>{error.message}</Error>
        ) : (
          <span className={isInvalid ? "text-invalid pt-2" : "text-tertiary"}>Great!</span>
        )
      ) : isInvalid ? (
        <Error>{error.message}</Error>
      ) : null}
    </div>
  )
}

function Error({ children }) {
  return <div className="text-error">{children}</div>
}
