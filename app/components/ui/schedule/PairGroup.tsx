import React, { FC }  from "react";
import { v4 as uuidv4 } from 'uuid';
import { IPairGroup } from "../../../models/schedule";

const PairGroup: FC<{pairGroup: IPairGroup}> = ({pairGroup}) => {
	return (
		<div className="flex flex-col p-4 pr-8">
			<div className="text-vyatsu-blue font-bold">
				Пара {pairGroup.number}. С {pairGroup.time.replace('-', ' – ')}
			</div>
			{pairGroup.pairs.map((pair) => (
				<div key={uuidv4()}>
					{pair.subject_name}, {pair.norm_comment},{' '}
					<u className="cursor-pointer">{pair.sotr_fio}</u> {pair.mesto}
				</div>
			))}
		</div>
	);
};

export default React.memo(PairGroup);