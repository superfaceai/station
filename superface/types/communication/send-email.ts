import { TypedProfile, typeHelper } from '@superfaceai/one-sdk';
/**
 * Send transactional email to one recipient
 * Email can contain text and/or html representation
 **/
export interface SendEmailInput {
  from: unknown;
  to: unknown;
  subject: unknown;
  text?: unknown;
  html?: unknown;
}
/**
 * Send transactional email to one recipient
 * Email can contain text and/or html representation
 **/
export interface SendEmailResult {
  messageId?: unknown;
}
const profile = {
  "SendEmail": typeHelper<SendEmailInput, SendEmailResult>()
};
export type CommunicationSendEmailProfile = TypedProfile<typeof profile>;
export const communicationSendEmail = {
  "communication/send-email": profile
};
