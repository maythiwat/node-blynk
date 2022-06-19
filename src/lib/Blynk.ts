import Protocol from './Protocol';
import Utils from './Utils';
import { BlynkResponse, Command } from './Constants';

class Blynk extends Protocol {
  login(email: string, password: string): Promise<BlynkResponse> {
    let passHash = Utils.hashPassword(password, email)
    let os = 'Android'
    let version = '2.27.34'
    let appName = 'Blynk'
    return this.sendCommand(Command.LOGIN, [email, passHash, os, version, appName])
  }

  register(email: string, password: string): Promise<BlynkResponse> {
    let passHash = Utils.hashPassword(password, email)
    let appName = 'Blynk'
    return this.sendCommand(Command.REGISTER, [email, passHash, appName])
  }

  getEnergy(): Promise<number> {
    return this.sendCommand(Command.GET_ENERGY)
  }

  async getDevices(dashId: string) {
    return this.sendCommand(Command.GET_DEVICES, dashId)
      .then((r) => JSON.parse(r))
      .catch(() => null)
  }

  async loadProfileGzipped() {
    return this.sendCommand(Command.LOAD_PROFILE_GZIPPED)
      .then((r) => JSON.parse(r))
      .catch(() => null)
  }
}

export default Blynk