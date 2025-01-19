import GetLinkedInPosts from '@/components/GetLinkedInPosts'
import React from 'react'

const UserFindDataPage = () => {
  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">LinkedIn Posts</h2>
        <div className="flex space-x-4 mb-4">
          <GetLinkedInPosts />
        </div>
      </div>
    </>
  )
}

export default UserFindDataPage