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
export const fetchMeetingRange = (id) => {
  return fetch(`http://localhost:3001/meeting_ranges/${id}`).then(resp => resp.json())
}

export const fetchCreateMeetingTime = (body) => {
  return fetch('http://localhost:3001/meeting_times', {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

export const fetchCreateInvitation = (body) => {
  return fetch('http://localhost:3001/invitations', {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  }).then(resp => resp.json())
}

export const fetchUser = (id) => {
  return fetch('http://localhost:3001/users/' + id).then(resp => resp.json())
}

export const headers = () => {
  return {
    'Content-Type': 'application/json',
    Accept: "application/json",
  }
}
