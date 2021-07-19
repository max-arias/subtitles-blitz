export const minutesToHours = (minutes) => {
  if (!minutes) {
    return "-"
  }

  const hours = Math.floor(minutes / 60)
  let formatedMinutes = minutes - hours * 60
  formatedMinutes = String(formatedMinutes).padStart(2, "0")
  return `${hours}h ${formatedMinutes}m`
}
