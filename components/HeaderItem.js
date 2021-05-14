function HeaderItem({ Icon, Title }) {
    return (
        <div className = "flex flex-col items-center cursor-pointer group w-12 sm:w-20">
            <img src={Icon} alt="HK Logo" className="mb-1 group-hover:animate-bounce" />
            <p className = "opacity-0 group-hover:opacity-100 tracking-widest font-serrif font-semibold text-lg text-[#8D3F3F] ml-1">{Title}</p>
            {/* <p className = "opacity-100 tracking-widest ml-1">{Title}</p> */}
        </div>
    )
}

export default HeaderItem;
