const RepostsComponent = ({ numOfReposts }: { numOfReposts: number }) => {
  return (
    <>
      <div>
        <p className="text-zinc-600 text-xs font-medium">{numOfReposts} Reposts</p>
      </div>
    </>
  )
}

export default RepostsComponent