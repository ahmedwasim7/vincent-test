import { orderBy } from 'lodash'

export const orderRecords = (records, name, direction) => {
  if (name === 'Name') {
    records = orderBy(records, el => el.name.official_full, direction)
  } else if(name === 'Title') {
    records = orderBy(records, el => el.terms[el.terms.length-1].type, direction)
  } else if (name === 'Party Affiliation') {
    records = orderBy(records, el => el.terms[el.terms.length-1].party, direction)
  } else if (name === 'State') {
    records = orderBy(records, el => el.terms[el.terms.length-1].state, direction)
  }

  return records
}

export const handleSearch = (records, value) => {
  if (value !== '') {
    records = records.filter(record => (
      record.name.official_full.toLowerCase().includes(value.toLowerCase()) ||
      record.terms[record.terms.length-1].type.toLowerCase().includes(value.toLowerCase()) ||
      record.terms[record.terms.length-1].party.toLowerCase().includes(value.toLowerCase()) ||
      record.terms[record.terms.length-1].state.toLowerCase().includes(value.toLowerCase())
    ))
  }

  return records
}

export const applyFilters = (records, filters) => {
  if (records.length !== 0) {
    if (filters.title.length !== 0) records = records.filter((rec) => filters.title.includes(rec.terms[rec.terms.length-1].type))
    if (filters.party.length !== 0) records = records.filter((rec) => filters.party.includes(rec.terms[rec.terms.length-1].party))
    if (filters.state.length !== 0) records = records.filter((rec) => filters.state.includes(rec.terms[rec.terms.length-1].state))
  }

  return records
}

export const collapsableList = [
  { label: 'Title', id: 'title', option: 'title' },
  { label: 'Party', id: 'party', option: 'party' },
  { label: 'State', id: 'state', option: 'state' }
]
