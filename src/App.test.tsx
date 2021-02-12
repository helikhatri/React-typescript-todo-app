import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow,mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  Button,
  Form
} from 'react-bootstrap';

const mockFn = jest.fn();
let wrapper;
Enzyme.configure({ adapter: new Adapter() });
beforeEach(() => {
  wrapper = mount(<App />);
});
describe('</App>', () => {
  
  it('should call mock function when add button is clicked', () => {
    const tree = shallow(
      <Button type="submit"
                    onClick={mockFn}>Submit</Button>
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  })

  it('should call mock function when user click on textbox', () => {
    const tree = shallow(
      <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Enter task"
                    onChange={mockFn}
                  />
    );
    tree.simulate('change');
    expect(mockFn).toHaveBeenCalled();
  })

  it('should call mock function when delete button is clicked', () => {
    const tree = shallow(
      <Button variant="outline-danger"
      style={{ float: 'right' }}
      onClick={mockFn}>Delete</Button>
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  })

})

