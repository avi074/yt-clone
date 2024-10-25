import moment from "moment"

export const convertToAbbreviation = (number) => {
  // Create a new Intl.NumberFormat object with options
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  })

  // Format the number and return the result
  return formatter.format(number)
}

export function timeSinceUpload(uploadDate) {
  return moment(uploadDate).fromNow()
}
