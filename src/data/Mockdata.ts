// import { useEffect } from 'react'

export const mockDataTeam = [
  {
    BSA_URL: 'http://7.224.33:5002',
    BU: 'http://103.177.224.33:5000'
  }
]

export const sqlConnection = [
  {
    User: 'sa',
    Password: 'dataman@123',
    Server: '103.93.94.83',
    port: 5433,
    Database: 'BSA_Database',
  }
]

// interface FileData {
//   BU: string
//   Product: string
// }

// export function mockdata() {
//   useEffect(() => {
//     async function fetchFile() {
//       try {
//         const response = await fetch('/api/readFile', { cache: 'no-store' })
//         console.log('Response:', response)
//         if (response.ok) {
//           const data: FileData = await response.json()
//           console.log('Data:', data)
//         } else {
//           ;('Failed to fetch data. Please try again later.')
//         }
//       } catch (error) {
//         ;('An error occurred while fetching data. Please try again later.')
//       }
//     }

//     fetchFile()
//   }, [])
// }
