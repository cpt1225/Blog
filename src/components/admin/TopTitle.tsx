

const TopTitle = ({title}:{title:string}) => {
  return (
    <div className="w-full border-1 border-gray-50 flex justify-between rounded-lg bg-gray-200 text-sm p-2">
      <div>作者</div>
      <div>{title}</div>
      <div>创建时间</div>
      <div>操作</div>
    </div>
  )
}

export default TopTitle