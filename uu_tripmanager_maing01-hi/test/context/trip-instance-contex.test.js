import UU5 from "uu5g04";
import UuTripmanager from "uu_tripmanager_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuTripmanager.Context.TripInstanceContex`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTripmanager.Context.TripInstanceContex />);
    expect(wrapper).toMatchSnapshot();
  });
});
