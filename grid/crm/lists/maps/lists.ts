/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jest/no-export */

import { describe, expect } from '@jest/globals';
import { SuperfaceTest } from '@superfaceai/testing';

import { buildSuperfaceTest } from '../../../test-config';

export function getListsTest(providerName: string): void {
  describe(`crm/lists/get-lists/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'crm/lists',
        provider: providerName,
      });
    });

    describe('GetLists', () => {
      it('returns all lists', async () => {
        const result = await superface.run({
          useCase: 'GetLists',
          input: {},
        });

        expect(() => result.unwrap()).not.toThrow();
        const data = result.unwrap();
        expect(data).toMatchSnapshot();
      });
    });
    // TODO: test pagination?
  });
}

export function addContactsToListTest(
  providerName: string,
  emails: string[],
  listId: string
): void {
  describe(`crm/lists/addContacts/${providerName}`, () => {
    let superface: SuperfaceTest;

    beforeEach(() => {
      superface = buildSuperfaceTest({
        profile: 'crm/lists',
        provider: providerName,
      });
    });

    describe('AddContactsToList', () => {
      describe('when all inputs are correct', () => {
        it('adds all contacts to a list', async () => {
          const result = await superface.run({
            useCase: 'AddContactsToList',
            input: {
              emails,
              listId,
            },
          });

          expect(() => result.unwrap()).not.toThrow();
          const data = result.unwrap();
          expect(data).toMatchSnapshot();
        });
        // TODO: ensure contacts were actually added
        // TODO: clean up after test
      });
    });
  });
}
