import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

export default dayjs;
