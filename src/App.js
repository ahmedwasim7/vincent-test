import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'
import DataTable from 'react-data-table-component'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'
import { uniq } from 'lodash'
import { Multiselect } from 'multiselect-react-dropdown'

import { getAllRecords } from './api'
import NoRecord from './component/NoRecord'
import { applyFilters, collapsableList, handleSearch, orderRecords } from './helper'
import './App.scss'

const IMAGE_URL = 'https://image-cache-congress.herokuapp.com/application/get_image?image_url=https://theunitedstates.io/images/congress/225x275/'

const columns = [
  {
    name: 'Image',
    cell: d => <div><img className='profile-image' src={`${IMAGE_URL}/${d.id.bioguide}.jpg`} alt='profile-img' /></div>
  }, {
    name: 'Name',
    cell: d => d.name.official_full,
    sortable: true,
    selector: 'official_full'
  }, {
    name: 'Title',
    cell: d => <div>{d.terms[d.terms.length-1].type === 'sen' ? 'Senators' : 'Representatives'}</div>,
    selector: 'title',
    sortable: true
  }, {
    name: 'Party Affiliation',
    cell: d => <div>{d.terms[d.terms.length-1].party}</div>,
    selector: 'party',
    sortable: true
  }, {
    name: 'State',
    cell: d => <div>{d.terms[d.terms.length-1].state}</div>,
    selector: 'state',
    sortable: true
  }
]

const customStyles = {
  headCells: {
    style: {
      paddingLeft: '20px',
      paddingRight: '8px',
      fontWeight: 'bold',
      fontSize: 15,
      backgroundColor: '#eaf0f6'
    }
  },
  cells: {
    style: {
      paddingLeft: '20px',
      paddingRight: '8px'
    }
  },
  pagination: {
    style: {
      fontSize: '13px',
      minHeight: '56px',
      borderTopStyle: 'solid',
      borderTopWidth: '1px'
    }
  }
}

export default () => {
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    title: [],
    party: [],
    state: []
  })
  const [selectedFilters, setSelectedFilters] = useState({
    title: [],
    party: [],
    state: []
  })

  useEffect(() => {
    getAllRecords(setData)
  }, [])

  const setData = ({ data }) => {
    setRecords(data)
    setFilteredRecords(data)

    setFilters({
      title: uniq(data.map(a => a.terms[a.terms.length-1].type)).map(a => ({ id: typeText(a), name: typeText(a) })),
      party: uniq(data.map(a => a.terms[a.terms.length-1].party)).map(a => ({ id: a, name: a })),
      state: uniq(data.map(a => a.terms[a.terms.length-1].state)).map(a => ({ id: a, name: a })),
    })
  }

  const typeText = text => text === 'sen' ? 'Senators' : 'Representatives'

  const handleSort = ({ name }, direction) => {
    setFilteredRecords(orderRecords([...filteredRecords], name, direction))
  }

  const handleTextSearch = event => {
    setFilteredRecords(handleSearch((event.target.value === '' ? [...records] : [...records]), event.target.value))
  }

  const onSelect = (event, values) => {
    let filterss = {...selectedFilters}

    if (values === 'title') {
      filterss.title = event.map(a => a.id === 'Senators' ? 'sen' : 'rep')
    } else if (values === 'party') {
      filterss.party = event.map(a => a.id)
    } else if (values === 'state') {
      filterss.state = event.map(a => a.id)
    }

    setSelectedFilters(filterss)

    setFilteredRecords(applyFilters([...records], filterss))
  }

  return (
    <div className='app'>
      <header className='app-header'>
        {
          records.length !== 0 &&
            <React.Fragment>
              <div className='main-navbar'>
                <input
                  placeholder='Search'
                  onChange={handleTextSearch}
                />

                <button onClick={() => setShowFilter(!showFilter)}>
                  <FontAwesomeIcon icon={faFilter} />
                  <span>Filter</span>
                </button>
              </div>

              <Collapsible open={showFilter} triggerStyle={{ width: '100%' }}>
                {
                  collapsableList.map((item) => (
                    <div>
                      <h5>{item.label}</h5>
                      <Multiselect
                        id={item.id}
                        options={filters[item.option]}
                        displayValue='name'
                        onSelect={(event) => onSelect(event, item.option)}
                        onRemove={(event) => onSelect(event, item.option)}
                      />
                    </div>
                  ))
                }
              </Collapsible>
              <DataTable
                noHeader
                columns={columns}
                theme='solarized'
                primaryKey='_id'
                data={filteredRecords}
                style={{ width: '90%', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                customStyles={customStyles}
                sortable
                pagination
                onSort={handleSort}
                paginationPerPage={25}
                paginationTotalRows={filteredRecords.length}
                paginationRowsPerPageOptions={[25, 50, 75, 100]}
                noDataComponent={<NoRecord />}
              />
            </React.Fragment>
        }
        {
          records.length === 0 &&
            <Loader
              type='Puff'
              color='#00BFFF'
              height={100}
              width={100}
              timeout={3000}
            />
        }
      </header>
    </div>
  )
}
