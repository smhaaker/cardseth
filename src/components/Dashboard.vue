<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <div v-if="userExists">
      Welcome {{ pseudo }}. Destroy your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div>
    <div v-else>Sign up <router-link to="/signup">here</router-link>.</div>
      <p>Current Provider: {{ provider }}</p>
    <p>Network: {{ network }}</p>
    <p>Account Address: {{ address }}</p>
    <input name="urlForm" v-model="form.url">
    <div><a href="#" @click="setUrlFromInput">Set URL</a>.</div>
    <p>HELLO!</p>
  </div>
</template>

<script>
import Users from '@/js/users'
import Cards from '@/js/cards'

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
        console.log('IS THIS WORKING?')
        if (err) {
          console.log('error')
          console.log(err)
        } else {
          console.log('All urls')
          console.log(result.args)
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
