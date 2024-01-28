import React, { useEffect } from 'react'
import isAuthorized from '../../utils/Adminisauthorized';
import { redirect } from 'react-router-dom';

export default function Dashboard() {
  // Check Auth
  useEffect(() => {
    const checkAutho = async () => {
      if (!isAuthorized){
        console.log(isAuthorized);
        // window.location.href = '/admin';
      }else{
        await checkAutho();
      }
    }
  }, []);

  return (
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1>Main Content</h1>
      </div>
    </main>
  );
}
