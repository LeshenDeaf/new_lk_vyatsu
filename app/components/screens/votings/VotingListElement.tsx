import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { IVoting } from '../../../models/api/votings/types';

interface Props {
	voting: IVoting;
}

const VotingsListElement: FC<Props> = ({ voting }) => {
	const backgrounds = useMemo(
		() => ({
			main: !voting.has_voted ? 'bg-vyatsu-blue/[0.15]' : 'bg-[#E7E7E7]/[0.15]',
			border: !voting.has_voted ? 'bg-vyatsu-blue' : 'bg-[#E7E7E7]',
			button: !voting.has_voted ? 'bg-vyatsu-blue' : 'bg-[#E7E7E7]',
			buttonText: !voting.has_voted ? 'text-white' : 'text-black',
		}),
		[voting.has_voted]
	);

	const { asPath } = useRouter();

	return (
		<div
			className={`min-h-[60px] ${backgrounds.main} flex mb-4 last:mb-0 rounded-xl`}
		>
			<div
				className={`hidden lg:block w-[8px] min-h-[60px] ${backgrounds.border} rounded-tl-xl rounded-bl-xl`}
			></div>
			<div className="w-full flex flex-col lg:flex-row justify-between lg:items-center p-5 lg:p-0 lg:pl-4">
				<div className="text-xl lg:text-base lg:w-2/3">{voting.name}</div>
				<div>
					<Link
						href={`${asPath}/${voting.id}`}
						className={`${backgrounds.button} ${backgrounds.buttonText} text-xl lg:text-base mt-4 lg:mt-0 min-h-[60px] p-4 md:min-w-[170px] rounded-xl flex justify-center items-center drop-shadow-lg md:drop-shadow-none cursor-pointer mr-6 last:mr-0`}
					>
						<a
							className={`${backgrounds.button} ${backgrounds.buttonText} text-xl lg:text-base mt-4 lg:mt-0 min-h-[60px] p-4 md:min-w-[170px] rounded-xl flex justify-center items-center drop-shadow-lg md:drop-shadow-none cursor-pointer mr-6 last:mr-0`}
						>
							Пройти
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VotingsListElement;
