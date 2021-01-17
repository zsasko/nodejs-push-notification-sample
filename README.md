# NodeJS Push Notification Sample

This project is sample application that demonstrates sending FCM push notification from NodeJS backend app to Flutter android app.

![](https://cdn-images-1.medium.com/max/800/1*bu2DFL_fQ2pEKs8sEIldTA.png)

It's a source code for the following article on the medium:

- https://medium.com/@zoransasko/sending-push-notifications-from-nodejs-backend-to-flutter-android-app-8a261c3c2c61

In order to start this sample, please make sure that you specify the right data for establishing MySQL connection (in .env file):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=test_nodejs_push_notifications
```
Add additional information about port and environment on which app will run:
```
PORT=5000
NODE_ENV=development
```
Please also update FCM server key with the valid one:
```
FCM_SERVER_KEY=your_fcm_server_key
```
Then execute the following migration scripts:
```
npm install
npx sequelize-cli db:migrate
```
And run the app by executing the following script:
```
nodemon App.js
```
