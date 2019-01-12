export const fetchPostMeetingRange = (body) => {
  return fetch('http://localhost:3001/meeting_ranges', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  }).then(resp => resp.json())
}

export const fetchCreateTime = (body) => {
  return fetch('http://localhost:3001/meeting_times', {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  }).then(resp => resp.json())
}

export const fetchCreateUser = (body) => {
  return fetch('http://localhost:3001/users', {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

export const headers = () => {
  return {
    'Content-Type': 'application/json',
    Accept: "application/json",
  }
}
