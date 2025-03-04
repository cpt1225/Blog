import { Mail } from "lucide-react"

const Form = () => {
  return (
    <div className="bg-white px-10 py-20 rounded-3xl">
      <h1 className="font-semibold text-5xl text-blue-500">Welcome back</h1>
      {/* <p className="font-medium text-gray-500 mt-4">Go to Work</p> */}
      <div className="mt-8">
        <div className="relative">
          <Mail size={24} className="absolute bottom-4 right-0" />
          <input className="w-2/3 border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent "
            type="text">
          </input>
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="password"></input>
        </div>
        <div>
          <div>
            <button>返回首页</button>
            <button>忘记密码</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form