function WebhookSubscription({ input, parameters, services }) {
  const url = `${services.default}/admin/api/2023-04/webhooks.json`;
  const options = {
    method: 'POST',
    body: input,
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status !== 201) {
    throw new std.unstable.MapError({
      errors: [
        {
          code: response.status.toString(),
          message: 'Failed to create webhook',
        },
      ],
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