import crypto from "crypto"

export function getGravatarUrl(email: string, size = 80): string {
  const hash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex")
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404`
}

export function getPravatarUrl(email: string, size = 80): string {
  const hash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex")
  return `https://i.pravatar.cc/${size}?u=${hash}`
}

export function getAvatarUrl(email: string, size = 80): string {
  // First try Gravatar, if it fails, Pravatar will be used as fallback in the component
  return getGravatarUrl(email, size)
}
