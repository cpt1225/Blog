import { Post } from '../../types'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { dateChange } from '@/utils/dateChange'


const BlogCard = ({ post, index }: { post: Post, index: number }) => {
  return (
    <div className=''>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-6 w-[30vw] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 relative min-w-[200px]"
      >

        <h3 className="text-lg text-blue-900 mx-4">{post.title}</h3>
        <p className="text-gray-900 mx-4">{dateChange(post.createTime)}</p>
        <Link href={`/post/${post.id}`} className='absolute bottom-4 right-4 text-xs text-gray-600 md:text-sm'>
          Look
        </Link>
      </motion.div>
    </div>
  )
}

export default BlogCard