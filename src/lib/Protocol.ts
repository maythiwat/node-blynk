import tls from 'tls'

import Utils from './Utils'
import { BODY_SEPARATOR, Command, BlynkResponse } from './Constants'

class Protocol {
  private debug: boolean
  private options: tls.ConnectionOptions
  private socket?: tls.TLSSocket

  private msgId = -1
  private promises: Map<number, {
    resolve: (value: any) => void
    reject: (reason: any) => void
    timeout: NodeJS.Timeout
  }> = new Map()

  constructor(host: string, port: number, debug = false) {
    this.debug = debug
    this.options = {
      host, port,
      rejectUnauthorized: false
    }
  }

  private getNewMsgId() {
    return this.msgId = this.msgId + 1
  }

  sendCommand(cmd: Command, body?: string | string[], timeout = 5000, isVoid = false) {
    let c = (resolve: (value?: any) => void, reject: (reason?: any) => void) => {
      let msgId = this.getNewMsgId()

      this.promises.set(msgId, {
        resolve, reject,
        timeout: setTimeout(() => isVoid ? resolve() : reject('Execution Timeout'), timeout)
      })

      if (body && Array.isArray(body))
        body = body.join(BODY_SEPARATOR)

      let message = Utils.buildMessage(cmd, this.msgId, body)

      if (this.debug) {
        console.log('\n\x1b[30mS <- C\x1b[0m', '\x1b[32m(HEAD)\x1b[0m', { msgId, type: Command[cmd] })
        console.log('\x1b[30mS <- C\x1b[0m', '\x1b[35m(MESG)\x1b[0m', message)
        console.log('\x1b[30mS <- C\x1b[0m', '\x1b[33m(DATA)\x1b[0m', body)
      }

      this.socket?.write(message)
    }
    return new Promise(c.bind(this))
  }

  private handler(data: Buffer) {
    let { type, msgId, length } = Utils.parseHeader(data)
    let parsedData = Utils.parseData(type, length, data)

    if (this.debug) {
      console.log('\x1b[30mS -> C\x1b[0m', '\x1b[32m(HEAD)\x1b[0m', { msgId, type: Command[type], length })
      console.log('\x1b[30mS -> C\x1b[0m', '\x1b[35m(MESG)\x1b[0m', data)

      if (type == Command.RESPONSE && typeof parsedData == 'number') {
        console.log('\x1b[30mS -> C\x1b[0m', '\x1b[33m(DATA)\x1b[0m', BlynkResponse[parsedData])
      }else{
        console.log('\x1b[30mS -> C\x1b[0m', '\x1b[33m(DATA)\x1b[0m', parsedData)
      }
    }

    let r = this.promises.get(msgId)
    if (r) {
      clearTimeout(r.timeout)
      r.resolve(parsedData)
    }
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      this.socket = tls.connect(this.options, resolve)
      this.socket.on('data', this.handler.bind(this))
      this.socket.on('error', reject)
    })
  }

  disconnect() {
    return new Promise<void>((resolve, reject) => {
      this.socket?.on('close', resolve)
      this.socket?.on('error', reject)
      this.socket?.destroy()
    })
  }
}

export default Protocol