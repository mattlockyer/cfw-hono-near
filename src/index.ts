import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import * as nearAPI from "near-api-js"
const { Near, Account, keyStores } = nearAPI;

const myKeyStore = new keyStores.InMemoryKeyStore();
const config = {
  networkId: "testnet",
  keyStore: myKeyStore, // first create a key store
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://testnet.nearblocks.io",
};
const near = new Near(config);

const app = new Hono()

app.use('*', poweredBy())

app.get('/', (c) => {
  return c.json(near)
})

app.get('/account/:accountId', async (c) => {
  const accountId = c.req.param('accountId')
  const account = new Account(near.connection, accountId)
  const balance = await account.getAccountBalance()
  return c.json(balance)
})

export default app
