# node-blynk
✨ Node.js Client for Blynk (Legacy) Mobile App Protocol

## Why?
I just want to register a new account on self-hosted server, but Blynk (Legacy) app don't let me to do that

and I just saw that Blynk (Legacy) app will be removed from the store on this June 30th,

so I decided to open source this project, That's it! 🤷‍♂️

![aru-panik](https://user-images.githubusercontent.com/23092256/174468961-5cda69e7-a4f5-46fe-a458-12efc6f64880.png)

## Features
- Login/Register Account
- Get Energy
- Get Devices in Dashboard
- Load Profile
- Hardware Command (WIP)

## Usage
```ts
import Blynk from 'blynk'
// in JavaScript
// const { Blynk } = require('blynk')

const blynk = new Blynk('blynk.example.org', 9443)
await blynk.connect()

await blynk.login('user@example.com', 'p@$$w0rd')
// or Register new account:
// await blynk.register('user@example.com', 'p@$$w0rd')

await blynk.getEnergy() // Returns energy amount (e.g. 10000)
```

## References

- [Blynk Protocol](https://github.com/blynkkk/blynk-server/blob/master/README.md#blynk-protocol)

- [Commands List](https://github.com/blynkkk/blynk-server/blob/master/server/core/src/main/java/cc/blynk/server/core/protocol/enums/Command.java#L10)

- [Response/Status Code List](https://github.com/blynkkk/blynk-server/blob/master/server/core/src/main/java/cc/blynk/server/core/protocol/enums/Response.java#L12)

- [Login Command Logic](https://github.com/blynkkk/blynk-server/blob/master/server/tcp-app-server/src/main/java/cc/blynk/server/application/handlers/main/auth/MobileLoginHandler.java)

- [Hardware Command Logic](https://github.com/blynkkk/blynk-server/blob/master/server/tcp-app-server/src/main/java/cc/blynk/server/application/handlers/main/logic/MobileHardwareLogic.java)

- [Hardware Pin Types](https://github.com/blynkkk/blynk-server/blob/master/server/core/src/main/java/cc/blynk/server/core/model/enums/PinType.java)

- [Test App Client](https://github.com/blynkkk/blynk-server/blob/master/integration-tests/src/test/java/cc/blynk/integration/model/tcp/TestAppClient.java)

- [ilcato/blynk-app-client](https://github.com/ilcato/blynk-app-client/blob/master/index.js)

## License
This project is MIT licensed (see [LICENSE.md](LICENSE.md))

Not affiliated with Blynk Inc. in any way, 

Trademarks belongs to their respective owner.
