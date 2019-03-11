// from https://mackerel.io/ja/docs/entry/howto/container-agent

// tslint:disable:interface-name
interface MackerelContainerAgentConfigProps {
  apikey?: string
  apibase?: string
  ignoreContainer?: string
  root?: string
}

export class MackerelContainerAgentConfig {
  public apikey?: string
  public apibase?: string
  public ignoreContainer?: string
  public root?: string

  constructor(props?: MackerelContainerAgentConfigProps) {
    if (!props) {
      return
    }

    this.apikey = props.apikey
    this.apibase = props.apibase
    this.ignoreContainer = props.ignoreContainer
    this.root = props.root
  }
}
