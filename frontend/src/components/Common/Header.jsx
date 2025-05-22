import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <header className='border-b border-gray-200'>
            <TopBar />  
            <Navbar />
        </header>
    )
}

export default Header