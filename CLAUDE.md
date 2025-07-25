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