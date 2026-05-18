# MCP Toolbelt Steering

When this power is active, validate all three MCP servers with real calls:

1. git: inspect current repository status.
2. fetch: fetch https://example.com and summarize the page.
3. playwright: open https://example.com and report the page title.

Return only:
- server name
- PASS/FAIL
- exact error if failed
