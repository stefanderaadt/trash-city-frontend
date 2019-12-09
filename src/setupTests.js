/* eslint-disable no-console */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const originalConsoleError = console.error;

console.error = jest.fn(msg => {
  if (msg.includes('Warning: useLayoutEffect does nothing on the server')) {
    return null;
  }

  originalConsoleError(msg);
});
