function WebhookSubscription({ input, parameters, services }) {
  const createWebhookResult = createWebhook(input, services, parameters);

  return createWebhookResult;
}

function createWebhook(input, services, parameters) {
  const url = `${services.default}admin/api/${parameters.api_version}/webhooks.json`;
  const options = {
    method: 'POST',
    body: input.webhook,
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status !== 201) {
    throw new std.unstable.MapError({
      code: response.status,
      message: 'HTTP call failed',
    });
  }

  const result = {
    webhook: {
      id: body.webhook.id,
      address: body.webhook.address,
      topic: body.webhook.topic,
      created_at: body.webhook.created_at,
      updated_at: body.webhook.updated_at,
      format: body.webhook.format,
      fields: body.webhook.fields,
      metafield_namespaces: body.webhook.metafield_namespaces,
      api_version: body.webhook.api_version,
      private_metafield_namespaces: body.webhook.private_metafield_namespaces,
    },
  };

  return result;
}