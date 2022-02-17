import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import Sidebar from '../Dashboard/Sidebar'


// components
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default function Transactions() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-auto">
        <div className="w-1/2 h-screen p-12">
          <TransactionForm uid={user.uid} />
        </div>
        <div className="w-1/2 h-screen p-12">
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents} />}
        </div>
      </div>
    </div>
  )
}
