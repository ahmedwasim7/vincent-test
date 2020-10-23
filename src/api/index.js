import axios from 'axios'

const URL = 'https://theunitedstates.io/congress-legislators/legislators-current.json'

export const getAllRecords = cb => (
  axios.get(URL)
    .then(response => {
      cb(response)
    })
    .catch(error => { })
)
