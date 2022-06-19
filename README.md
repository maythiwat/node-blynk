# node-blynk
✨ Node.js Client for Blynk (Legacy) Mobile App Protocol

## Features
- Login/Register Account
- Get Energy
- Get Devices in Dashboard
- Load Profile

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

- [Test App Client](https://github.com/blynkkk/blynk-server/blob/master/integration-tests/src/test/java/cc/blynk/integration/model/tcp/TestAppClient.java)

- [ilcato/blynk-app-client](https://github.com/ilcato/blynk-app-client/blob/master/index.js)

## License
This project is MIT licensed (see [LICENSE.md](LICENSE.md))

Not affiliated with Blynk Inc. in any way, 

Trademarks belongs to their respective owner.