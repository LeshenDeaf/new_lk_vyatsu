import { NextPage } from 'next';
import PaymentGraphs from '../../app/components/ui/edu/payments/PaymentGraphs';
import Questions from '../../app/components/ui/edu/payments/Questions';
import { setTitle } from '../../app/store/reducers/TitleSlice';
import { wrapper } from '../../app/store/store';

const Payments: NextPage = () => {
	return (
		<>
			<PaymentGraphs />
			<Questions />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		store.dispatch(setTitle('Оплата обучения'));

		return {
			props: {},
		};
	}
);

export default Payments;
