
export default function BookingFormErrorMessage({error}: {error : string}) {
  return (
      error ? <p className="error">{error}</p>: null
  )
}
