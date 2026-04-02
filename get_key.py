import json
with open(r'C:\Users\gregm\AppData\Roaming\Claude\claude_desktop_config.json', 'r', encoding='utf-8') as f:
    cfg = json.load(f)
print(cfg['mcpServers']['nano-banana']['env']['GEMINI_API_KEY'])
