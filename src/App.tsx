import { useState, useEffect, useRef } from 'react'

import { Header } from './components/header/Header'
import { Body } from './components/body/Body'
import { Footer } from './components/footer/Footer'

const App: React.FC = () => {
    
    return (
        <div className='wrapper'>
            <Header />
            <Body />
            <Footer/>
        </div>
    )
}

export {App}