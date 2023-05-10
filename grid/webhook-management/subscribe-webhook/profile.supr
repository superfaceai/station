name = "webhook-management/subscribe-webhook"
version = "0.0.0"

"Create a new webhook subscription by specifying an address and a topic."
usecase WebhookSubscription unsafe  {
  input {
    webhook! {
      "The address where the webhook should send the HTTP request."
      address! string!
    
      "The event that triggers the webhook."
      topic! string!
    
      "The format of the data that the webhook should send."
      format! string!
    }!
  }
  result {
    webhook! {
      "Unique numeric identifier for the webhook subscription."
      id! number!
    
      "Destination URI to which the webhook subscription should send the POST request when an event occurs."
      address! string!
    
      "Event that triggers the webhook. You can retrieve data in either JSON or XML. "
      topic! string!
    
      "Date and time when the webhook subscription was created. "
      created_at! string!
    
      "Date and time when the webhook subscription was last modified."
      updated_at! string!
    
      "Format in which the webhook subscription should send the data. Valid values are JSON and XML. Defaults to JSON."
      format! string!
    
      "An optional array of top-level resource fields that should be serialized and sent in the POST request. If absent, all fields will be sent."
      fields! [string!]!
    
      "Optional array of namespaces for any metafields that should be included with each webhook."
      metafield_namespaces! [string!]!
    
      "The Admin API version that Shopify uses to serialize webhook events. This value is inherited from the app that created the webhook subscription."
      api_version! string!
    
      "Optional array of namespaces for any private metafields that should be included with each webhook."
      private_metafield_namespaces! [string!]!
    }!
  }!
  error {
    "Error message indicating the reason for the failed operation."
    errors! string!
  
    "HTTP status code associated with the error."
    status! number!
  
    "Number of seconds to wait before retrying the query, only applicable for 429 Too Many Requests error."
    retryAfter number
  
    "Header showing the number of requests made and the total number allowed per minute, only applicable for REST API responses."
    xShopifyShopApiCallLimit string
  }!
  example InputExample {
    input {
      webhook = {
        address = 'pubsub://projectName:topicName',
        topic = 'customers/update',
        format = 'json',
      },
    }
  }
}

