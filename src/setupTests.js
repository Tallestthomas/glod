import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.require = () => ({
  remote: {
    getCurrentWindow: () => ({
      setBackgroundColor: () => {},
    }),
  },
});
