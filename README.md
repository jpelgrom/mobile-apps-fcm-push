# mobile-apps-fcm-push

This is the code that powers the official mobile app push notifications. Feel free to submit PRs!

## Developer Setup

Install NPM dependencies:

```
cd functions
npm install
```

Startup function for local testing:

```
# Only Once
npm install -g firebase-tools

echo 'APP_DEBUG_LOCAL=true' >> .env

# Whenever you want to start
npm run serve
```

# Deploy your own

Change the target project from `home-assistant-mobile-apps` to your own project name if needed:

```
# Only once
sed -i s/home-assistant-mobile-apps/myproject/g ../.firebaserc
```

You can set the `APP_REGION` environment variable if you want to deploy your functions in a another location than `us-central1`, e.g. `europe-west1`:

```
# Only once
echo 'APP_REGION=europe-west1' >> .env
```

Then deploy the Cloud Functions:

```
firebase deploy
```

Note: for deploying functions, your project must be on the pay-as-you-go plan (Blaze). By default new projects are on a no-cost plan (Spark). Enable pay-as-you-go in the Firebase console for your project > Settings > Usage and billing > Account and budgets > Upgrade. For individual use during development, usage is typically covered by the free tier.
