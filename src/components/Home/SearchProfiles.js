import React from "react";
import { useCollection } from "../../hooks/useCollection";


export default function SearchProfiles(){
    const { isPending, error, documents } = useCollection("users");
    return(
        <>
            <div className="grid grid-cols-6 mx-4 justify-evenly">
        {isPending && <div>Loading users...</div>}
        {error && <div>{error}</div>}
        {documents &&
          documents.map((user) => (
            <button key={user.id}></button>
          ))}
            </div>
        </>
    )
}