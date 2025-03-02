import Image from "next/image"


export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <span className="text-gray-300">·</span>
          <span className="hover:text-gray-700">
            赣ICP备2024046805号-1
          </span>
          <span className="text-gray-300">·</span>
          <span>© 2025 AC</span>
          <span className="text-gray-300">·</span>
          <span>让生活更有激情</span>
        </div>
      </div>
    </footer>
  )
}

