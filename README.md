# Alchemy Webhook POC

## SETUP

### INSTALLATION
```bash
npm i
```

### NGROK
Install `ngrok` to allow your local webserver to be visible to the webhook server
Create an account `ngrok`
Run `ngrok authtoken <authtoken from dashboard>` to save an authtoken to the cli
Run `./start-ngrok.sh` script in root of project

### Setting up the env

```sh
# Alchemy notify auth token - in notify section of dashboard
AUTH_TOKEN=

# alchemy api key in regular app section of dashboard
API_KEY=

# Remote ngrok host to proxy requests to local instance
# Note this is only needed for development
REMOTE_HOST=

# Local host and port
LOCAL_HOST=127.0.0.1
LOCAL_PORT=8080

# Example webhook context
WEBHOOK_CONTEXT=webhook

# Owner Address - this would come from the wallet connected
WALLET_ADDRESS=

# Contract address to listen to
CONTRACT_ADDRESS=
TOKEN_ID=
```

### Test Login Flow

- Make sure ngrok is running and you have put the url in the .env file
- Run `npm run login` and you should see `Example Alchemy Notify app listening at 127.0.0.1:8080`
- You may need to find an nft that is owned by a particular address in order for it to come up
- You can go to the dashboard and find the webhook that was created and send an example message
- You should see the following: `Processing webhook event id: whevt_mrgvz5w3rs2bgygr`
