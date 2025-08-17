export const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-orange-500 to-[#FFD42A] shadow-lg w-full overflow-hidden">
            <div className="flex justify-start items-center py-2 px-6">
                <div className="relative inline-block">
                    <img
                        src="/logo.png"
                        className="h-28 drop-shadow-md"
                        alt="logo"
                    />
                </div>
            </div>
        </nav>
    )
}