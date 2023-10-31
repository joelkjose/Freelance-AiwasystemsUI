
import React from 'react'
import SubCategories from './SubCategories'
import Categories from './Categories'
import Products from '../Products'

const Dashboard = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Inventory</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Inventory</li>
          </ol>
        </nav>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"></h5>
          <ul
            className="nav nav-tabs nav-tabs-bordered d-flex"
            id="borderedTabJustified"
            role="tablist"
          >
            <li className="nav-item flex-fill" role="presentation">
              <button
                className="nav-link w-100 active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#bordered-justified-home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Categories
              </button>
            </li>
            <li className="nav-item flex-fill" role="presentation">
              <button
                className="nav-link w-100"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#bordered-justified-profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Products
              </button>
            </li>
          </ul>
          <div className="tab-content pt-2" id="borderedTabJustifiedContent">
            <div
              className="tab-pane fade show active"
              id="bordered-justified-home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <section className="section">
                <div className="row">
                <Categories />
                  <SubCategories />
                </div>
              </section>
            </div>
            <div
              className="tab-pane fade"
              id="bordered-justified-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Products />
            </div>

          </div>
        </div>
      </div>


    </main>
  )
}

export default Dashboard