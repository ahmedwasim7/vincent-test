import React, { Fragment } from 'react'

import './styles.scss'

const IMAGE_ICON = 'https://s3-eu-west-1.amazonaws.com/assets.gigable/customer-portal/empty-state.svg'

export default () => (
  <Fragment>
    <div className='main-error-div'>
      <img src={IMAGE_ICON} alt='Not found' />
      <h4>No results found</h4>
      <p>Try adjusting your search or filter to find what you're looking for</p>
    </div>
  </Fragment>
)
