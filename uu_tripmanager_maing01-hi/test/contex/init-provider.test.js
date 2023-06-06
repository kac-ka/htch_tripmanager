import UU5 from "uu5g04";
import UuTripmanager from "uu_tripmanager_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuTripmanager.Contex.InitProvider`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuTripmanager.Contex.InitProvider />);
    expect(wrapper).toMatchSnapshot();
  });
});
