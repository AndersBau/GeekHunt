import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid,
      name,
      amount,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <div className="flex flex-col items-center mt-12 mx-6 px-6 border rounded-xl shadow-lg h-4/5 bg-slate-50 overflow overflow-auto resize">
      <h3 className="text-center text-4xl text-slate-600 font-bold uppercase mt-8">Add a Transaction</h3>
      <form className="mt-6 mb-24" onSubmit={handleSubmit}>
      <div className="mt-8 p-6 flex flex-col w-full">
          <span className="font-semibold text-2xl">Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mt-4 p-6 flex flex-col w-full">
          <span className="font-semibold text-2xl">Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        <button className="p-2 pl-5 pr-5 mt-6 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300" >Add Transaction</button>
        </div>
      </form>
    </div>
  )
}
