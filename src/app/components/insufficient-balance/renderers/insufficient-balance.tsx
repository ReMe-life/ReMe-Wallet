import React from 'react'

export const InsufficientBalanceRender = function (context: any) {
    return (
        <div className='balance'>
            <p className='fee'>Transaction Fee <strong>ETH 0</strong></p>
            <p>You <strong>don’t have any ETH balance</strong> in your wallet to complete the transaction.</p>
            <p>You need to <strong>buy ETH and send it to your wallet address below</strong> to be able to make this transaction.</p>
            <input size={30} value='!ADD ADDRESS!' type='text' className='form-control input' />
            <div className='buttons-wrapper'>
                <button className='btn secondary'>Go back</button>
                <button className='btn primary'>Learn how to do that</button>
            </div>
        </div>
    )
}