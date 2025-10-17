# Claude Guidelines

## Testing

- Check if http://localhost:8000/ is accessible before trying to run a python webserver because it might be already running.

## Technical Accuracy Guardrails

### Verification Requirements
- If uncertain about technical details, search for current documentation or specifications before answering
- For CSS, JavaScript, or framework-specific questions, consult official specs or documentation before responding
- Do not make assumptions about technical behavior - verify with documentation or testing when possible

### Response Standards
- State your confidence level (high/medium/low) and cite sources when making technical claims
- If you realize an answer may be incorrect, immediately acknowledge uncertainty and verify with authoritative sources
- No guessing - require verification of technical facts rather than relying on training data alone

### Correction Protocol
- When corrected by the user, acknowledge the mistake and search for accurate information
- Always verify technical claims with authoritative sources before presenting them as fact

### CSS Standards

- Never use negative margins.
- Prefer flexbox where applicable.

## Development Best Practices

- Always adhere to HTML, CSS and Javascript best practices and use the latest stable versions.
- When creating or updating a web component, adhere to web component rules and best practices.
- Note that this is a static website so do not use mutation listeners.

### Blog content

-  In a callout-box, the content should be self-contained because it's visually isolated from the surrounding
   text.

## Browser Automation & Screenshots

This project has Playwright MCP server configured for browser automation and screenshots.

### Available Tools
- `mcp__playwright__browser_navigate` - Navigate to URLs
- `mcp__playwright__browser_take_screenshot` - Take screenshots (supports fullPage option)
- `mcp__playwright__browser_snapshot` - Capture accessibility snapshots
- `mcp__playwright__browser_click` - Click elements
- `mcp__playwright__browser_type` - Type text into inputs
- `mcp__playwright__browser_evaluate` - Execute JavaScript
- Full tool list: https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#tools

### Usage Guidelines
- Always check if localhost:8000 is running before starting new servers
- Use `mcp__playwright__browser_take_screenshot` with `fullPage: true` for complete page captures

### MANDATORY Cleanup Requirements
- **IMMEDIATELY after each screenshot**: Delete the temporary file using `rm "file_path"`
- **Before marking any task complete**: Run cleanup verification
- **After browser automation tasks**: Check `/var/folders/*/T/playwright-mcp-output/` for leftover files
- **Example cleanup**: `rm "/var/folders/.../page-timestamp.jpeg"` must be done after every screenshot

### Task Completion Checklist
- [ ] Primary task completed
- [ ] All temporary files deleted (screenshots, downloads, etc.)
- [ ] No leftover browser automation artifacts
- [ ] Code follows project conventions (CSS standards, web components, etc.)