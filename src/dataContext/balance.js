import { useState, useEffect } from 'react'
import { BigNumber } from 'ethers'
import { useWeb3 } from '../web3'

function useMyEtherBalance(account, block) {
  const [myEtherBalance, setMyEtherBalance] = useState(BigNumber.from(0))
  const { provider } = useWeb3()

  useEffect(() => {
    if (!account || !provider) {
      setMyEtherBalance(BigNumber.from(0))
      return
    }

    provider.getBalance(account).then(balance => {
      setMyEtherBalance(balance)
    }).catch(console.error)
  }, [account, block, provider])

  return myEtherBalance
}

export {
  useMyEtherBalance,
}
