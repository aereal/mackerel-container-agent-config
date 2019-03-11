import { MackerelContainerAgentConfig } from "../"

describe("MackerelContainerAgentConfig", () => {
  test("with no props", () => {
    const config = new MackerelContainerAgentConfig()
    expect(JSON.stringify(config)).toBe(JSON.stringify({}))
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
    expect(JSON.parse(JSON.stringify(config))).toEqual(
      JSON.parse(
        JSON.stringify({ roles: ["My-service:db", "My-service:proxy"] })
      )
    )
  })
})
