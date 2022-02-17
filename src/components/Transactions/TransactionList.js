import { useFirestore } from '../../hooks/useFirestore'


export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <div className="flex flex-col mt-12 mx-6 px-6 border rounded-xl shadow-lg h-4/5 bg-slate-50 overflow overflow-auto resize">
      {transactions.map((transaction) => (
        <div className="flex flex-col">
          <div className="flex flex-row mt-3 p-6 border-2 rounded-xl justify-between" key={transaction.id}>
          {/* <div> */}
            <p className="text-4xl font-bold mr-6">{transaction.name}</p>
            <p className="text-3xl font-bold mr-6">${transaction.amount}</p>
          {/* </div> */}
            <button className="pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 text-lg rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300" onClick={() => deleteDocument(transaction.id)}>x</button>
          </div>
        </div>
      ))}
    </div>
  )
}
