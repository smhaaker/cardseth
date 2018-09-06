import contract from 'truffle-contract'
import CardsContract from '@contracts/Cards.json'

const Cards = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(CardsContract)
      self.contract.setProvider(window.web3.currentProvider)
      console.log('works?')
      self.contract.deployed().then(instance => {
        console.log('Cards Contract Deployed?')
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  // set_s: function (pseudo) {
  //   let self = this

  //   return new Promise((resolve, reject) => {
  //     self.instance.set_s(
  //       pseudo,
  //       {from: window.web3.eth.accounts[0]}
  //     ).then(tx => {
  //       resolve(tx)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  s: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.s.call({from: window.web3.eth.accounts[0]}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setUrl: function (url) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.setUrl(
        url,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getUrl: function () {
    // return 'GET URL RETURN'
    let self = this
    // return self.instance.getUrl.call()
    return new Promise((resolve, reject) => {
      self.instance.getUrl.call({from: window.web3.eth.accounts[0]}
      ).then(pseudo => {
        resolve(pseudo)
      }).catch(err => {
        reject(err)
      })
    })
  },
  url: function () {
    // return 'GET URL RETURN'
    let self = this
    // return self.instance.getUrl.call()
    return new Promise((resolve, reject) => {
      self.instance.url.call({from: window.web3.eth.accounts[0]}
      ).then(url => {
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  },
  urlEvent: function () {
    let self = this
    return self.instance.urlEvent({}, {fromBlock: 0, toBlock: 'latest'})
//     console.log(self.instance.urlEvent())
//     self.instance.urlEvent().watch((err, result) => {
//       if (err) {
//         return err
//         // console.log(err)
//       } else {
//         // console.log(result.args.url)
//         return result.args
// //        console.log(result.args)
//       }
//     })
  }
}
export default Cards
