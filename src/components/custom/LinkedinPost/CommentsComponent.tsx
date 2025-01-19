const CommentsComponent = ({ numOfComments }: { numOfComments: number }) => {
  return (
    <p className="text-zinc-600 text-xs font-medium">
      {numOfComments} comments
    </p>
  )
}

export default CommentsComponent