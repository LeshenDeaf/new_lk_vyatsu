import type { NextPage } from 'next';
import { useAppDispatch } from '../app/hooks/redux';
import { setTitle } from '../app/store/reducers/TitleSlice';
import { wrapper } from '../app/store/store';

const NotFound: NextPage = () => {
  const dispatch = useAppDispatch();
  
  dispatch(setTitle('404'));

	return (
		<>
			<div className="w-[162px] mx-auto text-8xl text-[#141414] opacity-10">
				404
			</div>
      <div className="opacity-70">
        Страница не найдена
      </div>
		</>
	);
};

export default NotFound;
