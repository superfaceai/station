function CreateCustomer({ input, services }) {
  const url = `${services.default}/admin/api/2023-04/customers.json`;
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
    let errorMessage = 'An error occurred while creating the customer.';
    if (response.status === 401) {
      errorMessage = '[API] Invalid API key or access token (unrecognized login or wrong password)';
    } else if (response.status === 402) {
      errorMessage = "This shop's plan does not have access to this feature";
    } else if (response.status === 403) {
      errorMessage = 'User does not have access';
    } else if (response.status === 404) {
      errorMessage = 'Not Found';
    } else if (response.status === 422) {
      errorMessage = 'The request body contains semantic errors.';
    } else if (response.status === 429) {
      errorMessage = 'Exceeded 2 calls per second for api client. Reduce request rates to resume uninterrupted service.';
    } else if (response.status >= 500) {
      errorMessage = 'An unexpected error occurred';
    }

    throw new std.unstable.MapError({
      errors: errorMessage,
      status: response.status,
      retryAfter: response.headers['Retry-After']?.[0] ? Number(response.headers['Retry-After'][0]) : null,
      xShopifyShopApiCallLimit: response.headers['X-Shopify-Shop-Api-Call-Limit']?.[0] ? response.headers['X-Shopify-Shop-Api-Call-Limit'][0] : null,
    });
  }

  const result = {
    customer: {
      id: body.customer.id,
      email: body.customer.email,
      created_at: body.customer.created_at,
      updated_at: body.customer.updated_at,
      first_name: body.customer.first_name,
      last_name: body.customer.last_name,
      orders_count: body.customer.orders_count,
      state: body.customer.state,
      total_spent: body.customer.total_spent,
      last_order_id: body.customer.last_order_id,
      note: body.customer.note,
      verified_email: body.customer.verified_email,
      multipass_identifier: body.customer.multipass_identifier,
      tax_exempt: body.customer.tax_exempt,
      tags: body.customer.tags,
      last_order_name: body.customer.last_order_name,
      currency: body.customer.currency,
      phone: body.customer.phone,
      addresses: body.customer.addresses,
      tax_exemptions: body.customer.tax_exemptions,
      email_marketing_consent: body.customer.email_marketing_consent,
      sms_marketing_consent: body.customer.sms_marketing_consent,
      admin_graphql_api_id: body.customer.admin_graphql_api_id,
      default_address: body.customer.default_address,
    },
  };

  return result;
}