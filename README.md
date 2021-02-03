# Push Healthbot Scenarios Github Action
Github action that will publish Azure Healthbot Scenarios defined in a template.json file from your repo.

Example usage:
```
- name: Push Scenarios action step
  id: push-scenarios
  uses: pjirsa/healthbot-template-push@v1.4.2
  with:
    tenant-name: ${{ secrets.TENANT_NAME }}
    api-secret: ${{ secrets.API_KEY }}
    template-file: '${{ github.workspace }}/template.json'
```

See [pjirsa/azure-healthbot-devops](https://github.com/pjirsa/azure-healthbot-devops) to see an example repo using this action.

\* Create Github secrets for `TENANT_NAME` and `API_KEY` specific to your Azure Healthbot instance.