import crypto from 'crypto'
import zlib from 'zlib'

import { HEADER_SIZE, Command } from './Constants'

class Utils {
  public static hashPassword(password: string, salt: string) {
    let saltHash = crypto.createHash('sha256')
    saltHash.update(salt.toLowerCase(), 'utf8')
    let finalHash = crypto.createHash('sha256')
    finalHash.update(password, 'utf8').update(saltHash.digest())
    return finalHash.digest('base64')
  }

  public static buildMessage(cmd: Command, msgId: number, body?: string) {
    let bodyLength = (body ? body.length : 0)
    let buffer = Buffer.alloc(HEADER_SIZE + bodyLength)
    buffer.writeUInt8(cmd, 0)           // Command
    buffer.writeUInt16BE(msgId, 1)      // Message Id
    buffer.writeUInt32BE(bodyLength, 3) // Length

    if (body && bodyLength > 0)
      buffer.write(body, 7, 'ascii')    // Body

    return buffer
  }

  public static parseHeader(data: Buffer) {
    let type = data.readUInt8(0)
    let msgId = data.readUInt16BE(1)
    let length = data.readUInt32BE(3)

    return { type, msgId, length }
  }

  public static parseData(type: Command, length: number, data: Buffer) {
    let result = null
    switch(type) {
      case Command.RESPONSE:
        result = length
        break
      case Command.LOAD_PROFILE_GZIPPED:
        let u = zlib.unzipSync(data.slice(HEADER_SIZE))
        result = u.toString('utf-8')
        break
      default:
        result = data.toString('utf-8', HEADER_SIZE)
        break
    }
    return result
  }
}

export default Utils