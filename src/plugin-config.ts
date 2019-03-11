type MetricPluginConfigEntries = Record<string, IMetricPluginConfig>

interface IMetricPluginConfig {
  command: string
  user?: string
  env?: Record<string, string>
  timeoutSeconds?: number
}

type CheckPluginConfigEntries = Record<string, ICheckPluginConfig>

interface ICheckPluginConfig {
  command: string
  user?: string
  env?: Record<string, string>
  timeoutSeconds?: number
  memo?: string
}

interface Props {
  checks?: CheckPluginConfigEntries
  metrics?: MetricPluginConfigEntries
}

export class PluginConfig {
  public metrics: MetricPluginConfigEntries
  public checks: CheckPluginConfigEntries

  constructor(props: Props) {
    this.metrics = props.metrics || {}
    this.checks = props.checks || {}
  }
}
