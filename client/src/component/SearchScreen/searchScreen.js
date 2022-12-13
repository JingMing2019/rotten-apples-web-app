import React from 'react'
import { useParams } from 'react-router-dom'
import appLogo from '../../vendors/img/apple.png'
import Searchbar from "../Searchbar/searchbar";

const SearchScreen = () => {

  const { keyword } = useParams()

  console.log("screen" + keyword)

  return (
    <>
      <div>
        <section className="header">
          <div className="flex">
            <img className="mt-5" alt="webLogo" height="200px" src={appLogo}/>
          </div>
          <Searchbar keyword={keyword ? keyword : ''}/>}
        </section>
      </div>
    </>
  )
}
export default SearchScreen