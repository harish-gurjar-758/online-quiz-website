import React from 'react'
import Categories from './Modules/Categories'

const AdminIndex = () => {
  return (
    <div className='AdminIndex'>
      <div className='admin-container'>
        <div className='admin-container-layout'>
          <div className='admin-layout'>
            <div className='admin-layout-list'>
              <h2>Categories</h2>
              <h2>Quotations</h2>
              <h2>Certificats</h2>
              <h2>News/Crausole</h2>
            </div>
          </div>
        </div>
        <div className='admin-container-box'>
          {/* Categories */}
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default AdminIndex
