function UpdateProduct({ input, services }) {
  const url = `${services.default}/admin/api/2023-04/products/${input.product.id}.json`;
  const options = {
    method: 'PUT',
    body: {
      product: input.product,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status >= 400) {
    let errorMessage = 'An error occurred while retrieving the customer.';
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
    product: body.product,
  };

  return result;
}