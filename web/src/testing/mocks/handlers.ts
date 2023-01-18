import { rest } from 'msw';

// TODO: We should either use this for mocking or remove it completely
const handlers = [
  rest.get('api_path', (_, response, context) => response(context.json(null))),
];

export default handlers;
