'use client'
import { Mail, MapPin, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          {/* Profile Sidebar */}
          <div className="flex flex-col gap-6">


            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-blue-100 rounded-lg p-4 mt-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>cpt1225</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>2217013491@qq.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>March 27 2003</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-blue-100">关于我</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  你好
                </p>
                <p>
                  我是一名大四的学生，我喜欢编程，我喜欢学习新的技术，我喜欢挑战自己。
                </p>
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-blue-100">技能</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "JavaScript",
                  "HTML5",
                  "CSS3",
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-blue-100">项目</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-1">个人博客网站</h3>
                  <p className="text-gray-600 text-sm mb-3">使用React和Next.js构建的个人博客</p>
                  <Link href="https://github.com/cpt1225/Blog" className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700">
                    查看项目 <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
                <div className="bg-white border border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-1">电影平台</h3>
                  <p className="text-gray-600 text-sm mb-3">一个单页面具有爱好跟随电影平台</p>
                  <Link href="https://github.com/cpt1225/movie" className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700">
                    查看项目 <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-blue-100">联系我</h2>
              <p className="text-gray-700 mb-4">如果您有任何问题或想讨论潜在的合作机会，请随时联系我。</p>
              <a
                href="mailto:2217013491@qq.com"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" /> 发送邮件
              </a>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
