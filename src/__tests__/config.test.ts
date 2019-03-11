import { MackerelContainerAgentConfig, PluginConfig } from "../"

describe("MackerelContainerAgentConfig", () => {
  test("with no props", () => {
    const config = new MackerelContainerAgentConfig()
    expect(JSON.parse(JSON.stringify(config))).toEqual(
      JSON.parse(
        JSON.stringify({
          plugins: { checks: {}, metrics: {} },
        })
      )
    )
  })

  test("with common props", () => {
    const config = new MackerelContainerAgentConfig({
      apibase: "https://example.com/api/v0",
      apikey: "keep-my-secret",
      ignoreContainer: "mackerel",
      root: "/",
    })
    expect(JSON.parse(JSON.stringify(config))).toEqual(
      JSON.parse(
        JSON.stringify({
          apibase: "https://example.com/api/v0",
          apikey: "keep-my-secret",
          ignoreContainer: "mackerel",
          plugins: { checks: {}, metrics: {} },
          root: "/",
        })
      )
    )
  })

  test("with roles", () => {
    const config = new MackerelContainerAgentConfig({
      roles: [
        { service: "My-service", role: "db" },
        { service: "My-service", role: "proxy" },
      ],
    })
    config.addRole({ service: "My-service", role: "app" })
    expect(JSON.parse(JSON.stringify(config))).toEqual(
      JSON.parse(
        JSON.stringify({
          plugins: { checks: {}, metrics: {} },
          roles: ["My-service:db", "My-service:proxy", "My-service:app"],
        })
      )
    )
  })

  test("with check plugin config", () => {
    const plugins = new PluginConfig({
      checks: {
        procs: {
          command: "check-procs --pattern=/usr/sbin/sshd --warning-under=1",
          env: {
            FOO: "BAR",
          },
          memo: "check procs memo",
          timeoutSeconds: 45,
          user: "sample-user",
        },
      },
      metrics: {},
    })
    const config = new MackerelContainerAgentConfig({
      plugins,
    })
    expect(JSON.parse(JSON.stringify(config))).toEqual(
      JSON.parse(
        JSON.stringify({
          plugins: {
            checks: {
              procs: {
                command:
                  "check-procs --pattern=/usr/sbin/sshd --warning-under=1",
                env: {
                  FOO: "BAR",
                },
                memo: "check procs memo",
                timeoutSeconds: 45,
                user: "sample-user",
              },
            },
            metrics: {},
          },
        })
      )
    )
  })

  test("with readinessProbe", () => {
    const config = new MackerelContainerAgentConfig({
      readinessProbe: {
        exec: {
          command: "cat /tmp/healthy",
          env: {
            FOO: "FOO BAR",
          },
          user: "sample-user",
        },
        initialDelaySeconds: 10,
        periodSeconds: 3,
        timeoutSeconds: 5,
      },
    })
    expect(JSON.parse(JSON.stringify(config))).toEqual({
      plugins: { checks: {}, metrics: {} },
      readinessProbe: {
        exec: {
          command: "cat /tmp/healthy",
          env: {
            FOO: "FOO BAR",
          },
          user: "sample-user",
        },
        initialDelaySeconds: 10,
        periodSeconds: 3,
        timeoutSeconds: 5,
      },
    })
  })
})
