import React from 'react'
import appLogo from '../../vendors/img/apple.png'
import Searchbar from "../Searchbar/searchbar";

const SearchScreen = () => {
  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img className="mt-5" alt="webLogo" height="200px" src={appLogo}/>
          </div>
          <Searchbar />}
        </section>
      </div>
    </>
  )
}
export default SearchScreen