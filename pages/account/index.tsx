import { NextPage } from "next";
import { IPageLangProps } from "../../app/models/IPageLangProps";
import { setTitle } from "../../app/store/reducers/TitleSlice";
import { wrapper } from "../../app/store/store";
import en from '../../lang/en/index.json';
import ru from '../../lang/ru/index.json';

const Account: NextPage<IPageLangProps<typeof ru, typeof en>> = ({ lang }) => {
  return <>Hello</>
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		store.dispatch(setTitle('Личный кабинет'));

		return {
			props: {lang: ctx.locale === 'en' ? en : ru},
		};
	}
);

export default Account;
