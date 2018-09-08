<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <div v-if="userExists">
      Welcome <a href="">{{ pseudo }}</a>. Destroy your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div>
    <div v-else>Sign up <router-link to="/signup">here</router-link>.</div>
      <p>Current Provider: {{ provider }}</p>
    <p>Network: {{ network }}</p>
    <p>Account Address: {{ address }}</p>
    <input name="urlForm" v-model="form.url">
    <div><p></p><a id="setLink" href="#" @click="setUrlFromInput">Set URL</a></div>
    <!-- <p>Urls: {{events}}</p> -->
    <ul id="urlList">
      <!-- <li v-for="event in events.slice().reverse()"> -->
      <li v-for="event in events.slice(events.length - 5, events.length).reverse()">
        <div class="linkBoxes">
          <p>Author: {{ event._from }}</p>
          <a v-bind:href='event._url'>{{ event._url }}</a>
          <!-- Set link name as well. -->
        </div>
      </li>
    </ul>
    
    <p>add Load more button after x amount of cards</p>
  </div>
</template>

<script>
import Users from '@/js/users'
import Cards from '@/js/cards'
// Cards.deployed().then(function(instance) { cards = instance; });
// var event = cards.urlEvent({from:web3.eth.coinbase}, {fromBlock: 0, toBlock: 'latest'})
// event.watch(function(error,result){console.log(result.args)})
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to your truffle-vue dApp',
      pseudo: undefined,
      address: undefined,
      provider: undefined,
      network: undefined,
      url: undefined,
      form: {
        url: undefined
      },
      events: []
    }
  },
  computed: {
    userExists: function () {
      return (typeof this.pseudo !== 'undefined')
    }
  },
  beforeCreate: function () {
    Cards.init().then(() => {
      console.log('Is tests deployed here?: ' + Cards.contract.isDeployed())
      Cards.urlEvent().watch((err, result) => {
        if (err) {
          // console.log('error')
          console.log(err)
        } else {
          // console.log('All urls')
          console.log(result)
          // console.log(result.args.url)
          this.events.push(result.args)
          // this.events = result.args.url
        }
      })
      console.log(Cards.urlEvent())
      // this.events = Test.urlEvent()
    })
    Users.init().then(() => {
      Users.exists(window.web3.eth.accounts[0]).then((exists) => {
        this.address = window.web3.eth.accounts[0]
        this.network = window.web3.isConnected()
        if (window.web3.currentProvider.isMetaMask) {
          this.provider = 'metamask'
        }
        if (exists) {
          Users.authenticate().then(pseudo => {
            this.pseudo = pseudo
          })
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    destroyAccount: function (e) {
      e.preventDefault()
      Users.destroy().then(() => {
        this.pseudo = undefined
      }).catch(err => {
        console.log(err)
      })
    },
    testEvent: function (e) {
      console.log('test event fires')
      Cards.getUrl().then(url => { // gets url.
        console.log('works')
        this.url = url
        // this.url = Test.getUrl()
        console.log(Cards.getUrl())
      }).catch(err => {
        console.log(err)
      })
    },
    setUrlFromInput: function () {
      let self = this
      if (typeof this.form.url !== 'undefined' && this.form.url !== '') {
        Cards.setUrl(this.form.url).then(tx => {
          console.log(tx)
          self.$router.push('/')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /* display: inline-block; */
  margin: 0 10px;
}

a {
  color: #42b983;
}

.linkBoxes{
  background-color: lightgray;
  border: 1px solid orange;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
}

.linkBoxes a{
  color: black;
  text-decoration: none;
}
.linkBoxes a:hover{
  color: greenyellow;
  text-decoration: none;
}

#urlList{
  margin: auto;
  width: 80%
}
#setLink{
  background-color: black;
  padding: 10px;
}
</style>
