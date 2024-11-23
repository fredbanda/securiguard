import { auth, signOut } from '@/auth'
import React from 'react'

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="text-white text-[16px] font-bold">
      {JSON.stringify(session)}
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <button type="submit" className='bg-black text-white'>Sign out</button>
      </form>
    </div>
  )
}

export default SettingsPage