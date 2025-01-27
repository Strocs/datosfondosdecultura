export async function fetchUrl (url) {
  try {
    const res = await fetch(url)
    return await res.text()
  } catch (error) {
    console.error('Fetching error:', error)
  }
}
