export const fetchPostMeetingRange = (body) => {
  return fetch('http://localhost:3001/meeting_ranges', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  }).then(resp => resp.json()).then(console.log)
}

export const headers = () => {
  return {
    'Content-Type': 'application/json',
    Accept: "application/json",
  }
}
