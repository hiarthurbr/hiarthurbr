import { useState } from 'react'
import styles from '@styles/index.module.css'
import Link from 'next/link'
import Image from 'next/image'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <Link href="https://vitejs.dev" target="_blank">
          <Image src="/vite.svg" className={styles.logo} alt="Vite logo" />
        </Link>
        <Link href="https://reactjs.org" target="_blank">
          <Image src='/react.svg' className={[styles.logo, styles.react].join(' ')} alt="React logo" />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button className='text-white' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code className='dark:bg-zinc-800 dark:text-zinc-300 text-zinc-700'>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles["read-the-docs"]}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App