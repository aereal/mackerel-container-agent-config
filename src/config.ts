// from https://mackerel.io/ja/docs/entry/howto/container-agent

// tslint:disable:interface-name
interface MackerelContainerAgentConfigProps {
  apikey?: string
  apibase?: string
  ignoreContainer?: string
  root?: string
  roles?: ServiceRole[]
}

export class MackerelContainerAgentConfig {
  public apikey?: string
  public apibase?: string
  public ignoreContainer?: string
  public root?: string
  public serviceRoles?: ServiceRole[]

  constructor(props?: MackerelContainerAgentConfigProps) {
    if (!props) {
      return
    }

    this.apikey = props.apikey
    this.apibase = props.apibase
    this.ignoreContainer = props.ignoreContainer
    this.root = props.root
    this.serviceRoles = props.roles
  }

  get roles(): ReadonlyArray<string> | undefined {
    return this.serviceRoles
      ? this.serviceRoles.map(({ service, role }) => `${service}:${role}`)
      : undefined
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
