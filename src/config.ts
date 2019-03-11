import { PluginConfig } from "./plugin-config"
import { ReadinessProbe } from "./readiness-probe"

// from https://mackerel.io/ja/docs/entry/howto/container-agent

// tslint:disable:interface-name
interface MackerelContainerAgentConfigProps {
  apikey?: string
  apibase?: string
  ignoreContainer?: string
  root?: string
  roles?: ServiceRole[]
  plugins?: PluginConfig
  readinessProbe?: ReadinessProbe
}

export class MackerelContainerAgentConfig {
  public apikey?: string
  public apibase?: string
  public ignoreContainer?: string
  public root?: string
  public serviceRoles?: ServiceRole[]
  public plugins: PluginConfig
  public readinessProbe?: ReadinessProbe

  constructor(props?: MackerelContainerAgentConfigProps) {
    if (!props) {
      this.plugins = new PluginConfig({})
      return
    }

    this.apikey = props.apikey
    this.apibase = props.apibase
    this.ignoreContainer = props.ignoreContainer
    this.root = props.root
    this.serviceRoles = props.roles
    this.plugins = props.plugins || new PluginConfig({})
    this.readinessProbe = props.readinessProbe
  }

  get roles(): ReadonlyArray<string> | undefined {
    return this.serviceRoles
      ? this.serviceRoles.map(({ service, role }) => `${service}:${role}`)
      : undefined
  }

  public addRole(role: ServiceRole): void {
    if (this.serviceRoles) {
      this.serviceRoles.push(role)
    } else {
      this.serviceRoles = [role]
    }
  }

  public toJSON(key: string): { [k: string]: any } {
    const json: { [k: string]: any } = { ...this }
    json.roles = this.roles
    delete json.serviceRoles
    return json
  }
}

interface ServiceRole {
  service: string
  role: string
}
