"""
Send Email
Send transactional email.
"""

name = "communication/send-email"
version = "2.2.0"

"""
Send Email
Send transactional email to one recipient.
Email can contain text and/or html representation.
"""
usecase SendEmail unsafe {
  input {
    """
    From
    The sender's email address.
    """
    from!

    """
    To
    The recipient's email address.
    """
    to!

    """
    Subject
    The subject of your email. See character length requirements according to RFC 2822.
    """
    subject!

    """
    Text
    The plain text email message.
    """
    text

    """
    HTML
    The HTML email message.
    """
    html

    """
    Reply-To
    The Reply-To email address.
    """
    replyTo

    """
    Attachments
    The email attachments.
    """
    attachments [Attachment!]
  }

  result {
    """
    Message Identifier
    The identifier is provider-specific and not unique.
    """
    messageId!
  }

  error {
    """
    Title
    A short, human-readable summary of the problem type.
    """
    title!

    """
    A human-readable explanation specific to this occurrence of the problem.
    """
    detail
  }

  example SuccessfulPlainTextEmail {
    input {
      from = 'no-reply@example.com',
      to = 'jane.doe@example.com',
      subject = 'Your order has been shipped!',
      text = 'Hello Jane, your recent order on Our Shop has been shipped.',
      attachments = [{
        filename = 'order.pdf',
        type = 'application/pdf',
        content = 'JVBERi0xLjQKJeLjz9MKMyAwIG9...'
      }],
    }

    result {
      messageId = 'JpITLjVBS3iknTzDq1BKPg',
    }
  }

  example SuccessfulHtmlEmail {
    input {
      from = 'no-reply@example.com',
      to = 'jane.doe@example.com',
      subject = 'Your order has been shipped!',
      html = "<p>Hello Jane, we shipped your recent order on Our Shop. <a>You can track it here</a>.</p>",
    }

    result {
      messageId = 'JpITLjVBS3iknTzDq1BKPg',
    }
  }

  example Failed {
    input {
      from = 'no-reply@example.com',
      to = 'Jane Doe',
      subject = 'Your order has been shipped!',
      text = 'Hello Jane, your recent order on Our Shop has been shipped.',
    }

    error {
      title = 'Invalid inputs',
      detail = 'An email address must contain a single @',
    }
  }
}

model Attachment {
  """
  Content
  The Base64 encoded content of the attachment.
  """
  content!

  """
  Type
  The MIME type of the content you are attaching (e.g., “text/plain” or “text/html”).
  """
  type!

  """
  Filename
  The attachment's filename.
  """
  filename
}
