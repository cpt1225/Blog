import { Post } from "@/types"

const PostCard = ({post}: {post: Post}) => {
  return (
    <div className="mx-1">
      {post.title}
    </div>
  )
}

export default PostCard