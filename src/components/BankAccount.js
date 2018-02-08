import React, { Component } from 'react';
import Transaction from './Transaction';

export default class BankAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount      : 0,
      balance     : 0,
      transactions: []
    }
  }

  handleAmountChange = ({ target }) => {
    let newValue = Number(Number(target.value).toFixed(2))
    this.setState({
      amount: newValue
    })
  }

  handleDeposit = () => {
    let newBalance = this.state.balance + this.state.amount;
    let updatedTransactions = this.state.transactions.slice()
    updatedTransactions.push(
      <Transaction
        credit={this.state.amount}
        balance={newBalance}
      />
    )
    this.setState({
      amount        : 0,
      balance       : newBalance,
      transactions  : updatedTransactions
    });
  }

  handleWithdraw = () => {
    let newBalance = this.state.balance - this.state.amount;
    let updatedTransactions = this.state.transactions.slice();
    updatedTransactions.push(
      <Transaction
        debit={this.state.amount}
        balance={newBalance}
      />
    )
    this.setState({
      amount      : 0,
      balance     : newBalance,
      transactions: updatedTransactions
    });
  }

  render() {
    let balanceColor = this.state.balance >= 0 ? 'black' : 'red';

    return(
      <div>
        <h3 style={{ color: balanceColor }}>
          Current Balance: £{this.state.balance.toFixed(2)}
        </h3>
        <input
          type="number"
          id="amount"
          onChange={this.handleAmountChange}
          value={this.state.amount}
        />
        <button
          id="deposit"
          onClick={this.handleDeposit}
        >
          Deposit
        </button>
        <button
          id="withdraw"
          onClick={this.handleWithdraw}
        >
          Withdraw
        </button>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
              </tr>
              {this.state.transactions}
            </tbody>
          </table>
        </div>
      </div>

    )
  }
}
