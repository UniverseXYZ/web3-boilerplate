import { useState, useEffect } from 'react'

function useMyEns(account, provider, block) {
  const [myEns, setMyEns] = useState(null)

  useEffect(() => {
    if (!account || !provider) {
      setMyEns(null)
      return
    }

    provider.lookupAddress(account)
      .then(setMyEns)
      .catch(console.error)
  }, [account, block, provider])

  return myEns
}

export {
  useMyEns,
}
