function RetrieveCustomer({ input, parameters, services }) {
  const getCustomerResult = getCustomer(input, services, parameters);

  return getCustomerResult;
}

function getCustomer(input, services, parameters) {
  const url = `${services.default}/admin/api/${parameters.api_version}/customers/${input.customer_id}.json`;
  const options = {
    method: 'GET',
    query: {
      fields: input.fields,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    security: 'apiKey',
  };

  const response = std.unstable.fetch(url, options).response();
  const body = response.bodyAuto() ?? {};

  if (response.status !== 200) {
    throw new std.unstable.MapError({
      errors: [
        {
          message: 'Failed to fetch customer data',
          code: response.status.toString(),
        },
      ],
    });
  }

  const result = {
    customer: body.customer,
  };

  return result;
}