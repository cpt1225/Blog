'use client'
import { useState } from 'react'


const Page = () => {
  const [file, setFile] = useState<File>()

  async function upload() {
    
    if (!file) return;

    try {
      const data = new FormData()
      data.set('file', file)

      await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
    
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
    
  }
  return (
    <div>
      <h1>upLoad</h1>
      <form action={upload}>
        <input type="file" name="file"
         onChange={(e) => setFile(e.target.files?.[0])} />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}

export default Page