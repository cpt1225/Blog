

const Ball = () => {
  return (
    <div className="bg-gray-200 relative hidden w-1/2 lg:flex h-full items-center justify-center ">
      <div
        className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-red-500 rounded-full animate-spin">
      </div>
      <div className="w-full h-1/2 bg-white/10  bottom-0 absolute backdrop-blur-lg"></div>
    </div>
  )
}

export default Ball