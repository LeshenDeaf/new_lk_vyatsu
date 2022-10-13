import { NextPage } from "next";
import { setTitle } from "../../app/store/reducers/TitleSlice";
import { wrapper } from "../../app/store/store";

const Payments: NextPage = () => {
  return <></>;
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Оплата обучения'));

		return {
			props: {},
		};
	}
);


export default Payments;