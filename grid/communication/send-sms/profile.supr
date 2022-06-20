"""
Send SMS Message
Send a single SMS message or retrieve its status.
"""

name = "communication/send-sms"
version = "2.0.1"

"""
Send SMS Message
Send single text message
"""
usecase SendMessage unsafe {
  input {
    "Recepient of the message"
    to

    "Sender of the message"
    from

    "The text of the message"
    text
  }

  result {
    messageId
  }

  error {
    title!
    detail
  }

  example Successful {
    input {
      to = '+12127290149',
      from = '+4915207955279',
      text = 'Your order is ready to be picked up!',
    }

    result {
      messageId = '150000003351F9D7',
    }
  }

  example Failed {
    input {
      to = '+12127290149',
      from = '',
      text = 'Your order is ready to be picked up!',
    }

    error {
      title = "Missing 'from' number",
    }
  }
}

"
Message Status

Retrieve status of a sent SMS message
"
usecase RetrieveMessageStatus safe {
  input {
    messageId
  }

  result {
    deliveryStatus
  }

  error {
    title!
    detail
  }

  example Successful {
    input {
      messageId = '150000003351F9D7',
    }

    result {
      deliveryStatus = 'delivered',
    }
  }

  example Failed {
    input {
      messageId = '',
    }

    error {
      title = 'Not Found',
      detail = "We don't recognize this message",
    }
  }
}

"
Identifier of Message
The identifier is provider-specific and not unique. It should be treated as an opaque value and only used in subsequent calls
"
field messageId string

"
Delivery Status of Message
Status of a sent message. Harmonized across different providers.
"
field deliveryStatus enum {
  accepted
  delivered
  seen
  unknown
  failed
}

"""
Title
A short, human-readable summary of the problem type
"""
field title

"""
Detail
A human-readable explanation specific to this occurrence of the problem
"""
field detail
