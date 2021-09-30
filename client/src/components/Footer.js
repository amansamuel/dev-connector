import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center" style={{bottom:0,position:'relative'}}>
            Copyright &copy; {new Date().getFullYear()} DevConnetor

        </footer>
    )
}
