import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { getUsers } from '../src/api';

// Create a 'pact' between the two applications in the integration we are testing
const provider = new PactV3({
  dir: './pacts',
  consumer: 'UserProfileConsumer',
  provider: 'UserInfoProvider',
});

const userExample = { id: 1, firstName: "Phillip" };
const EXPECTED_BODY = MatchersV3.eachLike(userExample);

describe('GET /users', () => {
  it('returns an HTTP 200 and a list of users', () => {
    // Arrange: Setup our expected interactions
    //
    // We use Pact to mock out the backend API
    provider
      .given('I have a list of users')
      .uponReceiving('a request for all users')
      .withRequest({
        method: 'GET',
        path: '/users',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: EXPECTED_BODY,
      });

    return provider.executeTest(async (mockserver) => {
      // Act: test our API client behaves correctly
      //
      // Note we configure the DogService API client dynamically to 
      // point to the mock service Pact created for us, instead of 
      // the real one
      const response = await getUsers(mockserver.url);
      console.log(response.ok);
      const data = await response.json();
      console.log(data);

      // Assert: check the result
      expect(data[0]).toEqual(userExample);
    });
  });
});