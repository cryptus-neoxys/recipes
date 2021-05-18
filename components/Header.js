
import HeaderItem from './HeaderItem'
function Header() {
    return (
        <header className = "flex flex-grow justify-between">
            <h1 className="tracking-widest font-extrabold text-3xl p-5 text-[#8D3F3F]">LOGO</h1>    
            <div className = "flex flex-grow justify-evenly max-w-lg sm:max-w-xs p-5">
                <HeaderItem Icon = '/home.svg' Title = "HOME"/>
                <HeaderItem Icon = '/notification.svg' Title = "RECIPES"/>
                <HeaderItem Icon = '/user.svg' Title = "USER"/>
            </div>
        </header>
    )
}

export default Header;
